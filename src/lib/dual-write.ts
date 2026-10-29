/**
 * Bridge: turn quiz answers into ReviewEvents and append without blocking saves.
 */

import {
  buildReviewEvent,
  type ReviewConfidence,
  type ReviewEvent,
  type ReviewMode,
} from './review-event.ts';
import { getDefaultReviewLog, ReviewLogPersistenceError, type ReviewLog } from './review-log.ts';

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

export type DualWriteStatus = 'persisted' | 'partial' | 'failed';

export interface DualWriteResult {
  /** Events constructed from the answers (always present, regardless of persistence). */
  events: ReviewEvent[];
  /** Whether events were durably persisted. */
  status: DualWriteStatus;
  /** Error category if persistence failed. */
  errorCategory?: string;
  /** Number of persistence attempts made (including the initial attempt). */
  attempts: number;
}

const MAX_RETRIES = 2;
const RETRY_BASE_DELAY_MS = 100;

/** Categories that are permanent — never retried. */
const PERMANENT_ERRORS = new Set([
  'invalid_event',
  'duplicate_id_conflict',
  'batch_conflict',
]);

function isTransientError(err: unknown): boolean {
  if (err instanceof ReviewLogPersistenceError) {
    return !PERMANENT_ERRORS.has(err.category);
  }
  // Unknown errors are treated as potentially transient
  return true;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Dual-write with bounded retry. Never throws to callers — returns a structured result.
 * Retries only transient failures with identical event payloads (never creates new IDs).
 */
export async function dualWriteQuizAttempts(params: DualWriteParams): Promise<DualWriteResult> {
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
      ts: ts + i,
      deviceId,
      sessionId,
    }),
  );

  let attempt = 0;
  let lastError: unknown;

  while (attempt <= MAX_RETRIES) {
    try {
      await log.appendMany(events);
      return { events, status: 'persisted', attempts: attempt + 1 };
    } catch (err) {
      lastError = err;
      if (!isTransientError(err)) {
        const errorCategory = err instanceof ReviewLogPersistenceError ? err.category : 'unknown';
        return { events, status: 'failed', errorCategory, attempts: attempt + 1 };
      }
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_BASE_DELAY_MS * Math.pow(2, attempt));
      }
    }
    attempt++;
  }

  const errorCategory = lastError instanceof ReviewLogPersistenceError ? lastError.category : 'unknown';
  return { events, status: 'failed', errorCategory, attempts: attempt };
}

/** Fire-and-forget wrapper for use from synchronous storage paths. */
export function dualWriteQuizAttemptsFireAndForget(params: DualWriteParams): void {
  void dualWriteQuizAttempts(params).then((result) => {
    if (result.status === 'failed' && typeof console !== 'undefined') {
      console.warn('[review-log] dual-write failed (aggregates still saved)', result.errorCategory);
    }
  });
}
