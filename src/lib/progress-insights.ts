/**
 * Progress insights: coverage vs competence, calibration from review log.
 */

import type { QuestionResult } from '@/types';
import type { ReviewEvent } from './review-event.ts';
import {
  computeBayesianMastery,
  compositeReadiness,
  type MasteryPosterior,
} from './mastery-bayesian.ts';
import { computeCalibration, type CalibrationBin } from './calibration.ts';
import { getDefaultReviewLog } from './review-log.ts';
import {
  computeEfficacySnapshot,
  type EfficacySnapshot,
} from './efficacy-metrics.ts';

export interface CoverageCompetence {
  coverageShare: number;
  coveragePct: number;
  competence: MasteryPosterior;
  /** Explicit composite that does NOT treat “studied” as half of mastery. */
  readinessScore: number;
  /**
   * True only when there is enough real attempt evidence to justify showing a
   * numeric readiness score. With near-zero attempts the Bayesian prior alone
   * yields ~38/100, which would present a cold start as measured readiness.
   */
  readinessEvidenceSufficient: boolean;
}

/** Below this many scored attempts, a readiness number is prior-dominated, not evidence. */
export const READINESS_MIN_ATTEMPTS = 5;

export function computeCoverageCompetence(args: {
  studiedTopics: number;
  totalTopics: number;
  /** Lifetime correct answers across scoped items */
  correct: number;
  /** Lifetime attempts across scoped items */
  attempts: number;
}): CoverageCompetence {
  const total = Math.max(0, args.totalTopics);
  const studied = Math.max(0, args.studiedTopics);
  const coverageShare = total > 0 ? Math.min(1, studied / total) : 0;
  const competence = computeBayesianMastery(args.correct, args.attempts);
  const readiness = compositeReadiness({
    coverageShare,
    meanRecallProbability: competence.mean,
    coverageWeight: 0.25,
  });
  return {
    coverageShare,
    coveragePct: Math.round(coverageShare * 100),
    competence,
    readinessScore: Math.round(readiness.score),
    readinessEvidenceSufficient: args.attempts >= READINESS_MIN_ATTEMPTS,
  };
}

/** Aggregate attempts/correct from questionResults (optionally filter by predicate). */
export function aggregateQuestionResults(
  questionResults: Record<string, QuestionResult>,
  include?: (questionId: string, r: QuestionResult) => boolean,
): { correct: number; attempts: number } {
  let correct = 0;
  let attempts = 0;
  for (const [id, r] of Object.entries(questionResults ?? {})) {
    if (include && !include(id, r)) continue;
    const a = r.attempts ?? 1;
    const c = r.correctCount ?? (r.correct ? 1 : 0);
    attempts += a;
    correct += c;
  }
  return { correct, attempts };
}

export interface EfficacyLoaderOptions {
  /** Restrict events to these item IDs (active workspace scope). Undefined = all. */
  itemIds?: ReadonlySet<string>;
}

/**
 * Scope the raw event log to the active workspace before computing analytics.
 * Unknown/historical item IDs are excluded rather than attributed to the
 * active subject; pass undefined itemIds to opt out of scoping.
 */
async function loadScopedEvents(options?: EfficacyLoaderOptions): Promise<ReviewEvent[]> {
  const events = await getDefaultReviewLog().getAll();
  if (!options?.itemIds) return events;
  return events.filter((event) => options.itemIds!.has(event.itemId));
}

export async function loadCalibrationBins(options?: EfficacyLoaderOptions): Promise<CalibrationBin[]> {
  try {
    const events = await loadScopedEvents(options);
    return computeCalibration(events);
  } catch {
    return [];
  }
}

export async function loadEfficacySnapshot(minDelayDays = 7, options?: EfficacyLoaderOptions): Promise<EfficacySnapshot> {
  try {
    const events = await loadScopedEvents(options);
    return computeEfficacySnapshot(events, minDelayDays);
  } catch {
    return computeEfficacySnapshot([], minDelayDays);
  }
}
