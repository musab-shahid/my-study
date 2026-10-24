import type { CurriculumQuestion } from '@/types/curriculum';
import { hasSubstantiveText } from './readiness';

const DIFFICULTIES = new Set(['easy', 'medium', 'hard']);
const COGNITIVE_LEVELS = new Set(['remember', 'understand', 'apply', 'analyze', 'evaluate', 'create']);

/**
 * Validate a single-choice item as a usable assessment prompt, not merely a
 * structurally indexable record. This cannot certify scientific correctness;
 * it catches common authoring defects before a question reaches learners.
 */
export function validateCurriculumQuestion(question: CurriculumQuestion): string[] {
  const label = `Question ${hasSubstantiveText(question.id) ? question.id : '(missing id)'}`;
  const issues: string[] = [];

  if (!hasSubstantiveText(question.id)) issues.push(`${label} requires a non-placeholder ID.`);
  if (!hasSubstantiveText(question.lessonId)) issues.push(`${label} requires a lesson ID.`);
  if (question.type !== 'single-choice') issues.push(`${label} must use the single-choice type.`);
  if (!hasSubstantiveText(question.prompt)) issues.push(`${label} requires a substantive prompt.`);

  if (!Array.isArray(question.options) || question.options.length < 2) {
    issues.push(`${label} needs at least two answer options.`);
  } else {
    const seenOptions = new Set<string>();
    question.options.forEach((option, index) => {
      if (!hasSubstantiveText(option)) {
        issues.push(`${label} option ${index + 1} is empty or a drafting placeholder.`);
        return;
      }
      const normalized = option.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase();
      if (seenOptions.has(normalized)) {
        issues.push(`${label} has duplicate answer options after whitespace/case normalization.`);
      }
      seenOptions.add(normalized);
    });
  }

  if (!Number.isInteger(question.correctAnswer)
      || question.correctAnswer < 0
      || !Array.isArray(question.options)
      || question.correctAnswer >= question.options.length) {
    issues.push(`${label} has an invalid correctAnswer index.`);
  }
  if (!hasSubstantiveText(question.explanation)) issues.push(`${label} requires a substantive explanation.`);
  if (!DIFFICULTIES.has(question.difficulty)) issues.push(`${label} has an invalid difficulty.`);
  if (!COGNITIVE_LEVELS.has(question.cognitiveLevel)) issues.push(`${label} has an invalid cognitive level.`);

  return issues;
}
