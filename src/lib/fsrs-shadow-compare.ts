/**
 * Shadow FSRS evaluation vs simple baselines (Phase 2 learning-science).
 * Does not change what learners see — metrics only.
 *
 * Uses the existing shadow-fsrs stability model plus an SM-2-like
 * interval predictor so we can report relative log-loss on the review log.
 */

import type { ReviewEvent } from './review-event.ts';
import { gradeFromAttempt } from './review-event.ts';
import {
  shadowEvaluate,
  constantLogLoss,
  predictRecall,
  type ShadowCardState,
} from './shadow-fsrs.ts';

/** Crude SM-2 style state for offline comparison only. */
export interface Sm2ShadowState {
  itemId: string;
  ease: number;
  intervalDays: number;
  lastTs: number;
}

function clampEase(e: number): number {
  return Math.max(1.3, Math.min(3.0, e));
}

/**
 * Update SM-2-like state from a graded attempt.
 * Quality: again=1, hard=2, good=3, easy=4 (maps from gradeFromAttempt).
 */
export function updateSm2Shadow(
  prev: Sm2ShadowState | undefined,
  event: ReviewEvent,
): Sm2ShadowState {
  const grade = gradeFromAttempt(event.correct, event.confidence);
  const quality = grade === 'again' ? 1 : grade === 'hard' ? 2 : grade === 'good' ? 3 : 4;
  const base: Sm2ShadowState = prev ?? {
    itemId: event.itemId,
    ease: 2.5,
    intervalDays: 0,
    lastTs: event.ts,
  };

  let { ease, intervalDays } = base;
  if (quality < 3) {
    intervalDays = 1;
    ease = clampEase(ease - 0.2);
  } else if (intervalDays <= 0) {
    intervalDays = 1;
    ease = clampEase(ease + 0.05);
  } else if (intervalDays === 1) {
    intervalDays = 3;
    ease = clampEase(ease + (quality === 4 ? 0.15 : 0.05));
  } else {
    ease = clampEase(ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    intervalDays = Math.min(90, Math.max(1, Math.round(intervalDays * ease)));
  }

  return { itemId: event.itemId, ease, intervalDays, lastTs: event.ts };
}

/**
 * Predict recall under SM-2: treat scheduled interval as mean lifetime;
 * R ≈ exp(-elapsed / interval) capped.
 */
export function predictSm2Recall(state: Sm2ShadowState, atTs: number): number {
  const elapsedDays = Math.max(0, (atTs - state.lastTs) / 86_400_000);
  const life = Math.max(0.5, state.intervalDays);
  return predictRecall(life, elapsedDays);
}

export function sm2Evaluate(events: ReviewEvent[]): {
  logLoss: number | null;
  n: number;
} {
  const ordered = [...events].sort((a, b) => a.ts - b.ts);
  const states: Record<string, Sm2ShadowState> = {};
  const eps = 1e-7;
  let sum = 0;
  let n = 0;

  for (const e of ordered) {
    const prev = states[e.itemId];
    if (prev) {
      const ph = Math.min(1 - eps, Math.max(eps, predictSm2Recall(prev, e.ts)));
      const y = e.correct ? 1 : 0;
      sum += -(y * Math.log(ph) + (1 - y) * Math.log(1 - ph));
      n += 1;
    }
    states[e.itemId] = updateSm2Shadow(prev, e);
  }

  return { logLoss: n > 0 ? sum / n : null, n };
}

export interface SchedulerCompareResult {
  /** Shadow FSRS-inspired log loss (lower is better). */
  fsrsLogLoss: number | null;
  /** SM-2-like item log loss. */
  sm2LogLoss: number | null;
  /** Constant 0.68 baseline. */
  constant68LogLoss: number | null;
  predictionCount: number;
  /** Positive when FSRS beats SM-2 on this history. */
  fsrsBeatsSm2: boolean | null;
  /** Positive when FSRS beats constant baseline. */
  fsrsBeatsConstant: boolean | null;
}

/**
 * Compare shadow FSRS, SM-2-like, and constant predictors on the same events.
 * Safe on empty logs (null metrics).
 */
export function compareSchedulersOnLog(events: ReviewEvent[]): SchedulerCompareResult {
  const fsrs = shadowEvaluate(events);
  const sm2 = sm2Evaluate(events);
  const c68 = constantLogLoss(events, 0.68);
  const n = fsrs.predictions.length;

  return {
    fsrsLogLoss: fsrs.logLoss,
    sm2LogLoss: sm2.logLoss,
    constant68LogLoss: c68,
    predictionCount: n,
    fsrsBeatsSm2:
      fsrs.logLoss != null && sm2.logLoss != null ? fsrs.logLoss < sm2.logLoss : null,
    fsrsBeatsConstant:
      fsrs.logLoss != null && c68 != null ? fsrs.logLoss < c68 : null,
  };
}

/** Export card states after walking the log (for diagnostics). */
export function finalFsrsStates(events: ReviewEvent[]): Record<string, ShadowCardState> {
  return shadowEvaluate(events).states;
}
