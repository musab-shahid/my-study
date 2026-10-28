/**
 * Exam-date-aware interval capping and retention target (L-07).
 * Does not replace SM-2; compresses intervals as the exam approaches.
 */

export interface ExamAwareParams {
  /** Proposed interval in days from the current scheduler. */
  intervalDays: number;
  /** Calendar days until exam (floor). Negative ⇒ exam passed. */
  daysUntilExam: number;
  /** Absolute max interval when far from exam (matches spaced-repetition default). */
  maxIntervalDays?: number;
  /** Keep at least this many days before exam for a final review window. */
  finalReviewDays?: number;
  /** Fraction of remaining (non-final) window that interval may use. */
  remainingFraction?: number;
}

export interface ExamAwareResult {
  intervalDays: number;
  /** Target retention for future FSRS (0.8–0.95); rises near exam. */
  requestRetention: number;
  /** True when the plan is infeasible (too many days needed vs remaining). */
  infeasible: boolean;
  reason: string;
}

/**
 * Cap a proposed interval using days remaining until the exam.
 */
export function applyExamAwareInterval(params: ExamAwareParams): ExamAwareResult {
  const maxInterval = params.maxIntervalDays ?? 90;
  const finalReview = params.finalReviewDays ?? 3;
  const fraction = params.remainingFraction ?? 0.5;
  const days = params.daysUntilExam;

  if (!Number.isFinite(days) || days < 0) {
    return {
      intervalDays: Math.min(params.intervalDays, maxInterval),
      requestRetention: 0.9,
      infeasible: days < 0,
      reason: days < 0 ? 'exam_passed' : 'no_exam_date',
    };
  }

  if (days <= finalReview) {
    return {
      intervalDays: 1,
      requestRetention: 0.95,
      infeasible: false,
      reason: 'final_review_window',
    };
  }

  const usable = Math.max(1, Math.floor((days - finalReview) * fraction));
  const capped = Math.max(1, Math.min(params.intervalDays, maxInterval, usable));

  // Raise retention target as exam nears (for shadow FSRS / future scheduler).
  let requestRetention = 0.9;
  if (days <= 14) requestRetention = 0.95;
  else if (days <= 30) requestRetention = 0.92;

  return {
    intervalDays: capped,
    requestRetention,
    infeasible: params.intervalDays > usable && usable <= 1,
    reason: capped < params.intervalDays ? 'capped_to_exam' : 'unchanged',
  };
}

/** Days between now and an ISO date (UTC date floor). */
export function daysUntilIsoDate(isoDate: string, nowMs: number = Date.now()): number {
  const target = Date.parse(isoDate);
  if (!Number.isFinite(target)) return Number.NaN;
  const dayMs = 86_400_000;
  const nowDay = Math.floor(nowMs / dayMs);
  const targetDay = Math.floor(target / dayMs);
  return targetDay - nowDay;
}
