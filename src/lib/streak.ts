import { getEffectiveQuizStats, WEAK_TOPIC_MIN_ATTEMPTS } from '@/lib/constants';
import type { AppData, TopicProgress } from '@/types';

export function computeStreak(data: AppData, today = new Date()): number {
  const days = data.streakDays ?? [];
  if (days.length === 0) return 0;
  const sorted = [...days].sort();
  const toKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  let cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let streak = 0;
  const set = new Set(sorted);
  // Allow missing today if yesterday is present (day not finished).
  if (!set.has(toKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (set.has(toKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function getWeakTopics(
  progress: Record<string, TopicProgress>,
  limit = 5,
): Array<{ topicId: string; accuracy: number; attempts: number }> {
  const rows: Array<{ topicId: string; accuracy: number; attempts: number }> = [];
  for (const [topicId, tp] of Object.entries(progress)) {
    const { attempts, accuracy } = getEffectiveQuizStats(tp);
    if (attempts < WEAK_TOPIC_MIN_ATTEMPTS) continue;
    rows.push({ topicId, accuracy, attempts });
  }
  rows.sort((a, b) => a.accuracy - b.accuracy || b.attempts - a.attempts);
  return rows.slice(0, limit);
}
