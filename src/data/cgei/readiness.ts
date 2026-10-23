import type { CurriculumContentBlock, CurriculumLesson } from '@/types/curriculum';

function hasText(value?: string): boolean {
  return Boolean(value?.trim());
}

/**
 * Registry presence and a non-empty content array are not enough to count a
 * lesson as substantively authored: placeholder-only figure blocks are common
 * during drafting and must not inflate the learner-facing coverage count.
 */
export function hasSubstantiveContentBlock(block: CurriculumContentBlock): boolean {
  switch (block.kind) {
    case 'prose':
    case 'worked-example':
      return hasText(block.body);
    case 'key-points':
    case 'checklist':
      return Boolean(block.items?.some((item) => hasText(item)));
    case 'equation':
      return hasText(block.expression) || hasText(block.body);
    case 'code':
      return hasText(block.code) || hasText(block.body);
    case 'table':
      return Boolean(block.headers?.some(hasText) && block.rows?.some((row) => row.some(hasText)));
    case 'callout':
    case 'reflection':
      return hasText(block.body) || Boolean(block.items?.some((item) => hasText(item)));
    case 'figure':
      return (hasText(block.body) && block.body?.trim() !== 'Figure or visual resource to be added.') || hasText(block.caption);
    default:
      return false;
  }
}

export function hasSubstantiveLessonContent(lesson: Pick<CurriculumLesson, 'content'>): boolean {
  return lesson.content.some(hasSubstantiveContentBlock);
}
