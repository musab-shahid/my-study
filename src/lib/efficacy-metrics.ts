/**
 * Learning-engine efficacy metrics (L-10).
 * North-star: accuracy on items whose first recorded attempt was at least
 * `minDelayDays` earlier — a delayed-retention proxy, not same-session performance.
 */

import type { ReviewEvent } from './review-event.ts';

const DAY_MS = 86_400_000;

export interface DelayedRetentionStats {
  /** Items with ≥1 attempt at or after firstSeen + minDelayDays */
  n: number;
  correct: number;
  /** 0–1; null when n === 0 */
  accuracy: number | null;
  minDelayDays: number;
}

export interface EfficacySnapshot {
  delayedRetention: DelayedRetentionStats;
  /** Mean latency on delayed attempts (ms), if any measured */
  meanLatencyMs: number | null;
  totalEvents: number;
  uniqueItems: number;
}

/**
 * First-touch timestamp per itemId.
 */
export function firstSeenByItem(events: ReviewEvent[]): Map<string, number> {
  const map = new Map<string, number>();
  const sorted = [...events].sort((a, b) => a.ts - b.ts);
  for (const e of sorted) {
    if (!map.has(e.itemId)) map.set(e.itemId, e.ts);
  }
  return map;
}

/**
 * Accuracy on attempts that occur at least `minDelayDays` after the item's first event.
 */
export function computeDelayedRetention(
  events: ReviewEvent[],
  minDelayDays = 7,
): DelayedRetentionStats {
  const first = firstSeenByItem(events);
  const minDelayMs = minDelayDays * DAY_MS;
  let n = 0;
  let correct = 0;
  for (const e of events) {
    const t0 = first.get(e.itemId);
    if (t0 == null) continue;
    if (e.ts - t0 < minDelayMs) continue;
    n += 1;
    if (e.correct) correct += 1;
  }
  return {
    n,
    correct,
    accuracy: n > 0 ? correct / n : null,
    minDelayDays,
  };
}

export function computeEfficacySnapshot(
  events: ReviewEvent[],
  minDelayDays = 7,
): EfficacySnapshot {
  const delayedRetention = computeDelayedRetention(events, minDelayDays);
  const first = firstSeenByItem(events);
  const minDelayMs = minDelayDays * DAY_MS;
  let latencySum = 0;
  let latencyN = 0;
  for (const e of events) {
    const t0 = first.get(e.itemId);
    if (t0 == null || e.ts - t0 < minDelayMs) continue;
    if (typeof e.latencyMs === 'number' && Number.isFinite(e.latencyMs) && e.latencyMs >= 0) {
      latencySum += e.latencyMs;
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
 * Brier score for binary outcomes given predicted probabilities aligned to events.
 * Lower is better. Returns null if lengths mismatch or empty.
 */
export function brierScore(predictions: number[], outcomes: boolean[]): number | null {
  if (predictions.length === 0 || predictions.length !== outcomes.length) return null;
  let s = 0;
  for (let i = 0; i < predictions.length; i++) {
    const p = Math.min(1, Math.max(0, predictions[i]!));
    const y = outcomes[i] ? 1 : 0;
    s += (p - y) ** 2;
  }
  return s / predictions.length;
}
