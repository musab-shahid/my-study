/**
 * Exam-date-aware interval capping and retention target (L-07).
 * Does not replace SM-2; compresses intervals as the exam approaches.
 */

export interface ExamAwareParams {
  /** Proposed interval in days from the current scheduler. */
  intervalDays: number;
  /** Calendar days until exam; null means no exam is configured. Negative ⇒ passed. */
  daysUntilExam: number | null;
  /** Absolute max interval when far from exam (matches spaced-repetition default). */
  maxIntervalDays?: number;
  /** Keep at least this many days before exam for a final review window. */
  finalReviewDays?: number;
  /** Fraction of remaining (non-final) window that interval may use. */
  remainingFraction?: number;
}

export type ExamAwareStatus = 'scheduled' | 'no_exam_date' | 'exam_passed';

export interface ExamAwareResult {
  status: ExamAwareStatus;
  intervalDays: number | null;
  /** Target retention for future FSRS (0.8–0.95); null without an upcoming exam. */
  requestRetention: number | null;
  /** True when the plan is infeasible (too many days needed vs remaining). */
  infeasible: boolean;
  reason: string;
}

/**
 * Cap a proposed interval using days remaining until the exam.
 * Missing dates are explicit; an interval is never fabricated for them.
 */
export function applyExamAwareInterval(params: ExamAwareParams): ExamAwareResult {
  const maxInterval = params.maxIntervalDays ?? 90;
  const finalReview = params.finalReviewDays ?? 3;
  const fraction = params.remainingFraction ?? 0.5;

  if (!Number.isFinite(params.intervalDays) || params.intervalDays <= 0) {
    throw new RangeError('intervalDays must be a finite number greater than zero.');
  }
  if (!Number.isFinite(maxInterval) || maxInterval <= 0) {
    throw new RangeError('maxIntervalDays must be a finite number greater than zero.');
  }
  if (!Number.isFinite(finalReview) || finalReview < 0) {
    throw new RangeError('finalReviewDays must be a finite non-negative number.');
  }
  if (!Number.isFinite(fraction) || fraction <= 0 || fraction > 1) {
    throw new RangeError('remainingFraction must be in the range (0, 1].');
  }

  const days = params.daysUntilExam;
  if (days === null) {
    return {
      status: 'no_exam_date',
      intervalDays: null,
      requestRetention: null,
      infeasible: false,
      reason: 'no_exam_date',
    };
  }
  if (!Number.isFinite(days)) {
    throw new RangeError('daysUntilExam must be finite or null.');
  }
  if (days < 0) {
    return {
      status: 'exam_passed',
      intervalDays: null,
      requestRetention: null,
      infeasible: true,
      reason: 'exam_passed',
    };
  }

  if (days <= finalReview) {
    return {
      status: 'scheduled',
      intervalDays: 1,
      requestRetention: 0.95,
      infeasible: false,
      reason: 'final_review_window',
    };
  }

  const usable = Math.max(1, Math.floor((days - finalReview) * fraction));
  const capped = Math.max(1, Math.min(params.intervalDays, maxInterval, usable));

  // Provisional retention targets for future scheduler evaluation, not validated policy.
  let requestRetention = 0.9;
  if (days <= 14) requestRetention = 0.95;
  else if (days <= 30) requestRetention = 0.92;

  return {
    status: 'scheduled',
    intervalDays: capped,
    requestRetention,
    infeasible: params.intervalDays > usable && usable <= 1,
    reason: capped < params.intervalDays ? 'capped_to_exam' : 'unchanged',
  };
}

/** Days between calendar dates in the supplied IANA time zone (UTC by default). */
export function daysUntilIsoDate(
  isoDate: string,
  nowMs: number = Date.now(),
  timeZone = 'UTC',
): number {
  const target = Date.parse(isoDate);
  if (!Number.isFinite(target) || !Number.isFinite(nowMs)) return Number.NaN;

  try {
    const dateParts = (epochMs: number) => {
      const parts = new Intl.DateTimeFormat('en', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).formatToParts(epochMs);
      const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
      const year = Number(values.year);
      const month = Number(values.month);
      const day = Number(values.day);
      if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
        throw new RangeError('Unable to resolve calendar date.');
      }
      return Math.floor(Date.UTC(year, month - 1, day) / 86_400_000);
    };
    return dateParts(target) - dateParts(nowMs);
  } catch {
    return Number.NaN;
  }
}
