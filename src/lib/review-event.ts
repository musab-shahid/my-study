/**
 * Immutable per-attempt review events (learning-science Phase 0).
 * Aggregates remain authoritative until a future cutover; events dual-write alongside them.
 */

export type ReviewConfidence = 1 | 2 | 3; // 1=guess, 2=think so, 3=sure

export type ReviewMode =
  | 'topic'
  | 'quick'
  | 'mock'
  | 'review'
  | 'challenge'
  | 'flashcard';

export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

export interface ReviewEvent {
  /** Unique across devices (UUIDv4 for broad browser support). */
  id: string;
  /** Epoch ms when the learner submitted the answer. */
  ts: number;
  deviceId: string;
  sessionId: string;
  /** Stable question or card id. */
  itemId: string;
  /** Skill unit: variantGroupId when known, else topicId, else itemId. */
  skillId: string;
  mode: ReviewMode;
  correct: boolean;
  /** Time from item shown to answer, if measured. */
  latencyMs?: number;
  /** Optional metacognitive rating before feedback. */
  confidence?: ReviewConfidence;
  /** Selected option id/key for distractor analytics. */
  chosenOption?: string;
  /** Scheduler / dual-write schema tag. */
  algoVersion: string;
}

export const REVIEW_EVENT_ALGO_VERSION = 'dual-write-v1';

export function createReviewEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `re_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Map correctness + optional confidence to a graded label (FSRS-style).
 * Confident wrong → again (hypercorrection target).
 * Unsure correct → hard (weak encoding signal).
 */
export function gradeFromAttempt(
  correct: boolean,
  confidence?: ReviewConfidence,
): ReviewGrade {
  if (!correct) {
    return confidence === 3 ? 'again' : confidence === 1 ? 'hard' : 'again';
  }
  if (confidence === 1) return 'hard';
  if (confidence === 3) return 'easy';
  return 'good';
}

export interface AttemptInput {
  itemId: string;
  skillId: string;
  correct: boolean;
  mode: ReviewMode;
  latencyMs?: number;
  confidence?: ReviewConfidence;
  chosenOption?: string;
  ts?: number;
  deviceId?: string;
  sessionId?: string;
  algoVersion?: string;
}

export function buildReviewEvent(input: AttemptInput): ReviewEvent {
  return {
    id: createReviewEventId(),
    ts: input.ts ?? Date.now(),
    deviceId: input.deviceId ?? 'unknown-device',
    sessionId: input.sessionId ?? `session_${input.ts ?? Date.now()}`,
    itemId: input.itemId,
    skillId: input.skillId,
    mode: input.mode,
    correct: input.correct,
    latencyMs: input.latencyMs,
    confidence: input.confidence,
    chosenOption: input.chosenOption,
    algoVersion: input.algoVersion ?? REVIEW_EVENT_ALGO_VERSION,
  };
}
