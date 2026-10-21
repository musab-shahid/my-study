import type { AppData } from '../types.ts';
import { getEffectiveQuizStats, computeMasteryScore } from './constants';

export interface ReadinessResult {
  score: number;
  coveragePct: number;
  masteryPct: number;
  accuracyPct: number;
}

export function computeReadiness(
  data: AppData,
  totalTopics: number,
  scopedTopicIds: Set<string>,
): ReadinessResult {
  const studiedInScope = data.studiedTopics.filter((id) => scopedTopicIds.has(id)).length;
  const coveragePct = totalTopics > 0 ? Math.round((studiedInScope / totalTopics) * 100) : 0;

  let totalAttempts = 0;
  let totalCorrect = 0;
  let masteredCount = 0;
  for (const [topicId, p] of Object.entries(data.topicProgress)) {
    if (!scopedTopicIds.has(topicId)) continue;
    const eff = getEffectiveQuizStats(p);
    totalAttempts += eff.total;
    totalCorrect += eff.correct;
    if (eff.total >= 3 && eff.accuracy >= 80) masteredCount++;
  }

  const accuracyPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const masteryPct = scopedTopicIds.size > 0 ? Math.round((masteredCount / scopedTopicIds.size) * 100) : 0;
  const score = computeMasteryScore(studiedInScope, totalTopics, accuracyPct);

  return { score, coveragePct, masteryPct, accuracyPct };
}

export function readinessLabel(score: number): string {
  if (score >= 80) return 'Well prepared';
  if (score >= 60) return 'On track';
  if (score >= 40) return 'Building up';
  if (score >= 20) return 'Getting started';
  return 'Just beginning';
}


/** Human-readable drivers for why the readiness estimate is high or low. */
export function readinessDrivers(result: ReadinessResult, dueCount = 0): string[] {
  const drivers: string[] = [];
  if (result.coveragePct < 40) {
    drivers.push(`Low coverage (${result.coveragePct}% of topics studied)`);
  } else if (result.coveragePct < 70) {
    drivers.push(`Coverage still building (${result.coveragePct}%)`);
  }
  if (result.masteryPct < 25) {
    drivers.push(`Few topics mastered (${result.masteryPct}%)`);
  } else if (result.masteryPct < 50) {
    drivers.push(`Mastery mid-range (${result.masteryPct}%)`);
  }
  if (result.accuracyPct > 0 && result.accuracyPct < 65) {
    drivers.push(`Quiz accuracy needs work (${result.accuracyPct}%)`);
  } else if (result.accuracyPct >= 80) {
    drivers.push(`Strong recent accuracy (${result.accuracyPct}%)`);
  }
  if (dueCount >= 5) {
    drivers.push(`${dueCount} reviews due — clearing them lifts readiness`);
  } else if (dueCount >= 1) {
    drivers.push(`${dueCount} review${dueCount === 1 ? '' : 's'} waiting`);
  }
  if (drivers.length === 0) {
    drivers.push('Balanced coverage, mastery, and accuracy');
  }
  return drivers.slice(0, 4);
}


export interface GainOpportunity {
  topicId: string;
  potentialGain: number;
}

export function rankScoreGainOpportunities(
  data: AppData,
  scopedTopicIds: Set<string>,
  count = 3,
): GainOpportunity[] {
  const candidates: GainOpportunity[] = [];
  for (const topicId of scopedTopicIds) {
    const p = data.topicProgress[topicId];
    const studied = data.studiedTopics.includes(topicId);
    const eff = p ? getEffectiveQuizStats(p) : { total: 0, accuracy: 0 };
    if (eff.total >= 3 && eff.accuracy >= 80) continue;
    const gap = (studied ? 10 : 20) + (100 - eff.accuracy);
    candidates.push({ topicId, potentialGain: gap });
  }
  return candidates.sort((a, b) => b.potentialGain - a.potentialGain).slice(0, count);
}
