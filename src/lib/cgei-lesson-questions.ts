/**
 * Phase C4 helpers: lesson-page questions from the subject engine bank.
 * Shuffle is stable for a given attempt key; answers stay unrecorded.
 */
import type { Question, QuestionType } from '@/types';
import type { CurriculumQuestion } from '@/types/curriculum';

const LESSON_RENDER_TYPES = new Set<QuestionType>(['single', 'true_false']);

export type LessonCheckItem = {
  id: string;
  prompt: string;
  options: string[];
  /** Index into the (possibly shuffled) options array */
  correctAnswer: number;
  difficulty: string;
  cognitiveLevel?: string;
  explanation: string;
  source: 'curriculum' | 'bank';
};

/** Fisher–Yates shuffle; returns remapped correct index. */
export function shuffleOptions(
  options: readonly string[],
  correctAnswer: number,
  random: () => number = Math.random,
): { options: string[]; correctAnswer: number } {
  const pairs = options.map((text, index) => ({ text, index }));
  for (let i = pairs.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const tmp = pairs[i]!;
    pairs[i] = pairs[j]!;
    pairs[j] = tmp;
  }
  const correct = pairs.findIndex((p) => p.index === correctAnswer);
  return {
    options: pairs.map((p) => p.text),
    correctAnswer: correct >= 0 ? correct : 0,
  };
}

export function curriculumQuestionToCheck(q: CurriculumQuestion): LessonCheckItem {
  return {
    id: q.id,
    prompt: q.prompt,
    options: [...q.options],
    correctAnswer: q.correctAnswer,
    difficulty: q.difficulty,
    cognitiveLevel: q.cognitiveLevel,
    explanation: q.explanation,
    source: 'curriculum',
  };
}

export function bankQuestionToCheck(q: Question): LessonCheckItem | null {
  if (!q.type || !LESSON_RENDER_TYPES.has(q.type)) return null;
  if (typeof q.correctAnswer !== 'number') return null;
  if (!Array.isArray(q.options) || q.options.length < 2) return null;
  return {
    id: q.id,
    prompt: q.question,
    options: [...q.options],
    correctAnswer: q.correctAnswer,
    difficulty: q.difficulty,
    cognitiveLevel: q.cognitiveLevel,
    explanation: q.explanation,
    source: 'bank',
  };
}

/**
 * Prefer bank rows with matching lessonId; fall back to curriculum assessment IDs.
 * Dedupes by question id (bank wins).
 */
export function collectLessonChecks(args: {
  lessonId: string;
  assessmentQuestionIds: readonly string[];
  curriculumQuestions: readonly CurriculumQuestion[];
  bankQuestions: readonly Question[];
}): LessonCheckItem[] {
  const byId = new Map<string, LessonCheckItem>();

  for (const q of args.curriculumQuestions) {
    if (args.assessmentQuestionIds.includes(q.id) || q.lessonId === args.lessonId) {
      byId.set(q.id, curriculumQuestionToCheck(q));
    }
  }

  for (const q of args.bankQuestions) {
    if (q.lessonId === args.lessonId) {
      const item = bankQuestionToCheck(q);
      if (item) byId.set(q.id, item);
    }
  }

  // Preserve assessment order when present, then any extra bank-only items
  const ordered: LessonCheckItem[] = [];
  const seen = new Set<string>();
  for (const id of args.assessmentQuestionIds) {
    const item = byId.get(id);
    if (item) {
      ordered.push(item);
      seen.add(id);
    }
  }
  for (const [id, item] of byId) {
    if (!seen.has(id)) ordered.push(item);
  }
  return ordered;
}
