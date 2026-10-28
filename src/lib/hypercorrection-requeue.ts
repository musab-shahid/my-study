/**
 * High-confidence miss re-queue (hypercorrection / L-05).
 * Same-session: insert the item a few questions later (once).
 * Next-day: lightweight due list in localStorage for pool prioritization.
 */

import type { Question } from '@/types';

const NEXT_DAY_KEY = 'my-study:hc-miss-due-v1';
const DAY_MS = 86_400_000;

export interface DueMiss {
  questionId: string;
  dueAt: number;
  topicId?: string;
}

/** True when Sure + wrong and not already requeued this session. */
export function shouldRequeueHighConfidenceMiss(
  correct: boolean,
  confidence: 1 | 2 | 3 | undefined,
  alreadyRequeuedIds: readonly string[],
  questionId: string,
): boolean {
  if (correct) return false;
  if (confidence !== 3) return false;
  if (alreadyRequeuedIds.includes(questionId)) return false;
  return true;
}

/**
 * Insert a re-show of the question after `gap` remaining items (default 2).
 * Reshuffle is caller's job for optionOrders.
 */
export function planRequeueInsert(args: {
  currentIdx: number;
  questionCount: number;
  /** How many other items before the re-show (0 = next). */
  gap?: number;
}): { insertAt: number } {
  const gap = args.gap ?? 2;
  const afterCurrent = args.currentIdx + 1;
  const insertAt = Math.min(args.questionCount, afterCurrent + gap);
  return { insertAt };
}

export function insertQuestionAt<T>(list: T[], index: number, item: T): T[] {
  const next = list.slice();
  const i = Math.max(0, Math.min(index, next.length));
  next.splice(i, 0, item);
  return next;
}

/** Schedule for ~24h later (next calendar day practice). */
export function scheduleNextDayHcMiss(questionId: string, topicId?: string, now = Date.now()): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const raw = localStorage.getItem(NEXT_DAY_KEY);
    const list: DueMiss[] = raw ? (JSON.parse(raw) as DueMiss[]) : [];
    const dueAt = now + DAY_MS;
    const filtered = list.filter((d) => d.questionId !== questionId);
    filtered.push({ questionId, dueAt, topicId });
    // Cap list size
    const trimmed = filtered.slice(-200);
    localStorage.setItem(NEXT_DAY_KEY, JSON.stringify(trimmed));
  } catch {
    /* ignore quota / private mode */
  }
}

/** Due high-confidence misses (dueAt <= now). Does not remove them. */
export function listDueHcMisses(now = Date.now()): DueMiss[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(NEXT_DAY_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as DueMiss[];
    return list.filter((d) => d.dueAt <= now);
  } catch {
    return [];
  }
}

/** Remove consumed ids after they appear in a new session. */
export function clearHcMisses(questionIds: string[]): void {
  if (typeof localStorage === 'undefined' || questionIds.length === 0) return;
  try {
    const raw = localStorage.getItem(NEXT_DAY_KEY);
    if (!raw) return;
    const set = new Set(questionIds);
    const list = (JSON.parse(raw) as DueMiss[]).filter((d) => !set.has(d.questionId));
    localStorage.setItem(NEXT_DAY_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

/** Stable copy of a question for re-show (same id — answers still keyed by id). */
export function cloneQuestionForRequeue(q: Question): Question {
  return { ...q, options: q.options ? [...q.options] : q.options };
}
