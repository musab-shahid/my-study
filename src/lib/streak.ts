import type { AppData } from '@/types';
import { deriveAccuracy, getEffectiveQuizStats, WEAK_TOPIC_MIN_ATTEMPTS } from '@/lib/constants';
export interface StreakInfo {
  streak: number;
  atRisk: boolean;
  studiedToday: boolean;
}
function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function dateKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
export function computeStreak(
  data: AppData,
  scopedTopicIds?: Set<string>,
  scopedSubjectIds?: Set<string>,
): StreakInfo {
  const studyDays = new Set<string>();
  // Reading a topic counts
  for (const [topicId, prog] of Object.entries(data.topicProgress)) {
    if (scopedTopicIds && !scopedTopicIds.has(topicId)) continue;
    if (prog.lastStudied) {
      const d = new Date(prog.lastStudied);
      d.setHours(0, 0, 0, 0);
      studyDays.add(dateKey(d));
    }
  }
  // Quiz activity also counts (optional subject scope for active workspace)
  for (const q of data.quizHistory ?? []) {
    if (scopedSubjectIds && (!q.subjectId || !scopedSubjectIds.has(q.subjectId))) continue;
    const d = new Date(q.date);
    d.setHours(0, 0, 0, 0);
    studyDays.add(dateKey(d));
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = dateKey(today);
  const studiedToday = studyDays.has(todayKey);
  let streak = 0;
  const cursor = new Date(today);
  if (!studiedToday) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (studyDays.has(dateKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  const atRisk = streak > 0 && !studiedToday;
  return { streak, atRisk, studiedToday };
}
export function getTodayActivity(data: AppData, scopedSubjectIds?: Set<string>, scopedTopicIds?: Set<string>) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayQuizzes = (data.quizHistory ?? []).filter((q) => {
    if (scopedSubjectIds && (!q.subjectId || !scopedSubjectIds.has(q.subjectId))) return false;
    const d = new Date(q.date);
    d.setHours(0, 0, 0, 0);
    return isSameDay(d, today);
  });
  const todayTopicsRead = Object.entries(data.topicProgress).filter(([topicId, p]) => {
    if (scopedTopicIds && !scopedTopicIds.has(topicId)) return false;
    if (!p.lastStudied) return false;
    const d = new Date(p.lastStudied);
    d.setHours(0, 0, 0, 0);
    return isSameDay(d, today);
  }).length;
  return {
    quizCount: todayQuizzes.length,
    topicsRead: todayTopicsRead,
    questionsAnswered: todayQuizzes.reduce((s, q) => s + q.total, 0),
    correct: todayQuizzes.reduce((s, q) => s + q.score, 0),
  };
}
export function getWeekActivity(data: AppData, scopedSubjectIds?: Set<string>) {
  // Calendar-week window (aligned with getWeeklyAccuracy): from 7 days ago at local midnight through now
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 6);
  weekStart.setHours(0, 0, 0, 0);
  const weekQuizzes = (data.quizHistory ?? []).filter((q) => {
    if (scopedSubjectIds && (!q.subjectId || !scopedSubjectIds.has(q.subjectId))) return false;
    return new Date(q.date) >= weekStart;
  });
  const totalQuestions = weekQuizzes.reduce((s, q) => s + q.total, 0);
  const totalCorrect = weekQuizzes.reduce((s, q) => s + q.score, 0);
  const avgAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  return {
    quizCount: weekQuizzes.length,
    questionsAnswered: totalQuestions,
    avgAccuracy,
  };
}
export function getWeakTopics(
  data: AppData,
  scopedTopicIds: Set<string>,
  minQuestions = WEAK_TOPIC_MIN_ATTEMPTS,
  count = 5,
): { topicId: string; accuracy: number; attempts: number }[] {
  return Object.entries(data.topicProgress)
    .filter(([topicId, p]) => {
      if (!scopedTopicIds.has(topicId)) return false;
      return getEffectiveQuizStats(p).total >= minQuestions;
    })
    .map(([topicId, p]) => {
      const eff = getEffectiveQuizStats(p);
      return { topicId, accuracy: eff.accuracy, attempts: eff.total };
    })
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, count);
}
export interface WeeklyAccuracyPoint {
  label: string;
  subLabel: string;
  accuracy: number | null;
  questions: number;
  correct: number;
  quizzes: number;
}
export function getWeeklyAccuracy(data: AppData, weeks = 8, scopedSubjectIds?: Set<string>): WeeklyAccuracyPoint[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const result: WeeklyAccuracyPoint[] = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for (let w = weeks - 1; w >= 0; w--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - w * 7 - 6);
    weekStart.setHours(0, 0, 0, 0);
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() - w * 7);
    // Inclusive end-of-day so quizzes taken today count in "This week"
    weekEnd.setHours(23, 59, 59, 999);
    const weekQuizzes = (data.quizHistory ?? []).filter((q) => {
      if (scopedSubjectIds && (!q.subjectId || !scopedSubjectIds.has(q.subjectId))) return false;
      const d = new Date(q.date);
      return d >= weekStart && d <= weekEnd;
    });
    const totalQ = weekQuizzes.reduce((s, q) => s + q.total, 0);
    const correctQ = weekQuizzes.reduce((s, q) => s + q.score, 0);
    const isThisWeek = w === 0;
    const label = isThisWeek ? 'This wk' : `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()}`;
    const subLabel = isThisWeek ? '' : `${monthNames[weekEnd.getMonth()]} ${weekEnd.getDate()}`;
    result.push({
      label,
      subLabel,
      accuracy: totalQ > 0 ? Math.round((correctQ / totalQ) * 100) : null,
      questions: totalQ,
      correct: correctQ,
      quizzes: weekQuizzes.length,
    });
  }
  return result;
}
