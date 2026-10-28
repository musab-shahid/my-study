/**
 * Shadow scheduler comparison (Phase 2 precursor).
 * Does not change what learners see. Compares a simple stability model’s
 * predicted recall against actual review outcomes from the event log.
 *
 * Full ts-fsrs integration can replace `predictRecall` later without changing callers.
 */

import type { ReviewEvent } from './review-event.ts';

export interface ShadowCardState {
  itemId: string;
  /** Stability proxy in days (higher = slower forgetting). */
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  lastTs: number;
}

export interface ShadowPrediction {
  itemId: string;
  predictedRecall: number;
  actualCorrect: boolean;
  elapsedDays: number;
}

const DEFAULT_STABILITY = 3;
const MIN_STABILITY = 0.5;

/** Retrievability ≈ exp(-elapsedDays / stability) — FSRS-inspired simplification. */
export function predictRecall(stabilityDays: number, elapsedDays: number): number {
  const s = Math.max(MIN_STABILITY, stabilityDays);
  const t = Math.max(0, elapsedDays);
  return Math.exp(-t / s);
}

function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}

/**
 * Update shadow state after an outcome (very rough FSRS-like step).
 * Not a substitute for ts-fsrs — only for offline comparison / regression harness.
 */
export function updateShadowState(
  prev: ShadowCardState | undefined,
  event: ReviewEvent,
): ShadowCardState {
  const base: ShadowCardState = prev ?? {
    itemId: event.itemId,
    stability: DEFAULT_STABILITY,
    difficulty: 0.3,
    reps: 0,
    lapses: 0,
    lastTs: event.ts,
  };

  let { stability, difficulty, reps, lapses } = base;
  if (event.correct) {
    reps += 1;
    // Successful recall grows stability; confident correct grows faster
    const boost = event.confidence === 3 ? 2.2 : event.confidence === 1 ? 1.3 : 1.7;
    stability = Math.min(365, Math.max(MIN_STABILITY, stability * boost));
    difficulty = clamp01(difficulty - 0.02);
  } else {
    lapses += 1;
    reps = 0;
    stability = Math.max(MIN_STABILITY, stability * 0.35);
    difficulty = clamp01(difficulty + 0.08);
  }

  return {
    itemId: event.itemId,
    stability,
    difficulty,
    reps,
    lapses,
    lastTs: event.ts,
  };
}

/**
 * Walk events in time order; at each review after the first for an item,
 * record predicted recall (from prior stability + elapsed) vs actual.
 */
export function shadowEvaluate(events: ReviewEvent[]): {
  predictions: ShadowPrediction[];
  logLoss: number | null;
  states: Record<string, ShadowCardState>;
} {
  const ordered = [...events].sort((a, b) => a.ts - b.ts);
  const states: Record<string, ShadowCardState> = {};
  const predictions: ShadowPrediction[] = [];

  for (const e of ordered) {
    const prev = states[e.itemId];
    if (prev) {
      const elapsedDays = Math.max(0, (e.ts - prev.lastTs) / 86_400_000);
      const predictedRecall = predictRecall(prev.stability, elapsedDays);
      predictions.push({
        itemId: e.itemId,
        predictedRecall,
        actualCorrect: e.correct,
        elapsedDays,
      });
    }
    states[e.itemId] = updateShadowState(prev, e);
  }

  let logLoss: number | null = null;
  if (predictions.length > 0) {
    const eps = 1e-7;
    let sum = 0;
    for (const p of predictions) {
      const y = p.actualCorrect ? 1 : 0;
      const ph = Math.min(1 - eps, Math.max(eps, p.predictedRecall));
      sum += -(y * Math.log(ph) + (1 - y) * Math.log(1 - ph));
    }
    logLoss = sum / predictions.length;
  }

  return { predictions, logLoss, states };
}

/** Baseline: constant 0.68 success prediction (near-miss target) for comparison. */
export function constantLogLoss(events: ReviewEvent[], p = 0.68): number | null {
  const ordered = [...events].sort((a, b) => a.ts - b.ts);
  const seen = new Set<string>();
  const outcomes: boolean[] = [];
  for (const e of ordered) {
    if (seen.has(e.itemId)) outcomes.push(e.correct);
    seen.add(e.itemId);
  }
  if (outcomes.length === 0) return null;
  const eps = 1e-7;
  const ph = Math.min(1 - eps, Math.max(eps, p));
  let sum = 0;
  for (const ok of outcomes) {
    const y = ok ? 1 : 0;
    sum += -(y * Math.log(ph) + (1 - y) * Math.log(1 - ph));
  }
  return sum / outcomes.length;
}
