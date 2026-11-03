import type { TrackId } from '../data/tracks.ts';
import type { Question, DifficultyFilter, PracticeMode, TimeLimitSetting } from '../types.ts';
import type { AnswerRecord } from '../components/quiz/QuizResults.ts';
import { validateDraftShape } from './quiz-session.ts';

export type ReviewAttemptRecord = AnswerRecord & { optionOrder: number[]; questionIndex: number };

export interface QuizProgressSnapshot {
  questions: Question[];
  optionOrders: number[][];
  currentIdx: number;
  reviewSessionId: string;
  answers: AnswerRecord[];
  reviewAttempts: ReviewAttemptRecord[];
  elapsed: number;
}

export interface SavedQuizProgress {
  questionIds: string[];
  /** Parallel to questionIds; session-stable option permutation */
  optionOrders?: number[][];
  answers: AnswerRecord[];
  reviewAttempts?: ReviewAttemptRecord[];
  reviewSessionId?: string;
  /** Seconds already elapsed when progress was saved (timer resume) */
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
  track?: TrackId;
  examId?: string | null;
}

export function buildBreakdown(questions: Question[], answers: AnswerRecord[]) {
  const byId = new Map(answers.map((answer) => [answer.questionId, answer]));
  const perTopic: Record<string, { correct: number; total: number }> = {};
  const perDifficulty: Record<string, { correct: number; total: number }> = {};
  for (const question of questions) {
    const answer = byId.get(question.id);
    if (!perTopic[question.topicId]) perTopic[question.topicId] = { correct: 0, total: 0 };
    perTopic[question.topicId].total++;
    if (answer?.correct) perTopic[question.topicId].correct++;
    if (!perDifficulty[question.difficulty]) perDifficulty[question.difficulty] = { correct: 0, total: 0 };
    perDifficulty[question.difficulty].total++;
    if (answer?.correct) perDifficulty[question.difficulty].correct++;
  }
  return { perTopic, perDifficulty };
}

const QUIZ_PROGRESS_KEY = 'examprep-quiz-progress';

export function saveQuizProgress(
  state: QuizProgressSnapshot,
  mode: PracticeMode,
  topicId?: string,
  subjectId?: string,
  topicIds?: string[],
  scope?: 'subject' | 'all',
  count?: number | 'all',
  difficulty?: DifficultyFilter,
  timeLimit?: TimeLimitSetting,
  wrongPool?: boolean,
  track?: TrackId | null,
  examId?: string | null,
): void {
  try {
    const progress: SavedQuizProgress = {
      questionIds: state.questions.map((question) => question.id),
      optionOrders: state.optionOrders,
      answers: state.answers,
      reviewAttempts: state.reviewAttempts,
      reviewSessionId: state.reviewSessionId,
      elapsedSeconds: state.elapsed,
      currentIdx: state.currentIdx,
      mode,
      topicId,
      subjectId,
      topicIds,
      scope,
      count,
      difficulty,
      timeLimit,
      wrongPool,
      track: track ?? undefined,
      examId: examId ?? null,
    };
    localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Progress storage is best-effort; the active in-memory quiz remains usable.
  }
}

export function loadQuizProgress(): SavedQuizProgress | null {
  try {
    const raw = localStorage.getItem(QUIZ_PROGRESS_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    const validation = validateDraftShape(parsed);
    if (!validation.ok) return null;
    return validation.draft as SavedQuizProgress;
  } catch {
    return null;
  }
}

export function clearQuizProgress(): void {
  try {
    localStorage.removeItem(QUIZ_PROGRESS_KEY);
  } catch {
    // Clearing progress must not interrupt navigation or quiz completion.
  }
}
