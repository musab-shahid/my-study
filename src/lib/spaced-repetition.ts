/**
 * Spaced-repetition scheduler (no localStorage / React).
 *
 * v2: SM-2-inspired continuous intervals + ease factor.
 * - Still writes nextReview (YYYY-MM-DD local) as the single due date.
 * - reviewStage is retained as a nearest-bucket index into REVIEW_STAGES_DAYS for UI/migration.
 * - easeFactor + intervalDays grow/shrink with quiz accuracy.
 *
 * Prefer stored reviewStage / intervalDays over date-only inference.
 */
import { REVIEW_STAGES_DAYS, localDateString, parseLocalDate } from './constants';

const STAGES = [...REVIEW_STAGES_DAYS];

export const DEFAULT_EASE = 2.5;
export const MIN_EASE = 1.3;
/** Cap so intervals stay exam-prep practical (not multi-year). */
export const MAX_INTERVAL_DAYS = 90;

export function getCurrentStage(nextReview: string | null, today: Date = new Date()): number {
  if (!nextReview) return -1;
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const reviewDate = parseLocalDate(nextReview);
  reviewDate.setHours(0, 0, 0, 0);
  const diffDays = Math.round((reviewDate.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) {
    return STAGES.length - 1;
  }
  for (let i = 0; i < STAGES.length; i++) {
    if (diffDays <= STAGES[i]) return i;
  }
  return STAGES.length - 1;
}

export function resolveReviewStage(
  storedStage: number | null | undefined,
  nextReview: string | null,
  today: Date = new Date(),
): number {
  if (typeof storedStage === 'number' && storedStage >= -1 && storedStage < STAGES.length) {
    return storedStage;
  }
  return getCurrentStage(nextReview, today);
}

export function accuracyToQuality(accuracy: number): number {
  if (accuracy >= 90) return 5;
  if (accuracy >= 80) return 4;
  if (accuracy >= 65) return 3;
  if (accuracy >= 50) return 2;
  if (accuracy >= 35) return 1;
  return 0;
}

export function stageForIntervalDays(days: number): number {
  if (days <= 0) return 0;
  let best = 0;
  let bestDist = Math.abs(STAGES[0] - days);
  for (let i = 1; i < STAGES.length; i++) {
    const d = Math.abs(STAGES[i] - days);
    if (d < bestDist) {
      best = i;
      bestDist = d;
    }
  }
  return best;
}

export function nextEaseFactor(ease: number, quality: number): number {
  const q = Math.max(0, Math.min(5, quality));
  const ef = ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  return Math.max(MIN_EASE, Math.round(ef * 100) / 100);
}

export interface ScheduleInput {
  intervalDays?: number | null;
  easeFactor?: number | null;
  reviewStage?: number | null;
  accuracy: number;
  from?: Date;
}

export interface ScheduleResult {
  nextReview: string;
  intervalDays: number;
  easeFactor: number;
  reviewStage: number;
}

export function scheduleAfterReview(input: ScheduleInput): ScheduleResult {
  const from = input.from ?? new Date();
  const quality = accuracyToQuality(input.accuracy);
  const prevEase =
    typeof input.easeFactor === 'number' && Number.isFinite(input.easeFactor)
      ? Math.max(MIN_EASE, input.easeFactor)
      : DEFAULT_EASE;

  let prevInterval =
    typeof input.intervalDays === 'number' && input.intervalDays > 0
      ? input.intervalDays
      : null;
  if (prevInterval == null && typeof input.reviewStage === 'number' && input.reviewStage >= 0) {
    const idx = Math.min(input.reviewStage, STAGES.length - 1);
    prevInterval = STAGES[idx];
  }

  const easeFactor = nextEaseFactor(prevEase, quality);
  let intervalDays: number;

  if (quality < 3) {
    intervalDays = 1;
  } else if (prevInterval == null) {
    intervalDays = 1;
  } else if (prevInterval <= 1) {
    intervalDays = 3;
  } else {
    intervalDays = Math.min(MAX_INTERVAL_DAYS, Math.max(1, Math.round(prevInterval * easeFactor)));
  }

  const date = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  date.setDate(date.getDate() + intervalDays);

  return {
    nextReview: localDateString(date),
    intervalDays,
    easeFactor,
    reviewStage: stageForIntervalDays(intervalDays),
  };
}

export function nextStageAfterReview(currentStage: number, accuracy: number): number {
  const staged =
    currentStage < 0
      ? null
      : STAGES[Math.min(currentStage, STAGES.length - 1)];
  const result = scheduleAfterReview({
    reviewStage: currentStage,
    intervalDays: staged,
    accuracy,
  });
  return result.reviewStage;
}

export function reviewDateForStage(stage: number, from: Date = new Date()): string {
  const idx = Math.max(0, Math.min(stage, STAGES.length - 1));
  const days = STAGES[idx];
  const date = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  date.setDate(date.getDate() + days);
  return localDateString(date);
}

export function computeNextReviewDate(
  currentStage: number,
  accuracy: number,
  from: Date = new Date(),
): string {
  const staged =
    currentStage < 0 ? null : STAGES[Math.min(currentStage, STAGES.length - 1)];
  return scheduleAfterReview({
    reviewStage: currentStage,
    intervalDays: staged,
    accuracy,
    from,
  }).nextReview;
}

export function reviewStages(): readonly number[] {
  return STAGES;
}
