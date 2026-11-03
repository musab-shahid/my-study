import type { Question } from '../types.ts';

/** True only when every option index occurs exactly once. */
export function isValidOptionPermutation(order: number[], optionCount: number): boolean {
  if (!Array.isArray(order) || order.length !== optionCount) return false;
  if (optionCount === 0) return order.length === 0;
  const seen = new Set<number>();
  for (const index of order) {
    if (!Number.isInteger(index) || index < 0 || index >= optionCount || seen.has(index)) return false;
    seen.add(index);
  }
  return seen.size === optionCount;
}

/**
 * Apply a session-stable display order. order[i] is the original bank index
 * shown at display position i. Correct answers are remapped with the options.
 */
export function applyOptionOrder(question: Question, order: number[]): Question {
  const optionCount = question.options?.length ?? 0;
  if (optionCount === 0 || !isValidOptionPermutation(order, optionCount)) return question;

  const options = order.map((index) => question.options[index]);
  const inverse = new Array<number>(optionCount);
  order.forEach((originalIndex, displayIndex) => {
    inverse[originalIndex] = displayIndex;
  });

  let correctAnswer: number | number[];
  if (question.type === 'matching' && Array.isArray(question.correctAnswer)) {
    // Each prompt option carries its corresponding match-option index.
    const matchingAnswers = question.correctAnswer as number[];
    const mapped = order.map((originalIndex) => matchingAnswers[originalIndex]);
    if (mapped.some((value) => !Number.isInteger(value))) return question;
    correctAnswer = mapped;
  } else if (Array.isArray(question.correctAnswer)) {
    const mapped = question.correctAnswer.map((originalIndex) => inverse[originalIndex]);
    if (mapped.some((value) => value === undefined)) return question;
    correctAnswer = mapped.sort((a, b) => a - b);
  } else {
    const mapped = inverse[question.correctAnswer];
    if (mapped === undefined) return question;
    correctAnswer = mapped;
  }

  return { ...question, options, correctAnswer };
}

/** Backward-compatible name used by quiz-session draft reconciliation. */
export const applyOptionOrderPure = applyOptionOrder;
