/**
 * Learning-engine efficacy metrics (L-10).
 * Delayed accuracy is an attempt-level descriptive metric, not evidence of causality
 * or a calibrated estimate of unassisted learning.
 */

import type { ReviewEvent } from './review-event.ts';

const DAY_MS = 86_400_000;

export interface DelayedRetentionStats {
  /** Number of qualifying delayed attempts (the accuracy denominator). */
  n: number;
  /** Number of correct qualifying delayed attempts. */
  correct: number;
  /** Distinct item IDs with at least one qualifying delayed attempt. */
  uniqueEligibleItems: number;
  /** 0–1; null when n === 0. Attempt-level accuracy, not unique-item accuracy. */
  accuracy: number | null;
  minDelayDays: number;
}

export interface EfficacySnapshot {
  delayedRetention: DelayedRetentionStats;
  /** Mean latency on qualifying delayed attempts (ms), if any measured. */
  meanLatencyMs: number | null;
  totalEvents: number;
  /** Distinct items with any recorded event, not only delayed-eligible items. */
  uniqueItems: number;
  // ReviewEvent has no reliable learnerId; deviceId must not be reported as unique learners.
}

/** Validate a delay threshold rather than allowing NaN / negative windows. */
function validateMinDelayDays(minDelayDays: number): void {
  if (!Number.isFinite(minDelayDays) || minDelayDays < 0) {
    throw new RangeError('minDelayDays must be a finite non-negative number.');
  }
}

/** First-touch timestamp per itemId. */
export function firstSeenByItem(events: ReviewEvent[]): Map<string, number> {
  const map = new Map<string, number>();
  const sorted = [...events].sort((a, b) => a.ts - b.ts);
  for (const event of sorted) {
    if (!map.has(event.itemId)) map.set(event.itemId, event.ts);
  }
  return map;
}

/**
 * Explicit delayed-retention eligibility (audit finding 7).
 * Included: learner-submitted quiz/review answers (topic, quick, mock, review,
 * challenge) at least minDelayDays after the item's first recorded event.
 * Excluded: unanswered timeout slots (no learner attempt to measure),
 * flashcards (self-graded, no correctness feedback from the app), and
 * lesson-checks (immediate in-lesson feedback with same-session retries).
 * Legacy events without responseStatus were submissions by construction.
 * Repeated observations within one session count once per session/item, so a
 * same-session retry burst cannot multiply the denominator.
 * The delay reference is the item's first recorded event; assistance/feedback
 * exposure timestamps are not yet recorded and are never invented here.
 */
const DELAYED_ELIGIBLE_MODES: ReadonlySet<string> = new Set(['topic', 'quick', 'mock', 'review', 'challenge']);

export function isDelayedRetentionEligible(event: ReviewEvent): boolean {
  if (!DELAYED_ELIGIBLE_MODES.has(event.mode)) return false;
  if (event.responseStatus === 'unanswered') return false;
  return true;
}

export function computeDelayedRetention(
  events: ReviewEvent[],
  minDelayDays = 7,
): DelayedRetentionStats {
  validateMinDelayDays(minDelayDays);
  const first = firstSeenByItem(events);
  const minDelayMs = minDelayDays * DAY_MS;
  let n = 0;
  let correct = 0;
  const eligibleItems = new Set<string>();
  const countedSessionItems = new Set<string>();

  for (const event of events) {
    if (!isDelayedRetentionEligible(event)) continue;
    const firstSeen = first.get(event.itemId);
    if (firstSeen == null || event.ts - firstSeen < minDelayMs) continue;
    const sessionItemKey = `${event.sessionId}\u0000${event.itemId}`;
    if (countedSessionItems.has(sessionItemKey)) continue;
    countedSessionItems.add(sessionItemKey);
    n += 1;
    eligibleItems.add(event.itemId);
    if (event.correct) correct += 1;
  }

  return {
    n,
    correct,
    uniqueEligibleItems: eligibleItems.size,
    accuracy: n > 0 ? correct / n : null,
    minDelayDays,
  };
}

export function computeEfficacySnapshot(
  events: ReviewEvent[],
  minDelayDays = 7,
): EfficacySnapshot {
  validateMinDelayDays(minDelayDays);
  const delayedRetention = computeDelayedRetention(events, minDelayDays);
  const first = firstSeenByItem(events);
  const minDelayMs = minDelayDays * DAY_MS;
  let latencySum = 0;
  let latencyN = 0;

  for (const event of events) {
    if (!isDelayedRetentionEligible(event)) continue;
    const firstSeen = first.get(event.itemId);
    if (firstSeen == null || event.ts - firstSeen < minDelayMs) continue;
    if (
      typeof event.latencyMs === 'number' &&
      Number.isFinite(event.latencyMs) &&
      event.latencyMs >= 0
    ) {
      latencySum += event.latencyMs;
      latencyN += 1;
    }
  }

  return {
    delayedRetention,
    meanLatencyMs: latencyN > 0 ? latencySum / latencyN : null,
    totalEvents: events.length,
    uniqueItems: first.size,
  };
}

/**
 * Brier score for binary outcomes and aligned predicted probabilities.
 * Invalid probabilities are rejected, never clamped. Returns null for empty or
 * length-mismatched inputs.
 */
export function brierScore(predictions: number[], outcomes: boolean[]): number | null {
  if (predictions.length === 0 || predictions.length !== outcomes.length) return null;

  let sum = 0;
  for (let index = 0; index < predictions.length; index++) {
    const probability = predictions[index];
    const outcome = outcomes[index];
    if (typeof probability !== 'number' || !Number.isFinite(probability) || probability < 0 || probability > 1) {
      throw new RangeError(`predictions[${index}] must be a finite probability in [0, 1].`);
    }
    if (typeof outcome !== 'boolean') {
      throw new RangeError(`outcomes[${index}] must be boolean.`);
    }
    const y = outcome ? 1 : 0;
    sum += (probability - y) ** 2;
  }
  return sum / predictions.length;
}
