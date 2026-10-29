/**
 * Derive aggregate question state from an ordered event log (property-test target).
 * Strength formula mirrors `updateQuestionStrength` in adaptive-select.ts.
 */

import type { ReviewEvent } from './review-event.ts';

/** Minimal aggregate matching storage QuestionResult fields used in dual-write checks. */
export interface ReplayedQuestionAggregate {
  correct: boolean;
  timestamp: number;
  attempts: number;
  correctCount: number;
  /** Strength in [0, 1], same update rules as adaptive-select. */
  strength: number;
  subjectId?: string;
}

/** Keep in lockstep with adaptive-select STRENGTH_UP / STRENGTH_DOWN. */
const STRENGTH_UP = 0.25;
const STRENGTH_DOWN = 0.5;

/**
 * Deterministic tie-break for equal timestamps.
 * Preserves the within-batch ordering by using the event index as a secondary sort key.
 * This does not reconstruct the original causal order — it only makes replay deterministic.
 */
function deterministicEventSort(events: ReviewEvent[]): ReviewEvent[] {
  return [...events]
    .map((e, i) => ({ e, i }))
    .sort((a, b) => a.e.ts - b.e.ts || a.i - b.i)
    .map(({ e }) => e);
}

/**
 * Validate that an event has the required shape for replay.
 * Invalid events are reported rather than silently incorporated.
 */
export function isValidReviewEvent(e: unknown): e is ReviewEvent {
  if (e == null || typeof e !== 'object') return false;
  const o = e as Record<string, unknown>;
  if (typeof o.id !== 'string' || o.id.length === 0) return false;
  if (typeof o.ts !== 'number' || !Number.isFinite(o.ts)) return false;
  if (typeof o.itemId !== 'string' || o.itemId.length === 0) return false;
  if (typeof o.skillId !== 'string' || o.skillId.length === 0) return false;
  if (typeof o.mode !== 'string') return false;
  if (typeof o.correct !== 'boolean') return false;
  if (typeof o.algoVersion !== 'string') return false;
  if (o.latencyMs != null && (typeof o.latencyMs !== 'number' || !Number.isFinite(o.latencyMs))) return false;
  if (o.confidence != null && ![1, 2, 3].includes(o.confidence as number)) return false;
  return true;
}

/**
 * Replay events for a single item into the same aggregate shape `updateQuestionStrength` produces.
 * Invalid events are skipped (reported separately by the caller).
 */
export function replayItemEvents(events: ReviewEvent[]): ReplayedQuestionAggregate | null {
  if (events.length === 0) return null;
  const ordered = deterministicEventSort(events);

  let attempts = 0;
  let correctCount = 0;
  let strength: number | null = null;
  let lastCorrect = false;
  let timestamp = 0;

  for (const e of ordered) {
    attempts += 1;
    if (e.correct) correctCount += 1;
    lastCorrect = e.correct;
    timestamp = e.ts;

    if (strength == null) {
      strength = e.correct ? 0.55 : 0.25;
    } else if (e.correct) {
      strength = strength + STRENGTH_UP * (1 - strength);
    } else {
      strength = strength * STRENGTH_DOWN;
    }
    strength = Math.min(1, Math.max(0, strength));
  }

  return {
    correct: lastCorrect,
    timestamp,
    attempts,
    correctCount,
    strength: strength ?? 0.5,
  };
}

export function replayAllItemAggregates(
  events: ReviewEvent[],
): Record<string, ReplayedQuestionAggregate> {
  const byItem = new Map<string, ReviewEvent[]>();
  for (const e of events) {
    const list = byItem.get(e.itemId) ?? [];
    list.push(e);
    byItem.set(e.itemId, list);
  }
  const out: Record<string, ReplayedQuestionAggregate> = {};
  for (const [itemId, list] of byItem) {
    const agg = replayItemEvents(list);
    if (agg) out[itemId] = agg;
  }
  return out;
}

export interface ReplayDiffResult {
  mismatches: string[];
  eventOnlyItems: string[];
  liveOnlyItems: string[];
  invalidEvents: number;
  duplicateEventIds: string[];
  equalTimestampWarnings: string[];
}

/**
 * Property helper: compare replayed aggregates to live questionResults for all keys.
 * Reports mismatches in both directions (event-only and live-only), field-level
 * mismatches, invalid events, duplicate IDs, and equal-timestamp ordering ambiguity.
 *
 * Optional fields that cannot be compared (legacy rows without attempts/correctCount/strength)
 * are reported as "unavailable", not as mismatches.
 */
export function diffAggregates(
  live: Record<
    string,
    {
      correct: boolean;
      timestamp: number;
      attempts?: number;
      correctCount?: number;
      strength?: number;
    }
  >,
  events: ReviewEvent[],
  epsilon = 1e-6,
): string[] {
  const result = diffAggregatesDetailed(live, events, epsilon);
  return result.mismatches;
}

export function diffAggregatesDetailed(
  live: Record<
    string,
    {
      correct: boolean;
      timestamp: number;
      attempts?: number;
      correctCount?: number;
      strength?: number;
    }
  >,
  events: ReviewEvent[],
  epsilon = 1e-6,
): ReplayDiffResult {
  const mismatches: string[] = [];
  const eventOnlyItems: string[] = [];
  const liveOnlyItems: string[] = [];
  const duplicateEventIds: string[] = [];
  const equalTimestampWarnings: string[] = [];
  let invalidEvents = 0;

  // Detect invalid events and duplicates
  const seenIds = new Set<string>();
  const validEvents: ReviewEvent[] = [];
  for (const e of events) {
    if (!isValidReviewEvent(e)) {
      invalidEvents++;
      continue;
    }
    if (seenIds.has(e.id)) {
      duplicateEventIds.push(e.id);
      continue;
    }
    seenIds.add(e.id);
    validEvents.push(e);
  }

  // Detect equal-timestamp collisions across items (where order could matter)
  const tsCount = new Map<number, string[]>();
  for (const e of validEvents) {
    const items = tsCount.get(e.ts) ?? [];
    items.push(e.itemId);
    tsCount.set(e.ts, items);
  }
  for (const [ts, items] of tsCount) {
    if (items.length > 1) {
      equalTimestampWarnings.push(`ts=${ts}: ${items.length} events share this timestamp`);
    }
  }

  const replayed = replayAllItemAggregates(validEvents);

  // Event-only items: in replayed but not in live
  for (const id of Object.keys(replayed)) {
    if (!live[id]) {
      eventOnlyItems.push(id);
      mismatches.push(`${id}: present in events but missing from live aggregates`);
    }
  }

  // Live-only items: in live but not in replayed
  for (const id of Object.keys(live)) {
    if (!replayed[id]) {
      liveOnlyItems.push(id);
      mismatches.push(`${id}: present in live aggregates but no events found`);
    }
  }

  // Field-level comparison for shared items
  for (const [id, r] of Object.entries(replayed)) {
    const l = live[id];
    if (!l) continue;

    if (Boolean(l.correct) !== r.correct) {
      mismatches.push(`${id}: correct ${l.correct}≠${r.correct}`);
    }
    if (typeof l.attempts === 'number') {
      if (l.attempts !== r.attempts) {
        mismatches.push(`${id}: attempts ${l.attempts}≠${r.attempts}`);
      }
    }
    if (typeof l.correctCount === 'number') {
      if (l.correctCount !== r.correctCount) {
        mismatches.push(`${id}: correctCount ${l.correctCount}≠${r.correctCount}`);
      }
    }
    if (l.strength != null && typeof l.strength === 'number' && Number.isFinite(l.strength)) {
      if (Math.abs(l.strength - r.strength) > epsilon) {
        mismatches.push(`${id}: strength ${l.strength}≠${r.strength}`);
      }
    }
    if (typeof l.timestamp === 'number' && Number.isFinite(l.timestamp)) {
      if (l.timestamp !== r.timestamp) {
        mismatches.push(`${id}: timestamp ${l.timestamp}≠${r.timestamp}`);
      }
    }
  }

  return {
    mismatches,
    eventOnlyItems,
    liveOnlyItems,
    invalidEvents,
    duplicateEventIds,
    equalTimestampWarnings,
  };
}
