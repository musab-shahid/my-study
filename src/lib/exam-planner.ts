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
  FPSC_OCT_2026_SESSIONS,
  getNextSession,
  type ExamSession,
} from './exam-schedule.ts';

/** Relative weight for a subject or topic on the exam (sum need not be 1). */
export interface BlueprintWeight {
  id: string;
  weight: number;
  label?: string;
}

/**
 * Default FPSC-style weights for Met / Asst Met style papers.
 * Placeholder until official blueprint percentages are verified — values are relative only.
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

/**
 * Rank topics by exam weight × expected forgetting (1 - recall), with due boost.
 */
export function rankTopicsForExamDay(
  topics: TopicPlanInput[],
  weights: readonly BlueprintWeight[] = DEFAULT_FPSC_MET_WEIGHTS,
): RankedTopic[] {
  const wMap = new Map(weights.map((w) => [w.id, w.weight]));
  const ranked = topics.map((t) => {
    const weight = wMap.get(t.blueprintId ?? '') ?? 1;
    const recall = t.predictedRecall ?? 0.5;
    const forgetting = Math.max(0, 1 - recall);
    const dueBoost = t.due ? 1.25 : 1;
    const score = weight * forgetting * dueBoost;
    return {
      topicId: t.topicId,
      score,
      weight,
      forgetting,
      due: Boolean(t.due),
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
  /** Exam-aware interval helper for a sample 14-day proposal. */
  sampleInterval: ExamAwareResult;
  message: string;
}

/**
 * Build a lightweight daily workload signal from due count and next exam.
 */
export function planDailyWorkload(args: {
  dueTopicCount: number;
  minutesPerDueTopic?: number;
  dailyBudgetMinutes?: number;
  sessions?: ExamSession[];
  now?: Date;
}): WorkloadPlan {
  const now = args.now ?? new Date();
  const sessions = args.sessions ?? FPSC_OCT_2026_SESSIONS;
  const session = getNextSession(sessions, now);
  const daysUntilExam = session
    ? daysUntilIsoDate(session.startsAtIso, now.getTime())
    : null;
  const minutesPer = args.minutesPerDueTopic ?? 12;
  const budget = args.dailyBudgetMinutes ?? 90;
  const needed = args.dueTopicCount * minutesPer;
  const overloaded = needed > budget;

  const sampleInterval = applyExamAwareInterval({
    intervalDays: 14,
    daysUntilExam: daysUntilExam ?? 90,
  });

  let message = 'No upcoming exam session in the schedule.';
  if (session && daysUntilExam != null) {
    if (daysUntilExam <= 3) {
      message = `Final review window (${daysUntilExam}d). Prefer short, high-weight reviews.`;
    } else if (overloaded) {
      message = `About ${needed} min of due work vs ${budget} min budget — prioritize top-weighted topics.`;
    } else {
      message = `${daysUntilExam} days to ${session.title}. Suggested today: ~${Math.min(needed, budget)} min.`;
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
