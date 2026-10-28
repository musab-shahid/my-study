/**
 * Bridge: turn quiz answers into ReviewEvents and append without blocking saves.
 */

import {
  buildReviewEvent,
  type ReviewConfidence,
  type ReviewEvent,
  type ReviewMode,
} from './review-event.ts';
import { getDefaultReviewLog, type ReviewLog } from './review-log.ts';

export interface DualWriteAnswer {
  questionId: string;
  correct: boolean;
  /** Skill unit: variant group or topic. */
  skillId?: string;
  latencyMs?: number;
  confidence?: ReviewConfidence;
  chosenOption?: string;
}

export interface DualWriteParams {
  answers: DualWriteAnswer[];
  mode: ReviewMode;
  sessionId?: string;
  deviceId?: string;
  ts?: number;
  log?: ReviewLog;
}

/**
 * Best-effort dual-write. Never throws to callers; logs failures to console in dev.
 */
export async function dualWriteQuizAttempts(params: DualWriteParams): Promise<ReviewEvent[]> {
  const {
    answers,
    mode,
    sessionId = `quiz_${params.ts ?? Date.now()}`,
    deviceId,
    ts = Date.now(),
    log = getDefaultReviewLog(),
  } = params;

  const events: ReviewEvent[] = answers.map((a, i) =>
    buildReviewEvent({
      itemId: a.questionId,
      skillId: a.skillId ?? a.questionId,
      correct: a.correct,
      mode,
      latencyMs: a.latencyMs,
      confidence: a.confidence,
      chosenOption: a.chosenOption,
      // Stable ordering within a session when timestamps collide
      ts: ts + i,
      deviceId,
      sessionId,
    }),
  );

  try {
    await log.appendMany(events);
  } catch (err) {
    if (typeof console !== 'undefined') {
      console.warn('[review-log] dual-write failed (aggregates still saved)', err);
    }
  }
  return events;
}

/** Fire-and-forget wrapper for use from synchronous storage paths. */
export function dualWriteQuizAttemptsFireAndForget(params: DualWriteParams): void {
  void dualWriteQuizAttempts(params);
}
