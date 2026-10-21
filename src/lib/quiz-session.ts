/**
 * Pure quiz-session contracts: request integrity, draft validation, option permutations,
 * and answer integrity against restored questions.
 */
import type { DifficultyFilter, PracticeMode, Question, TimeLimitSetting } from '../types.ts';
import type { ScopeInput } from './track-scope.ts';
import { sectionMap } from '../data/sections.ts';
import { getTopic } from '../data/topics.ts';
import { contentEligibleForScope } from './track-scope.ts';
import { isTrackId } from '../data/tracks.ts';

export type QuizSessionSnapshot = {
  trackId: string;
  examId: string | null;
  allowedSubjectIds: string[];
  scopeInput: ScopeInput;
};

export type QuizRequest = {
  mode: PracticeMode;
  topicId?: string;
  topicIds?: string[];
  scope?: 'subject' | 'all';
  subjectId?: string;
  count?: number | 'all';
  difficulty?: DifficultyFilter;
  wrongPool?: boolean;
  timeLimit?: TimeLimitSetting;
};

export type QuizRequestValidation =
  | { ok: true; request: QuizRequest }
  | { ok: false; reason: string };

const VALID_MODES = new Set(['topic', 'quick', 'mock', 'review', 'challenge']);
const VALID_SCOPES = new Set(['subject', 'all']);
const VALID_DIFFICULTIES = new Set(['easy', 'medium', 'hard', 'any']);

/** Fail-closed request coherence (no workspace yet). */
export function validateQuizRequest(params: QuizRequest): QuizRequestValidation {
  if (params.scope === 'subject') {
    if (!params.subjectId || params.subjectId === '') {
      return { ok: false, reason: 'scope=subject requires a non-empty subjectId' };
    }
  }
  if (params.mode === 'topic') {
    if (!params.topicId || params.topicId === '') {
      return { ok: false, reason: 'mode=topic requires topicId' };
    }
  }
  if (params.topicIds !== undefined && params.topicIds.length === 0) {
    return { ok: false, reason: 'topicIds is empty — not general practice' };
  }
  if (params.topicIds && params.topicIds.length > 0) {
    const unique = [...new Set(params.topicIds)];
    if (unique.length !== params.topicIds.length) {
      return { ok: true, request: { ...params, topicIds: unique } };
    }
  }
  return { ok: true, request: params };
}

export function isValidOptionPermutation(order: number[], optionCount: number): boolean {
  if (!Array.isArray(order) || order.length !== optionCount) return false;
  if (optionCount === 0) return order.length === 0;
  const seen = new Set<number>();
  for (const n of order) {
    if (!Number.isInteger(n) || n < 0 || n >= optionCount) return false;
    if (seen.has(n)) return false;
    seen.add(n);
  }
  return seen.size === optionCount;
}

export type SavedAnswerRecord = {
  questionId: string;
  correct: boolean;
  selectedIndices: number[];
};

export type SavedDraftShape = {
  questionIds: string[];
  optionOrders?: number[][];
  answers: SavedAnswerRecord[];
  elapsedSeconds?: number;
  currentIdx: number;
  mode: PracticeMode;
  topicId?: string;
  topicIds?: string[];
  scope?: 'subject' | 'all';
  subjectId?: string;
  count?: number | 'all';
  difficulty?: DifficultyFilter;
  timeLimit?: TimeLimitSetting;
  wrongPool?: boolean;
  track?: string | null;
  examId?: string | null;
};

export type DraftValidation =
  | { ok: true; draft: SavedDraftShape }
  | { ok: false; reason: string };

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0;
}

/**
 * Structural draft validation (no live question bank required).
 * Rejects duplicate answer records for the same questionId.
 */
export function validateDraftShape(raw: unknown): DraftValidation {
  if (!raw || typeof raw !== 'object') return { ok: false, reason: 'not-object' };
  const p = raw as Record<string, unknown>;

  if (!Array.isArray(p.questionIds) || p.questionIds.length === 0) {
    return { ok: false, reason: 'empty-question-ids' };
  }
  const questionIds: string[] = [];
  const seenQ = new Set<string>();
  for (const id of p.questionIds) {
    if (typeof id !== 'string' || id === '') return { ok: false, reason: 'bad-question-id' };
    if (seenQ.has(id)) return { ok: false, reason: 'duplicate-question-id' };
    seenQ.add(id);
    questionIds.push(id);
  }

  if (!Array.isArray(p.answers)) return { ok: false, reason: 'answers-not-array' };
  const seenAns = new Set<string>();
  const answers: SavedAnswerRecord[] = [];
  for (const a of p.answers) {
    if (!a || typeof a !== 'object') return { ok: false, reason: 'bad-answer' };
    const ar = a as Record<string, unknown>;
    if (typeof ar.questionId !== 'string' || !seenQ.has(ar.questionId)) {
      return { ok: false, reason: 'answer-unknown-question' };
    }
    if (seenAns.has(ar.questionId)) {
      return { ok: false, reason: 'duplicate-answer-record' };
    }
    seenAns.add(ar.questionId);
    if (typeof ar.correct !== 'boolean') return { ok: false, reason: 'answer-correct-type' };
    if (!Array.isArray(ar.selectedIndices)) return { ok: false, reason: 'answer-indices' };
    const selectedIndices: number[] = [];
    for (const idx of ar.selectedIndices) {
      if (typeof idx !== 'number' || !Number.isInteger(idx) || idx < 0) {
        return { ok: false, reason: 'answer-index-range' };
      }
      selectedIndices.push(idx);
    }
    answers.push({
      questionId: ar.questionId,
      correct: ar.correct,
      selectedIndices,
    });
  }

  if (typeof p.currentIdx !== 'number' || !Number.isInteger(p.currentIdx) || p.currentIdx < 0) {
    return { ok: false, reason: 'bad-currentIdx' };
  }
  if (p.currentIdx >= questionIds.length) return { ok: false, reason: 'currentIdx-oob' };

  if (p.elapsedSeconds !== undefined) {
    if (typeof p.elapsedSeconds !== 'number' || !Number.isFinite(p.elapsedSeconds) || p.elapsedSeconds < 0) {
      return { ok: false, reason: 'bad-elapsed' };
    }
  }

  if (typeof p.mode !== 'string' || !VALID_MODES.has(p.mode)) {
    return { ok: false, reason: 'invalid-mode' };
  }

  if (p.topicId !== undefined && p.topicId !== null && typeof p.topicId !== 'string') {
    return { ok: false, reason: 'bad-topicId' };
  }
  if (p.subjectId !== undefined && p.subjectId !== null && typeof p.subjectId !== 'string') {
    return { ok: false, reason: 'bad-subjectId' };
  }
  if (p.topicIds !== undefined) {
    if (!Array.isArray(p.topicIds)) return { ok: false, reason: 'bad-topicIds' };
    for (const tid of p.topicIds) {
      if (!isNonEmptyString(tid)) return { ok: false, reason: 'bad-topicIds-entry' };
    }
  }
  if (p.scope !== undefined && p.scope !== null) {
    if (typeof p.scope !== 'string' || !VALID_SCOPES.has(p.scope)) {
      return { ok: false, reason: 'bad-scope' };
    }
  }
  if (p.count !== undefined && p.count !== null) {
    if (p.count !== 'all') {
      if (typeof p.count !== 'number' || !Number.isInteger(p.count) || p.count < 1 || p.count > 500) {
        return { ok: false, reason: 'bad-count' };
      }
    }
  }
  if (p.difficulty !== undefined && p.difficulty !== null) {
    if (typeof p.difficulty !== 'string' || !VALID_DIFFICULTIES.has(p.difficulty)) {
      return { ok: false, reason: 'bad-difficulty' };
    }
  }
  if (p.wrongPool !== undefined && p.wrongPool !== null && typeof p.wrongPool !== 'boolean') {
    return { ok: false, reason: 'bad-wrongPool' };
  }
  if (p.timeLimit !== undefined && p.timeLimit !== null) {
    const tl = p.timeLimit;
    const ok =
      tl === 'none' ||
      tl === 'auto' ||
      (typeof tl === 'number' && Number.isFinite(tl) && tl > 0) ||
      (typeof tl === 'string' && tl !== '');
    if (!ok) return { ok: false, reason: 'bad-timeLimit' };
  }

  if (p.track != null && p.track !== '' && !isTrackId(String(p.track))) {
    return { ok: false, reason: 'invalid-track' };
  }
  if (p.examId === '') return { ok: false, reason: 'empty-examId' };
  if (p.examId != null && typeof p.examId !== 'string') {
    return { ok: false, reason: 'bad-examId' };
  }

  if (p.optionOrders !== undefined) {
    if (!Array.isArray(p.optionOrders)) return { ok: false, reason: 'optionOrders-type' };
    // Legacy: omit or empty; if present non-empty must align 1:1 with questionIds
    if (p.optionOrders.length > 0 && p.optionOrders.length !== questionIds.length) {
      return { ok: false, reason: 'optionOrders-length' };
    }
  }

  return {
    ok: true,
    draft: {
      questionIds,
      optionOrders: p.optionOrders as number[][] | undefined,
      answers,
      elapsedSeconds: p.elapsedSeconds as number | undefined,
      currentIdx: p.currentIdx as number,
      mode: p.mode as PracticeMode,
      topicId: (p.topicId as string | undefined) ?? undefined,
      topicIds: p.topicIds as string[] | undefined,
      scope: p.scope as 'subject' | 'all' | undefined,
      subjectId: (p.subjectId as string | undefined) ?? undefined,
      count: p.count as number | 'all' | undefined,
      difficulty: p.difficulty as DifficultyFilter | undefined,
      timeLimit: p.timeLimit as TimeLimitSetting | undefined,
      wrongPool: p.wrongPool as boolean | undefined,
      track: (p.track as string | null | undefined) ?? null,
      examId: (p.examId as string | null | undefined) ?? null,
    },
  };
}

/**
 * Dashboard / preflight resume eligibility — stronger than shape alone.
 * Does not load the question bank; QuizScreen still runs reconcileRestoredDraft.
 *
 * - no-draft / invalid-shape → not offerable
 * - workspace null → unknown (do not claim resumable)
 * - track/exam mismatch → incompatible
 * - shape OK + workspace match → eligible to offer (bank checks still at resume)
 */
export type DraftResumeAssessment =
  | { status: 'eligible'; draft: SavedDraftShape }
  | { status: 'none' }
  | { status: 'invalid'; reason: string }
  | { status: 'incompatible'; reason: string }
  | { status: 'unknown'; reason: string };

export function assessSavedDraftForResume(
  raw: unknown,
  workspace: { trackId: string; examId: string | null } | null,
): DraftResumeAssessment {
  if (raw == null) return { status: 'none' };
  const shape = validateDraftShape(raw);
  if (!shape.ok) return { status: 'invalid', reason: shape.reason };

  const draft = shape.draft;

  // Active workspace is required to claim compatibility — do not treat null as a match
  if (!workspace || !workspace.trackId) {
    return { status: 'unknown', reason: 'no-active-workspace' };
  }

  const draftTrack = draft.track ?? null;
  const draftExam = draft.examId ?? null;
  // Legacy drafts without track: not safely offerable from Home
  if (draftTrack == null || draftTrack === '') {
    return { status: 'incompatible', reason: 'draft-missing-track' };
  }
  if (draftTrack !== workspace.trackId) {
    return { status: 'incompatible', reason: 'track-mismatch' };
  }
  if (draftExam !== workspace.examId) {
    return { status: 'incompatible', reason: 'exam-mismatch' };
  }

  return { status: 'eligible', draft };
}

/**
 * Same grading rules as QuizScreen — single source for resume recompute.
 * selectedIndices are in the *display* option space (after permutation applied).
 */
export function gradeAnswer(question: Question, selectedIndices: number[]): boolean {
  if (question.type === 'multi') {
    const correct = [...(question.correctAnswer as number[])].sort((a, b) => a - b);
    const selected = [...selectedIndices].sort((a, b) => a - b);
    return correct.length === selected.length && correct.every((v, i) => v === selected[i]);
  }
  if (question.type === 'fill_blank') {
    if (selectedIndices.length === 0) return false;
    return selectedIndices[0] === (question.correctAnswer as number);
  }
  if (question.type === 'matching') {
    const correct = question.correctAnswer as number[];
    if (selectedIndices.length !== correct.length) return false;
    for (let i = 0; i < correct.length; i++) {
      const v = selectedIndices[i];
      if (v === undefined || v === null || v < 0 || v !== correct[i]) return false;
    }
    return true;
  }
  return selectedIndices.length === 1 && selectedIndices[0] === question.correctAnswer;
}

/** Validate display-space selections against a restored question. */
export function selectionsValidForQuestion(
  question: Question,
  selectedIndices: number[],
): boolean {
  const n = question.options?.length ?? 0;
  if (!Array.isArray(selectedIndices)) return false;

  if (question.type === 'single' || question.type === 'true_false' || question.type === 'fill_blank') {
    if (selectedIndices.length !== 1) return false;
    const i = selectedIndices[0];
    return Number.isInteger(i) && i >= 0 && i < n;
  }

  if (question.type === 'multi') {
    if (selectedIndices.length === 0) return false;
    const seen = new Set<number>();
    for (const i of selectedIndices) {
      if (!Number.isInteger(i) || i < 0 || i >= n) return false;
      if (seen.has(i)) return false; // duplicates not meaningful
      seen.add(i);
    }
    return true;
  }

  if (question.type === 'matching') {
    const matchN = question.matchOptions?.length ?? 0;
    // Dense: one entry per stem option; value is index into matchOptions
    if (selectedIndices.length !== n) return false;
    for (const i of selectedIndices) {
      if (!Number.isInteger(i) || i < 0 || i >= matchN) return false;
    }
    return true;
  }

  // calculation / unknown: treat like single if options present
  if (n > 0) {
    if (selectedIndices.length !== 1) return false;
    const i = selectedIndices[0];
    return Number.isInteger(i) && i >= 0 && i < n;
  }
  return false;
}

export type RestoredDraftResult =
  | {
      ok: true;
      questions: Question[];
      optionOrders: number[][];
      answers: SavedAnswerRecord[];
    }
  | { ok: false; reason: string };

/**
 * After questions are loaded and scoped: validate permutations + selections,
 * recompute correctness (do not trust stored `correct`).
 * `bankQuestions` must be in saved questionIds order, bank (unshuffled) form.
 */
export function reconcileRestoredDraft(
  bankQuestions: Question[],
  draft: SavedDraftShape,
): RestoredDraftResult {
  if (bankQuestions.length !== draft.questionIds.length) {
    return { ok: false, reason: 'question-count-mismatch' };
  }
  for (let i = 0; i < bankQuestions.length; i++) {
    if (bankQuestions[i].id !== draft.questionIds[i]) {
      return { ok: false, reason: 'question-order-mismatch' };
    }
  }

  const hasOrders =
    Array.isArray(draft.optionOrders) && draft.optionOrders.length === draft.questionIds.length;

  // If any answer exists and orders are partially malformed → reject (no silent reinterpret)
  if (hasOrders) {
    for (let i = 0; i < bankQuestions.length; i++) {
      const q = bankQuestions[i];
      const order = draft.optionOrders![i];
      const n = q.options?.length ?? 0;
      if (order == null) {
        // treat missing slot as identity only if no answers for this q
        const hasAns = draft.answers.some((a) => a.questionId === q.id);
        if (hasAns) return { ok: false, reason: 'missing-option-order-for-answered' };
        continue;
      }
      if (!isValidOptionPermutation(order, n)) {
        return { ok: false, reason: 'invalid-option-order' };
      }
    }
  } else if (draft.optionOrders && draft.optionOrders.length > 0) {
    return { ok: false, reason: 'optionOrders-length' };
  }

  const restored: Question[] = [];
  const optionOrders: number[][] = [];

  for (let i = 0; i < bankQuestions.length; i++) {
    const q = bankQuestions[i];
    const n = q.options?.length ?? 0;
    let order = (q.options ?? []).map((_, j) => j);
    if (hasOrders && draft.optionOrders![i] && isValidOptionPermutation(draft.optionOrders![i], n)) {
      order = draft.optionOrders![i];
    }
    optionOrders.push(order);
    restored.push(applyOptionOrderPure(q, order));
  }

  const byId = new Map(restored.map((q) => [q.id, q]));
  const answers: SavedAnswerRecord[] = [];
  for (const a of draft.answers) {
    const q = byId.get(a.questionId);
    if (!q) return { ok: false, reason: 'answer-unknown-question' };
    if (!selectionsValidForQuestion(q, a.selectedIndices)) {
      return { ok: false, reason: 'invalid-selection-for-type' };
    }
    const correct = gradeAnswer(q, a.selectedIndices);
    answers.push({
      questionId: a.questionId,
      selectedIndices: a.selectedIndices,
      correct,
    });
  }

  return { ok: true, questions: restored, optionOrders, answers };
}

/** Pure option-order apply (mirrors QuizScreen). */
export function applyOptionOrderPure(q: Question, order: number[]): Question {
  if (!q.options?.length || order.length !== q.options.length) return q;
  if (!isValidOptionPermutation(order, q.options.length)) return q;
  const options = order.map((oi) => q.options[oi]);
  const inv: number[] = new Array(order.length);
  order.forEach((oi, newIdx) => {
    inv[oi] = newIdx;
  });

  let correctAnswer: number | number[];
  if (q.type === 'matching' && Array.isArray(q.correctAnswer)) {
    const mapped = order.map((oi) => (q.correctAnswer as number[])[oi]);
    if (mapped.some((v) => v === undefined)) return q; // fail closed
    correctAnswer = mapped;
  } else if (Array.isArray(q.correctAnswer)) {
    const mapped = (q.correctAnswer as number[]).map((oi) => inv[oi]);
    if (mapped.some((v) => v === undefined)) return q; // fail closed — no silent drop
    correctAnswer = mapped.sort((a, b) => a - b);
  } else {
    const mapped = inv[q.correctAnswer as number];
    // Never retain the bank index after a failed inverse (would grade the wrong option)
    if (mapped === undefined) return q;
    correctAnswer = mapped;
  }
  return { ...q, options, correctAnswer };
}

export function questionsMatchRequest(
  questions: Question[],
  request: QuizRequest,
  questionResults?: Record<string, { correct: boolean; timestamp: number }>,
): boolean {
  if (request.scope === 'subject' && request.subjectId) {
    for (const q of questions) {
      if (sectionMap[q.sectionId]?.subjectId !== request.subjectId) return false;
    }
  }
  if (request.mode === 'topic' && request.topicId) {
    for (const q of questions) {
      if (q.topicId !== request.topicId) return false;
    }
  }
  if (request.topicIds && request.topicIds.length > 0) {
    const set = new Set(request.topicIds);
    for (const q of questions) {
      if (!set.has(q.topicId)) return false;
    }
  }
  if (request.difficulty && request.difficulty !== 'any') {
    for (const q of questions) {
      if (q.difficulty !== request.difficulty) return false;
    }
  }
  if (request.wrongPool && questionResults) {
    for (const q of questions) {
      const r = questionResults[q.id];
      if (!r || r.correct) return false;
    }
  }
  return true;
}

export function topicBelongsToSubject(topicId: string, subjectId: string): boolean {
  const topic = getTopic(topicId);
  if (!topic) return false;
  return sectionMap[topic.sectionId]?.subjectId === subjectId;
}

export function questionInSessionScope(
  q: Question,
  snap: QuizSessionSnapshot,
): boolean {
  const sid = sectionMap[q.sectionId]?.subjectId;
  if (!sid || !snap.allowedSubjectIds.includes(sid)) return false;
  return contentEligibleForScope(q, snap.scopeInput);
}
