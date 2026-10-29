/**
 * Exam-blueprint-aware study planning helpers (L-07).
 * Pure functions — UI may call these; they do not mutate scheduler state.
 */

import {
  applyExamAwareInterval,
  daysUntilIsoDate,
  type ExamAwareResult,
} from './exam-aware-schedule.ts';
import {
  DEFAULT_EXAM_SESSIONS,
  getNextSession,
  validateExamSessions,
  type ExamSession,
} from './exam-schedule.ts';

/** Relative weight for a subject or topic on an exam (sum need not be 1). */
export interface BlueprintWeight {
  id: string;
  weight: number;
  label?: string;
}

/**
 * Provisional relative weights for FPSC-style Met / Asst Met papers.
 * These are not official blueprint percentages and must be supplied explicitly
 * by a learner/profile before being interpreted as exam-specific priorities.
 */
export const DEFAULT_FPSC_MET_WEIGHTS: readonly BlueprintWeight[] = [
  { id: 'atmosphere', weight: 1.2, label: 'Atmosphere / dynamics' },
  { id: 'thermodynamics', weight: 1.1, label: 'Thermo / moisture' },
  { id: 'synoptic', weight: 1.0, label: 'Synoptic / weather systems' },
  { id: 'instruments', weight: 0.8, label: 'Instruments / observations' },
  { id: 'climate', weight: 0.7, label: 'Climate / applied' },
];

export interface TopicPlanInput {
  topicId: string;
  /** Optional subject or blueprint bucket id. */
  blueprintId?: string;
  /** 0–1 predicted recall or competence (higher = safer to defer). */
  predictedRecall?: number;
  /** True if nextReview is due. */
  due?: boolean;
  /** Minutes of focused work estimate. */
  minutes?: number;
}

export interface RankedTopic {
  topicId: string;
  score: number;
  weight: number;
  forgetting: number;
  due: boolean;
}

function assertFiniteRange(name: string, value: number, min: number, max = Number.POSITIVE_INFINITY): void {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(`${name} must be a finite number in [${min}, ${max}].`);
  }
}

/** Rank topics by provisional exam weight × expected forgetting, with a due boost. */
export function rankTopicsForExamDay(
  topics: TopicPlanInput[],
  weights: readonly BlueprintWeight[] = DEFAULT_FPSC_MET_WEIGHTS,
): RankedTopic[] {
  const wMap = new Map<string, number>();
  for (const weight of weights) {
    if (!weight.id.trim()) throw new RangeError('Blueprint weight id is required.');
    assertFiniteRange(`weight for ${weight.id}`, weight.weight, Number.MIN_VALUE);
    if (wMap.has(weight.id)) throw new RangeError(`Duplicate blueprint weight id: ${weight.id}`);
    wMap.set(weight.id, weight.weight);
  }

  const ranked = topics.map((topic) => {
    if (!topic.topicId.trim()) throw new RangeError('topicId is required.');
    const weight = wMap.get(topic.blueprintId ?? '') ?? 1;
    const recall = topic.predictedRecall ?? 0.5;
    assertFiniteRange(`predictedRecall for ${topic.topicId}`, recall, 0, 1);
    if (topic.minutes !== undefined) assertFiniteRange(`minutes for ${topic.topicId}`, topic.minutes, 0);
    const forgetting = 1 - recall;
    const dueBoost = topic.due ? 1.25 : 1;
    const score = weight * forgetting * dueBoost;
    return {
      topicId: topic.topicId,
      score,
      weight,
      forgetting,
      due: Boolean(topic.due),
    };
  });
  ranked.sort((a, b) => b.score - a.score);
  return ranked;
}

export interface WorkloadPlan {
  daysUntilExam: number | null;
  session: ExamSession | null;
  /** Suggested minutes today. */
  suggestedMinutes: number;
  /** True when due work exceeds a reasonable daily budget. */
  overloaded: boolean;
  /** Null when no upcoming exam is configured. */
  sampleInterval: ExamAwareResult | null;
  message: string;
}

/** Build a lightweight daily workload signal from due count and next configured exam. */
export function planDailyWorkload(args: {
  dueTopicCount: number;
  minutesPerDueTopic?: number;
  dailyBudgetMinutes?: number;
  sessions?: readonly ExamSession[];
  now?: Date;
}): WorkloadPlan {
  assertFiniteRange('dueTopicCount', args.dueTopicCount, 0);
  if (!Number.isInteger(args.dueTopicCount)) {
    throw new RangeError('dueTopicCount must be a non-negative integer.');
  }

  const minutesPer = args.minutesPerDueTopic ?? 12;
  const budget = args.dailyBudgetMinutes ?? 90;
  assertFiniteRange('minutesPerDueTopic', minutesPer, 0);
  assertFiniteRange('dailyBudgetMinutes', budget, 0);

  const now = args.now ?? new Date();
  if (!Number.isFinite(now.getTime())) throw new RangeError('now must be a valid Date.');

  const sessions = args.sessions ?? DEFAULT_EXAM_SESSIONS;
  const sessionErrors = validateExamSessions(sessions);
  if (sessionErrors.length > 0) throw new RangeError(`Invalid exam session configuration: ${sessionErrors.join('; ')}`);

  const session = getNextSession(sessions, now);
  const daysUntilExam = session
    ? daysUntilIsoDate(session.startsAtIso, now.getTime(), session.timeZone ?? 'UTC')
    : null;
  if (session && (daysUntilExam === null || !Number.isFinite(daysUntilExam))) {
    throw new RangeError('Could not calculate days until the configured exam.');
  }

  const needed = args.dueTopicCount * minutesPer;
  const overloaded = needed > budget;
  const sampleInterval = session && daysUntilExam !== null
    ? applyExamAwareInterval({ intervalDays: 14, daysUntilExam })
    : null;

  let message = 'No upcoming exam session is configured.';
  if (session && daysUntilExam !== null) {
    if (daysUntilExam <= 3) {
      message = `Final review window (${daysUntilExam}d). Prefer short, high-weight reviews.`;
    } else if (overloaded) {
      message = `About ${needed} min of due work vs ${budget} min budget — prioritize top-weighted topics.`;
    } else {
      message = `${daysUntilExam} days to ${session.label}. Suggested today: ~${Math.min(needed, budget)} min.`;
    }
  }

  return {
    daysUntilExam,
    session,
    suggestedMinutes: Math.min(needed, budget),
    overloaded,
    sampleInterval,
    message,
  };
}
