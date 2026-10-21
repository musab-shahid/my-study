/**
 * Shared app constants — single source for stage screens, storage keys, etc.
 * Import from here instead of re-declaring arrays in multiple modules.
 *
 * Keep this module free of React / context imports to avoid cycles.
 */

/** Screens that use per-screen subject selection context */
export const STAGE_SCREENS = [
  'learn',
  'practice',
  'review',
  'formulas',
  'progress',
  'search',
] as const;

export type StageScreenId = (typeof STAGE_SCREENS)[number];

/** localStorage keys used across the app */
export const STORAGE_KEYS = {
  appData: 'examprep-data',
  legacyAppData: 'fpsc-prep-data',
  subjectSelection: 'examprep-subject-selection',
  practicePrefs: 'examprep-practice-prefs',
  quizProgress: 'examprep-quiz-progress',
  sidebarExpanded: 'examprep-sidebar-expanded',
} as const;

/** Mastery threshold used by attention + UI */
export const MASTERY_ACCURACY_THRESHOLD = 80;
/** Min quiz answers on a topic before mastery can apply (was 1 — too easy). */
export const MASTERY_MIN_QUIZ_ATTEMPTS = 3;

/** Spaced-repetition interval stages (days) */
export const REVIEW_STAGES_DAYS = [1, 3, 7, 14, 30] as const;

/** Weak-topic defaults (aligned across attention + streak) */
/** Align with mastery floor so topics are not invisible between mastered and weak. */
export const WEAK_TOPIC_MIN_ATTEMPTS = 3;
export const WEAK_TOPIC_LIMIT = 5;

/** How many recent quiz sessions drive mastery / weak / SR accuracy */
export const RECENT_QUIZ_SESSION_WINDOW = 5;

/** Derive accuracy percentage from raw counts — no rounding drift */
export function deriveAccuracy(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 100);
}

export type QuizSessionLike = { correct: number; total: number };

/**
 * Effective quiz stats for mastery / weak / SR.
 * Prefer sum of recentSessions (last N); fall back to lifetime quizCorrect/quizTotal.
 */
export function getEffectiveQuizStats(progress: {
  quizCorrect?: number;
  quizTotal?: number;
  recentSessions?: QuizSessionLike[] | null;
}): { correct: number; total: number; accuracy: number; fromWindow: boolean } {
  const sessions = progress.recentSessions;
  if (sessions && sessions.length > 0) {
    let correct = 0;
    let total = 0;
    for (const s of sessions) {
      correct += s.correct;
      total += s.total;
    }
    return { correct, total, accuracy: deriveAccuracy(correct, total), fromWindow: true };
  }
  const correct = progress.quizCorrect ?? 0;
  const total = progress.quizTotal ?? 0;
  return { correct, total, accuracy: deriveAccuracy(correct, total), fromWindow: false };
}

/** Derive topic status from underlying data — single source of truth */
export function deriveStatus(
  studied: boolean,
  quizTotal: number,
  quizAccuracy: number,
): 'not_started' | 'studied' | 'mastered' {
  if (quizTotal >= MASTERY_MIN_QUIZ_ATTEMPTS && quizAccuracy >= MASTERY_ACCURACY_THRESHOLD) return 'mastered';
  if (studied || quizTotal > 0) return 'studied';
  return 'not_started';
}

/** One-call status from progress (uses recent-session window when present). */
export function getTopicStatusFromProgress(
  studied: boolean,
  progress: {
    quizCorrect?: number;
    quizTotal?: number;
    recentSessions?: QuizSessionLike[] | null;
  } | null | undefined,
): 'not_started' | 'studied' | 'mastered' {
  const eff = getEffectiveQuizStats(progress ?? {});
  return deriveStatus(studied, eff.total, eff.accuracy);
}

/** Composite mastery score 0–100, clamped: 50% coverage + 50% accuracy */
export function computeMasteryScore(studiedTopics: number, totalTopics: number, accuracy: number | null): number {
  if (totalTopics <= 0) return 0;
  const acc = accuracy ?? 0; // no attempts → coverage-only half of the score
  return Math.min(100, Math.max(0, Math.round((studiedTopics / totalTopics) * 50 + acc * 0.5)));
}

/** Local date string (YYYY-MM-DD) for storage — avoids UTC/local mismatch */
export function localDateString(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Parse a stored YYYY-MM-DD date as local midnight (not UTC) */
export function parseLocalDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}
