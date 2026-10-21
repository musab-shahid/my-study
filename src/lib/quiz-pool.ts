/**
 * Canonical quiz pool selection — always constrained to a coherent session scope.
 * Fail-closed on contradictory parameters or missing workspace.
 */
import { allQuestions, questionsByTopic } from '../data/questions.ts';
import { sectionMap } from '../data/sections.ts';
import { getTopic } from '../data/topics.ts';
import {
  contentEligibleForScope,
  type ScopeInput,
} from './track-scope.ts';
import { isTrackId } from '../data/tracks.ts';
import { validateQuizRequest } from './quiz-session.ts';
import type { DifficultyFilter, PracticeMode, Question, TopicProgress } from '../types.ts';

export type QuizPoolParams = {
  mode: PracticeMode;
  topicId?: string;
  topicIds?: string[];
  scope?: 'subject' | 'all';
  subjectId?: string;
  count?: number | 'all';
  difficulty?: DifficultyFilter;
  wrongPool?: boolean;
  questionResults?: Record<string, { correct: boolean; timestamp: number }>;
  track: string | null | undefined;
  allowedSubjectIds: Set<string>;
  /** Required — missing scopeInput fails closed (no subject-only bypass) */
  scopeInput: ScopeInput | null;
  topicProgress?: Record<string, TopicProgress>;
};

function questionSubjectId(q: Question): string | undefined {
  return sectionMap[q.sectionId]?.subjectId;
}

function questionInWorkspace(
  q: Question,
  allowed: Set<string>,
  scopeInput: ScopeInput,
): boolean {
  const sid = questionSubjectId(q);
  if (!sid || !allowed.has(sid)) return false;
  return contentEligibleForScope(q, scopeInput);
}

function topicInWorkspace(
  topicId: string,
  allowed: Set<string>,
  scopeInput: ScopeInput,
): boolean {
  const topic = getTopic(topicId);
  if (!topic) return false;
  const sid = sectionMap[topic.sectionId]?.subjectId;
  if (!sid || !allowed.has(sid)) return false;
  return contentEligibleForScope(topic, scopeInput);
}

/**
 * Build the eligible question pool for a quiz session.
 * Applies workspace + request coherence before wrong/difficulty filters.
 */
export function selectQuizPool(p: QuizPoolParams): Question[] {
  // Workspace integrity
  if (!p.track || !isTrackId(p.track)) return [];
  if (!p.scopeInput) return [];
  if (p.scopeInput.trackId !== p.track) return [];
  if (p.allowedSubjectIds.size === 0) return [];

  const req = validateQuizRequest({
    mode: p.mode,
    topicId: p.topicId,
    topicIds: p.topicIds,
    scope: p.scope,
    subjectId: p.subjectId,
    count: p.count,
    difficulty: p.difficulty,
    wrongPool: p.wrongPool,
  });
  if (!req.ok) return [];
  const r = req.request;

  const fullPool = allQuestions();
  let pool: Question[];

  if (r.mode === 'topic' && r.topicId) {
    if (!topicInWorkspace(r.topicId, p.allowedSubjectIds, p.scopeInput)) return [];
    if (r.subjectId && r.subjectId !== '') {
      const sid = sectionMap[getTopic(r.topicId)!.sectionId]?.subjectId;
      if (sid !== r.subjectId) return [];
    }
    pool = questionsByTopic(r.topicId);
  } else if (r.topicIds && r.topicIds.length > 0) {
    for (const tid of r.topicIds) {
      if (!topicInWorkspace(tid, p.allowedSubjectIds, p.scopeInput)) return [];
      if (r.subjectId && r.subjectId !== '') {
        const sid = sectionMap[getTopic(tid)?.sectionId ?? '']?.subjectId;
        if (sid !== r.subjectId) return [];
      }
    }
    const idSet = new Set(r.topicIds);
    pool = fullPool.filter((q) => idSet.has(q.topicId));
  } else if (r.scope === 'subject') {
    // Already validated non-empty subjectId
    if (!r.subjectId || !p.allowedSubjectIds.has(r.subjectId)) return [];
    pool = fullPool.filter((q) => questionSubjectId(q) === r.subjectId);
  } else {
    // General / track-wide within workspace
    pool = fullPool.filter((q) => {
      const sid = questionSubjectId(q);
      return sid != null && p.allowedSubjectIds.has(sid);
    });
  }

  pool = pool.filter((q) => questionInWorkspace(q, p.allowedSubjectIds, p.scopeInput!));

  if (r.wrongPool && p.questionResults) {
    const wrongIds = new Set(
      Object.entries(p.questionResults)
        .filter(([, res]) => !res.correct)
        .map(([qid]) => qid),
    );
    pool = pool.filter((q) => wrongIds.has(q.id));
  }

  if (r.difficulty && r.difficulty !== 'any') {
    pool = pool.filter((q) => q.difficulty === r.difficulty);
  }

  return pool;
}

/** Filter restored questions; returns null if any saved ID is missing or out of scope. */
export function filterRestoredQuestions(
  questions: Question[],
  savedIds: string[],
  allowedSubjectIds: Set<string>,
  scopeInput: ScopeInput | null,
): Question[] | null {
  if (!scopeInput || savedIds.length === 0) return null;
  const byId = new Map(questions.map((q) => [q.id, q]));
  const out: Question[] = [];
  for (const id of savedIds) {
    const q = byId.get(id);
    if (!q) return null;
    if (!questionInWorkspace(q, allowedSubjectIds, scopeInput)) return null;
    out.push(q);
  }
  return out;
}

export function targetPoolCount(
  mode: PracticeMode,
  count: number | 'all' | undefined,
  poolLength: number,
): number {
  if (count === 'all' || (typeof count === 'number' && count >= 999)) return poolLength;
  if (count !== undefined) return Math.min(count, poolLength);
  if (mode === 'mock') return Math.min(60, poolLength);
  if (mode === 'review' || mode === 'challenge') return poolLength;
  return Math.min(10, poolLength);
}
