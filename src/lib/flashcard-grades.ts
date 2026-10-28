/**
 * Four-grade flashcard outcomes → review events (L-08).
 */

import { buildReviewEvent, type ReviewGrade, type ReviewEvent } from './review-event.ts';
import { dualWriteQuizAttemptsFireAndForget } from './dual-write.ts';

export const FLASHCARD_GRADES: { grade: ReviewGrade; label: string; hint: string }[] = [
  { grade: 'again', label: 'Again', hint: 'Forgot' },
  { grade: 'hard', label: 'Hard', hint: 'Struggled' },
  { grade: 'good', label: 'Good', hint: 'OK' },
  { grade: 'easy', label: 'Easy', hint: 'Easy' },
];

/** Map grade to a synthetic correct flag + confidence for the shared event log. */
export function gradeToAttempt(grade: ReviewGrade): {
  correct: boolean;
  confidence: 1 | 2 | 3;
} {
  switch (grade) {
    case 'again':
      return { correct: false, confidence: 3 };
    case 'hard':
      return { correct: true, confidence: 1 };
    case 'good':
      return { correct: true, confidence: 2 };
    case 'easy':
      return { correct: true, confidence: 3 };
  }
}

export function recordFlashcardGrade(args: {
  cardId: string;
  topicId: string;
  grade: ReviewGrade;
}): ReviewEvent {
  const { correct, confidence } = gradeToAttempt(args.grade);
  const event = buildReviewEvent({
    itemId: args.cardId,
    skillId: args.topicId,
    correct,
    confidence,
    mode: 'flashcard',
  });
  dualWriteQuizAttemptsFireAndForget({
    answers: [
      {
        questionId: args.cardId,
        correct,
        confidence,
        skillId: args.topicId,
      },
    ],
    mode: 'flashcard',
    sessionId: `flash_${Date.now()}`,
  });
  return event;
}

/** Lint: flag multi-fact prompts that are too long for atomic recall. */
export function lintFlashcardPrompt(prompt: string): string[] {
  const issues: string[] = [];
  if (prompt.length > 120) issues.push('prompt_long');
  if ((prompt.match(/;/g) ?? []).length >= 2) issues.push('multi_clause');
  if (/\b(and|also)\b/i.test(prompt) && prompt.length > 80) issues.push('possibly_multi_fact');
  return issues;
}
