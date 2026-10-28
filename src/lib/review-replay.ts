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
 * Replay events for a single item into the same aggregate shape `updateQuestionStrength` produces.
 */
export function replayItemEvents(events: ReviewEvent[]): ReplayedQuestionAggregate | null {
  if (events.length === 0) return null;
  const ordered = [...events].sort((a, b) => a.ts - b.ts);

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

/**
 * Property helper: compare replayed aggregates to live questionResults for shared keys.
 * Returns mismatches (empty = pass).
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
  const replayed = replayAllItemAggregates(events);
  const mismatches: string[] = [];
  for (const [id, r] of Object.entries(replayed)) {
    const l = live[id];
    if (!l) {
      mismatches.push(`${id}: missing in live aggregates`);
      continue;
    }
    if (Boolean(l.correct) !== r.correct) mismatches.push(`${id}: correct ${l.correct}≠${r.correct}`);
    if ((l.attempts ?? 1) !== r.attempts) mismatches.push(`${id}: attempts ${l.attempts}≠${r.attempts}`);
    if ((l.correctCount ?? (l.correct ? 1 : 0)) !== r.correctCount) {
      mismatches.push(`${id}: correctCount ${l.correctCount}≠${r.correctCount}`);
    }
    if (l.strength != null && Math.abs(l.strength - r.strength) > epsilon) {
      mismatches.push(`${id}: strength ${l.strength}≠${r.strength}`);
    }
  }
  return mismatches;
}
