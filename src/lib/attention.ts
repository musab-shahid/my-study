/**
 * Shared attention / recommendation / mastery helpers.
 *
 * Aligned with storage.ts TopicProgress shape and streak.getWeakTopics.
 * Pure functions only — no React, no side effects.
 */

import type { AppData } from '@/types';
import { getWeakTopics as streakGetWeakTopics } from '@/lib/streak';
import {
  MASTERY_MIN_QUIZ_ATTEMPTS,
  getEffectiveQuizStats,
  WEAK_TOPIC_LIMIT,
  WEAK_TOPIC_MIN_ATTEMPTS,
  deriveStatus,
  computeMasteryScore,
  parseLocalDate,
} from '@/lib/constants';

// ── Types ──

export type DueReviewItem = {
  topicId: string;
  dateStr: string;
  accuracy: number;
  group: 'high' | 'review' | 'refresh';
};

export type WeakTopicItem = {
  topicId: string;
  accuracy: number;
  attempts?: number;
};

export type UnfinishedTopicItem = {
  topicId: string;
  reason: 'last_opened' | 'in_progress' | 'not_started';
};

export type AttentionItems = {
  dueReviews: DueReviewItem[];
  dueReviewCount: number;
  weakTopics: WeakTopicItem[];
  unfinished: UnfinishedTopicItem | null;
  daysSinceLastActivity: number | null;
};

export type RecommendationKind =
  | 'review'
  | 'continue'
  | 'weak'
  | 'quick'
  | 'mock';

export type DashboardRecommendation = {
  kind: RecommendationKind;
  headline: string;
  subtext: string;
  action: string;
  payload: {
    screen: 'review' | 'topic' | 'practice';
    topicId?: string;
    mode?: 'quick' | 'mock';
  };
};

// ── Mastery (one rule for the whole app) ──

/**
 * Single mastery rule (see deriveStatus in constants):
 * mastered = effective quiz total ≥ MASTERY_MIN_QUIZ_ATTEMPTS AND accuracy ≥ threshold
 * Effective stats prefer recentSessions window over lifetime totals.
 */
export function isTopicMastered(topicId: string, data: AppData): boolean {
  const progress = data.topicProgress[topicId];
  if (!progress) return false;
  const studied = data.studiedTopics.includes(topicId);
  const { total, accuracy } = getEffectiveQuizStats(progress);
  return deriveStatus(studied, total, accuracy) === 'mastered';
}

export function getMasteryScore(
  studiedTopics: number,
  totalTopics: number,
  accuracy: number,
): number {
  return computeMasteryScore(studiedTopics, totalTopics, accuracy);
}

export function countMasteredTopics(
  data: AppData,
  scopedTopicIds?: Set<string> | null,
): number {
  return Object.keys(data.topicProgress).filter((tid) => {
    if (scopedTopicIds && !scopedTopicIds.has(tid)) return false;
    return isTopicMastered(tid, data);
  }).length;
}

// ── Due reviews (authoritative: topicProgress.nextReview only) ──

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getDueReviews(
  data: AppData,
  scopedTopicIds: Set<string>,
): DueReviewItem[] {
  const today = startOfToday();
  const due: DueReviewItem[] = [];

  for (const [topicId, prog] of Object.entries(data.topicProgress ?? {})) {
    if (!scopedTopicIds.has(topicId)) continue;
    if (!prog.nextReview || parseLocalDate(prog.nextReview) > today) continue;
    const accuracy = getEffectiveQuizStats(prog).accuracy;
    let group: DueReviewItem['group'];
    if (accuracy < 60) group = 'high';
    else if (accuracy < 75) group = 'review';
    else group = 'refresh';
    due.push({ topicId, dateStr: prog.nextReview, accuracy, group });
  }
  return due;
}

// ── Weak topics (delegates to streak.getWeakTopics for one implementation) ──

export function getWeakTopicsFromData(
  data: AppData,
  scopedTopicIds: Set<string>,
  options: { minAttempts?: number; limit?: number } = {},
): WeakTopicItem[] {
  // Align with streak.getWeakTopics defaults via shared constants
  const minAttempts = options.minAttempts ?? WEAK_TOPIC_MIN_ATTEMPTS;
  const limit = options.limit ?? WEAK_TOPIC_LIMIT;
  return streakGetWeakTopics(data, scopedTopicIds, minAttempts, limit).map((w) => ({
    topicId: w.topicId,
    accuracy: w.accuracy,
    attempts: w.attempts,
  }));
}

// ── Unfinished / continue topic ──

export function getUnfinishedTopic(
  data: AppData,
  scopedTopicIds: Set<string>,
  getTopicExists?: (id: string) => boolean,
): UnfinishedTopicItem | null {
  const exists = getTopicExists ?? (() => true);

  if (data.lastOpenedTopic && scopedTopicIds.has(data.lastOpenedTopic) && exists(data.lastOpenedTopic)) {
    if (!isTopicMastered(data.lastOpenedTopic, data) && !data.studiedTopics.includes(data.lastOpenedTopic)) {
      return { topicId: data.lastOpenedTopic, reason: 'last_opened' };
    }
  }

  let bestInProgress: { topicId: string; ts: number } | null = null;
  for (const topicId of scopedTopicIds) {
    if (!exists(topicId)) continue;
    if (isTopicMastered(topicId, data)) continue;
    if (!data.studiedTopics.includes(topicId)) continue;
    const progress = data.topicProgress[topicId];
    const ts = progress?.lastStudied ? new Date(progress.lastStudied).getTime() : 0;
    if (!bestInProgress || ts > bestInProgress.ts) {
      bestInProgress = { topicId, ts };
    }
  }
  if (bestInProgress) {
    return { topicId: bestInProgress.topicId, reason: 'in_progress' };
  }

  for (const topicId of scopedTopicIds) {
    if (!exists(topicId)) continue;
    if (!data.studiedTopics.includes(topicId)) {
      return { topicId, reason: 'not_started' };
    }
  }
  return null;
}

// ── Days since last activity ──

export function getDaysSinceLastActivity(data: AppData): number | null {
  const history = data.quizHistory;
  if (!history || history.length === 0) return null;

  let latest = 0;
  for (const q of history) {
    const ts = typeof q.date === 'number' ? q.date : new Date(q.date).getTime();
    if (ts > latest) latest = ts;
  }
  if (latest === 0) return null;

  const today = startOfToday().getTime();
  const lastDay = new Date(latest);
  lastDay.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((today - lastDay.getTime()) / (1000 * 60 * 60 * 24)));
}

// ── Aggregate attention items ──

export function getAttentionItems(
  data: AppData,
  scopedTopicIds: Set<string>,
  options?: {
    weakLimit?: number;
    weakMinAttempts?: number;
    getTopicExists?: (id: string) => boolean;
  },
): AttentionItems {
  const dueReviews = getDueReviews(data, scopedTopicIds);
  const weakTopics = getWeakTopicsFromData(data, scopedTopicIds, {
    limit: options?.weakLimit ?? WEAK_TOPIC_LIMIT,
    minAttempts: options?.weakMinAttempts ?? WEAK_TOPIC_MIN_ATTEMPTS,
  });
  const unfinished = getUnfinishedTopic(data, scopedTopicIds, options?.getTopicExists);
  const daysSinceLastActivity = getDaysSinceLastActivity(data);

  return {
    dueReviews,
    dueReviewCount: dueReviews.length,
    weakTopics,
    unfinished,
    daysSinceLastActivity,
  };
}

// ── Dashboard recommendation (fixed priority — only place this lives) ──

/**
 * Priority:
 *  1. Review due ≥ 3 topics
 *  2. Continue unfinished topic
 *  3. Weak topics ≥ 3
 *  4. No activity in last 24 h → Quick Practice
 *  5. Otherwise → Mock
 */

/**
 * Topic ids for a short daily session: due reviews first, then weak topics.
 * Caps at maxTopics; used by Dashboard "3-minute review".
 */
export function buildDailyReviewTopicIds(
  data: AppData,
  scopedTopicIds: Set<string>,
  maxTopics = 6,
): string[] {
  const due = getDueReviews(data, scopedTopicIds).map((d) => d.topicId);
  const weak = getWeakTopicsFromData(data, scopedTopicIds).map((w) => w.topicId);
  const out: string[] = [];
  const seen = new Set<string>();
  for (const id of [...due, ...weak]) {
    if (!scopedTopicIds.has(id) || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
    if (out.length >= maxTopics) break;
  }
  return out;
}

/** First unmastered prerequisite on a topic graph, if any. */
export function firstUnmasteredPrereq(
  topicId: string,
  data: AppData,
  getBuildsOn: (id: string) => string[] | undefined,
): string | null {
  const prereqs = getBuildsOn(topicId) ?? [];
  for (const pid of prereqs) {
    if (!isTopicMastered(pid, data)) return pid;
  }
  return null;
}

export function getDashboardRecommendation(
  attention: AttentionItems,
  options?: {
    getTopicTitle?: (topicId: string) => string | undefined;
    getTopicSectionLabel?: (topicId: string) => string | undefined;
    isTopicStudied?: (topicId: string) => boolean;
    getUnmasteredPrereq?: (topicId: string) => string | null;
  },
): DashboardRecommendation {
  const { dueReviewCount, weakTopics, unfinished, daysSinceLastActivity } = attention;

  if (dueReviewCount >= 3) {
    return {
      kind: 'review',
      headline: `${dueReviewCount} topics due for review`,
      subtext: 'Spaced repetition works best when you review before forgetting. Clear your queue now.',
      action: 'Go to Review',
      payload: { screen: 'review' },
    };
  }

  if (unfinished) {
    const title = options?.getTopicTitle?.(unfinished.topicId) ?? 'your last topic';
    const sectionLabel = options?.getTopicSectionLabel?.(unfinished.topicId);
    const studied = options?.isTopicStudied?.(unfinished.topicId) ?? false;
    const reasonLabel =
      unfinished.reason === 'last_opened'
        ? 'Pick up where you left off'
        : unfinished.reason === 'in_progress'
          ? 'In progress — keep going'
          : 'Not started yet';
    const statusBit = studied ? 'Studied' : 'Unread';
    return {
      kind: 'continue',
      headline: `Continue: ${title}`,
      subtext: `${reasonLabel}${sectionLabel ? ` · ${sectionLabel}` : ''} · ${statusBit}`,
      action: studied ? 'Continue Topic' : 'Start Topic',
      payload: { screen: 'topic', topicId: unfinished.topicId },
    };
  }

  if (weakTopics.length >= 3) {
    // Prefer an unmastered prerequisite of the weakest topic when the graph says so
    const weakest = weakTopics[0]?.topicId;
    const prereqId = weakest && options?.getUnmasteredPrereq
      ? options.getUnmasteredPrereq(weakest)
      : null;
    if (prereqId) {
      const prereqTitle = options?.getTopicTitle?.(prereqId) ?? 'a foundation topic';
      const weakTitle = options?.getTopicTitle?.(weakest) ?? 'this topic';
      return {
        kind: 'continue',
        headline: `Study prerequisite: ${prereqTitle}`,
        subtext: `Needed before "${weakTitle}" can stick. Build the foundation first.`,
        action: 'Open Prerequisite',
        payload: { screen: 'topic', topicId: prereqId },
      };
    }
    return {
      kind: 'weak',
      headline: `Address ${weakTopics.length} weak areas`,
      subtext: 'These topics have the lowest accuracy. Focus practice to close the gaps.',
      action: 'Practice Weak Topics',
      payload: { screen: 'practice' },
    };
  }

  const inactive = daysSinceLastActivity === null || daysSinceLastActivity >= 1;
  if (inactive) {
    return {
      kind: 'quick',
      headline: 'Ready for a quick practice?',
      subtext: 'No activity in the last 24 hours. A 5-minute quiz keeps your knowledge sharp.',
      action: 'Start Quick Practice',
      payload: { screen: 'practice', mode: 'quick' },
    };
  }

  return {
    kind: 'mock',
    headline: 'All caught up! Try a mock exam?',
    subtext: 'You are on track. Simulate the real thing with a full mock exam.',
    action: 'Start Mock Exam',
    payload: { screen: 'practice', mode: 'mock' },
  };
}
