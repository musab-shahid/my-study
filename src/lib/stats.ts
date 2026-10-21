import { sectionMap } from '../data/sections';
import type { AppData, Topic, Question } from '../types.ts';
import { getEffectiveQuizStats, parseLocalDate } from './constants';
export function getOverallStats(data: AppData, scopedTopics: Topic[], scopedQuestions: Question[]) {
  const topicIds = new Set(scopedTopics.map((t) => t.id));
  const questionIds = new Set(scopedQuestions.map((q) => q.id));
  const studiedCount = data.studiedTopics.filter((id) => topicIds.has(id)).length;
  const totalTopics = scopedTopics.length;
  // Prefer quizHistory volume (every attempt) over latest-only questionResults
  const scopedHistory = (data.quizHistory ?? []).filter((h) => {
    if (h.topicId && topicIds.has(h.topicId)) return true;
    if (h.subjectId && scopedTopics.some((t) => sectionMap[t.sectionId]?.subjectId === h.subjectId)) return true;
    // Topic-less history: include if any answered id is in scope (legacy)
    return false;
  });
  let questionsAnswered = 0;
  let correctCount = 0;
  if (scopedHistory.length > 0) {
    for (const h of scopedHistory) {
      questionsAnswered += h.total;
      correctCount += h.score;
    }
  } else {
    const questionResults = Object.entries(data.questionResults)
      .filter(([id]) => questionIds.has(id))
      .map(([, r]) => r);
    questionsAnswered = questionResults.length;
    correctCount = questionResults.filter((r) => r.correct).length;
  }
  // null = no measured accuracy (not the same as a genuine 0%)
  const accuracy: number | null = questionsAnswered > 0 ? Math.round((correctCount / questionsAnswered) * 100) : null;
  const quizProgress = Object.entries(data.topicProgress)
    .filter(([id, p]) => topicIds.has(id) && getEffectiveQuizStats(p).total > 0)
    .map(([, p]) => p);
  // Weight mastery by attempt volume so a 1-question 100% does not equal a 50-attempt topic
  let mastery = 0;
  if (quizProgress.length > 0) {
    let weightSum = 0;
    let weightedAcc = 0;
    for (const p of quizProgress) {
      const eff = getEffectiveQuizStats(p);
      const w = Math.max(eff.total, 1);
      weightedAcc += eff.accuracy * w;
      weightSum += w;
    }
    mastery = weightSum > 0 ? Math.round(weightedAcc / weightSum) : 0;
  }
  const quizTouchedCount = Object.entries(data.topicProgress)
    .filter(([id, p]) => topicIds.has(id) && getEffectiveQuizStats(p).total > 0).length;
  return {
    studiedCount,
    totalTopics,
    questionsAnswered,
    accuracy,
    mastery,
    quizTouchedCount,
  };
}
export function getSectionAccuracy(data: AppData, sectionId: string, scopedQuestions: Question[]): number | null {
  const sectionQuestions = scopedQuestions.filter((q) => q.sectionId === sectionId);
  if (sectionQuestions.length === 0) return null;
  const sectionTopicIds = new Set(sectionQuestions.map((q) => q.topicId).filter(Boolean));
  // Prefer quizHistory volume (same source as getOverallStats) when topic-scoped history exists
  const history = (data.quizHistory ?? []).filter(
    (h) => h.topicId && sectionTopicIds.has(h.topicId),
  );
  if (history.length > 0) {
    const total = history.reduce((s, h) => s + h.total, 0);
    const correct = history.reduce((s, h) => s + h.score, 0);
    return total > 0 ? Math.round((correct / total) * 100) : null;
  }
  // Fallback: latest-only questionResults
  const results = sectionQuestions
    .map((q) => data.questionResults[q.id])
    .filter(Boolean);
  if (results.length === 0) return null;
  const correct = results.filter((r) => r.correct).length;
  return Math.round((correct / results.length) * 100);
}
export function getWeakestTopics(data: AppData, scopedTopicIds: Set<string>, count = 3): { topicId: string; accuracy: number }[] {
  return Object.entries(data.topicProgress)
    .filter(([topicId, p]) => scopedTopicIds.has(topicId) && getEffectiveQuizStats(p).total > 0)
    .map(([topicId, p]) => ({ topicId, accuracy: getEffectiveQuizStats(p).accuracy }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, count);
}
export function getTodayRevision(data: AppData, scopedTopicIds: Set<string>): string[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Object.entries(data.topicProgress)
    .filter(([topicId, p]) => scopedTopicIds.has(topicId) && p.nextReview && parseLocalDate(p.nextReview) <= today)
    .map(([topicId]) => topicId);
}
