/**
 * Four-grade flashcard outcomes → review events (L-08).
 */

import type { ReviewGrade } from './review-event.ts';
import { dualWriteQuizAttemptsFireAndForget } from './dual-write.ts';

export const FLASHCARD_GRADES: { grade: ReviewGrade; label: string; hint: string }[] = [
  { grade: 'again', label: 'Again', hint: 'Forgot' },
  { grade: 'hard', label: 'Hard', hint: 'Struggled' },
  { grade: 'good', label: 'Good', hint: 'OK' },
  { grade: 'easy', label: 'Easy', hint: 'Easy' },
];

/** Compatibility projection for the legacy binary replay field; the explicit grade is stored too. */
export function gradeToAttempt(grade: ReviewGrade): { correct: boolean } {
  switch (grade) {
    case 'again':
      return { correct: false };
    case 'hard':
      return { correct: true };
    case 'good':
      return { correct: true };
    case 'easy':
      return { correct: true };
  }
}

export function recordFlashcardGrade(args: {
  cardId: string;
  topicId: string;
  grade: ReviewGrade;
}): void {
  const { correct } = gradeToAttempt(args.grade);
  dualWriteQuizAttemptsFireAndForget({
    answers: [
      {
        questionId: args.cardId,
        correct,
        grade: args.grade,
        skillId: args.topicId,
      },
    ],
    mode: 'flashcard',
    sessionId: `flash_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
  });


/** Lint: flag multi-fact prompts that are too long for atomic recall. */
export function lintFlashcardPrompt(prompt: string): string[] {
  const issues: string[] = [];
  if (prompt.length > 120) issues.push('prompt_long');
  if ((prompt.match(/;/g) ?? []).length >= 2) issues.push('multi_clause');
  if (/\b(and|also)\b/i.test(prompt) && prompt.length > 80) issues.push('possibly_multi_fact');
  return issues;
}
