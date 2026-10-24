import type {
  CurriculumContentBlock,
  CurriculumLesson,
  CurriculumReadinessEvidence,
  ReadinessStatus,
} from '@/types/curriculum';

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

const RELEASE_GRADE_STATUSES = new Set<ReadinessStatus>(['validated', 'released']);

/**
 * A status is a claim about evidence, not just a progress label. Require
 * explicit, dated review evidence for every validated/released curriculum node.
 */
export function validateReadinessEvidence(
  readiness: ReadinessStatus,
  evidence: CurriculumReadinessEvidence | undefined,
  label = 'Curriculum node',
): string[] {
  if (!RELEASE_GRADE_STATUSES.has(readiness)) return [];

  const issues: string[] = [];
  if (!evidence) {
    return [`${label} is marked ${readiness} without readiness evidence.`];
  }
  if (!hasText(evidence.reviewer)) issues.push(`${label} readiness evidence requires a reviewer.`);

  const date = evidence.reviewedOn;
  const validDate = /^\\d{4}-\\d{2}-\\d{2}$/.test(date)
    && !Number.isNaN(Date.parse(`${date}T00:00:00Z`))
    && new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
  if (!validDate) issues.push(`${label} readiness evidence requires a real YYYY-MM-DD review date.`);

  if (!evidence.checksPassed?.some(hasText)) {
    issues.push(`${label} readiness evidence must list at least one completed check.`);
  }
  if (!evidence.notes?.some(hasText)) {
    issues.push(`${label} readiness evidence must include review notes or evidence references.`);
  }
  return issues;
}

/** Additional teaching-quality gates for lessons claiming validated/released. */
export function validateLessonReadiness(
  lesson: Pick<CurriculumLesson, 'id' | 'readiness' | 'readinessEvidence' | 'content' | 'objectives' | 'activityIds' | 'assessmentIds'>,
): string[] {
  const label = `Lesson ${lesson.id}`;
  const issues = validateReadinessEvidence(lesson.readiness, lesson.readinessEvidence, label);
  if (!RELEASE_GRADE_STATUSES.has(lesson.readiness)) return issues;

  if (!hasSubstantiveLessonContent(lesson)) {
    issues.push(`${label} is marked ${lesson.readiness} without substantive instructional content.`);
  }
  if (lesson.objectives.length === 0 || lesson.objectives.some((objective) =>
    !hasText(objective.statement) || !hasText(objective.action),
  )) {
    issues.push(`${label} is marked ${lesson.readiness} without complete, observable learning objectives.`);
  }
  if (lesson.activityIds.length === 0 && lesson.assessmentIds.length === 0) {
    issues.push(`${label} is marked ${lesson.readiness} without linked practice or assessment evidence.`);
  }
  return issues;
}
