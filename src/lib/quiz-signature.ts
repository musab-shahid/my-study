/**
 * Pure quiz resume signature — must match for resume to be offered.
 * Uses JSON.stringify on a stable shape so field values cannot inject delimiters.
 * Includes track + examId so drafts cannot cross workspace/profile boundaries.
 */
import type { DifficultyFilter, PracticeMode } from '../types';

export type QuizSignatureInput = {
  mode: PracticeMode;
  topicId?: string;
  topicIds?: string[];
  scope?: 'subject' | 'all';
  subjectId?: string;
  count?: number | 'all';
  difficulty?: DifficultyFilter;
  wrongPool?: boolean;
  track?: 'fpsc' | 'hat' | string | null;
  /** Active exam profile id; null = general preparation */
  examId?: string | null;
  timeLimit?: number | 'none' | 'auto' | string;
};

export function quizSignature(p: QuizSignatureInput): string {
  const topicIds = [...(p.topicIds ?? [])].map(String).sort();
  return JSON.stringify({
    mode: p.mode,
    topicId: p.topicId ?? null,
    topicIds,
    scope: p.scope ?? null,
    subjectId: p.subjectId ?? null,
    count: p.count ?? null,
    difficulty: p.difficulty ?? null,
    wrongPool: Boolean(p.wrongPool),
    track: p.track ?? null,
    examId: p.examId === undefined ? null : p.examId,
    timeLimit:
      p.timeLimit === undefined || p.timeLimit === null ? null : String(p.timeLimit),
  });
}

export function signaturesMatch(a: QuizSignatureInput, b: QuizSignatureInput): boolean {
  return quizSignature(a) === quizSignature(b);
}
