/**
 * Progress insights: coverage vs competence, calibration from review log.
 */

import type { QuestionResult } from '@/types';
import {
  computeBayesianMastery,
  compositeReadiness,
  type MasteryPosterior,
} from './mastery-bayesian.ts';
import { computeCalibration, type CalibrationBin } from './calibration.ts';
import { getDefaultReviewLog } from './review-log.ts';

export interface CoverageCompetence {
  coverageShare: number;
  coveragePct: number;
  competence: MasteryPosterior;
  /** Explicit composite that does NOT treat “studied” as half of mastery. */
  readinessScore: number;
}

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

export async function loadCalibrationBins(): Promise<CalibrationBin[]> {
  try {
    const events = await getDefaultReviewLog().getAll();
    return computeCalibration(events);
  } catch {
    return [];
  }
}
