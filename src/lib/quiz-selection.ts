/** Quiz pool selection and option shuffle helpers (extracted from QuizScreen). */
import { getTopic } from '@/data/topics';
import { subjectMap } from '@/data/subjects';
import { selectQuizPool, targetPoolCount } from '@/lib/quiz-pool';
import { pickAdaptiveQuestions, recentQuestionIdsFromResults } from '@/lib/adaptive-select';
import { applyOptionOrder } from '@/lib/quiz-option-order';
import { validateQuizRequest } from '@/lib/quiz-session';
import { listDueHcMisses, clearHcMisses } from '@/lib/hypercorrection-requeue';
import type { Question, DifficultyFilter, PracticeMode, TopicProgress } from '@/types';

const VALID_MODES: PracticeMode[] = ['topic', 'quick', 'mock', 'review', 'challenge'];
const VALID_SUBJECT_IDS = Object.keys(subjectMap);

export function validateQuizParams(params: {
  mode?: PracticeMode;
  count?: number | 'all';
  topicId?: string;
  topicIds?: string[];
  scope?: 'subject' | 'all';
  subjectId?: string;
}): string | null {
  if (!params.mode || !VALID_MODES.includes(params.mode)) {
    return `Invalid quiz mode: "${params.mode ?? 'undefined'}". Expected one of: ${VALID_MODES.join(', ')}.`;
  }
  if (params.count !== undefined && params.count !== 'all') {
    if (typeof params.count !== 'number' || !Number.isInteger(params.count) || params.count < 1 || params.count > 500) {
      return `Invalid question count: "${params.count}". Expected a positive integer, or "all".`;
    }
  }
  if (params.topicId !== undefined && params.topicId !== '' && !getTopic(params.topicId)) {
    return `Invalid topic ID: "${params.topicId}" does not exist.`;
  }
  if (params.subjectId !== undefined && params.subjectId !== '' && !VALID_SUBJECT_IDS.includes(params.subjectId)) {
    return `Invalid subject ID: "${params.subjectId}" does not exist.`;
  }
  const coherence = validateQuizRequest({
    mode: params.mode,
    topicId: params.topicId,
    topicIds: params.topicIds,
    scope: params.scope,
    subjectId: params.subjectId,
  });
  if (!coherence.ok) return coherence.reason;
  return null;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function shuffleQuestionOptions(q: Question): { question: Question; order: number[] } {
  if (!q.options || q.options.length < 2) {
    return { question: q, order: (q.options ?? []).map((_, i) => i) };
  }
  const order = shuffleArray(q.options.map((_, i) => i));
  return { question: applyOptionOrder(q, order), order };
}

export function pickQuestions(
  mode: PracticeMode,
  topicId: string | undefined,
  topicIds: string[] | undefined,
  scope: 'subject' | 'all' | undefined,
  subjectId: string | undefined,
  count: number | 'all' | undefined,
  difficulty: DifficultyFilter | undefined,
  wrongPool: boolean | undefined,
  questionResults: Record<string, { correct: boolean; timestamp: number }> | undefined,
  track: import('@/data/tracks').TrackId | null | undefined,
  topicProgress: Record<string, TopicProgress> | undefined,
  allowedSubjectIds: Set<string>,
  scopeInput: import('@/lib/track-scope').ScopeInput | null,
): Question[] {
  const pool = selectQuizPool({
    mode,
    topicId,
    topicIds,
    scope,
    subjectId,
    count,
    difficulty,
    wrongPool,
    questionResults,
    track,
    allowedSubjectIds,
    scopeInput,
    topicProgress,
  });
  if (pool.length === 0) return [];

  const targetCount = targetPoolCount(mode, count, pool.length);
  const duePriorityIds = listDueHcMisses()
    .map((d) => d.questionId)
    .filter((id) => pool.some((q) => q.id === id));

  if (mode === 'mock') {
    if (pool.length <= targetCount) return shuffleArray(pool);
    const easyPool = pool.filter((q) => q.difficulty === 'easy');
    const mediumPool = pool.filter((q) => q.difficulty === 'medium');
    const hardPool = pool.filter((q) => q.difficulty === 'hard');
    const targetEasy = Math.round(targetCount * 0.2);
    const targetMedium = Math.round(targetCount * 0.5);
    const targetHard = targetCount - targetEasy - targetMedium;
    const picked = [
      ...shuffleArray(easyPool).slice(0, Math.min(targetEasy, easyPool.length)),
      ...shuffleArray(mediumPool).slice(0, Math.min(targetMedium, mediumPool.length)),
      ...shuffleArray(hardPool).slice(0, Math.min(targetHard, hardPool.length)),
    ];
    if (picked.length < targetCount) {
      const pickedIds = new Set(picked.map((q) => q.id));
      const leftover = pool.filter((q) => !pickedIds.has(q.id));
      const need = targetCount - picked.length;
      picked.push(...shuffleArray(leftover).slice(0, need));
    }
    return shuffleArray(picked);
  }
  const picked = pickAdaptiveQuestions(pool, Math.min(targetCount, pool.length), {
    mode,
    questionResults,
    topicProgress,
    recentQuestionIds: recentQuestionIdsFromResults(questionResults),
    priorityQuestionIds: duePriorityIds,
  });
  // Consume only those actually selected into the session
  const selectedDue = duePriorityIds.filter((id) => picked.some((q) => q.id === id));
  if (selectedDue.length > 0) clearHcMisses(selectedDue);
  return picked;
}

