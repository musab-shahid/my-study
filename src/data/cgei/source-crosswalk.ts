import type { CurriculumLesson, CurriculumSubject, CurriculumUnit } from '@/types/curriculum';

/**
 * Source-to-app audit contract for Subject 5.
 *
 * This inventory is intentionally conservative at unit level. It is not a
 * substitute for the required topic/subtopic-level source inventory. Expand
 * it from the Master Study TOC without converting unresolved items into matches.
 */
export type SourceDisposition =
  | 'mapped-and-taught'
  | 'mapped-partial'
  | 'candidate-match'
  | 'source-only'
  | 'deferred-by-priority'
  | 'not-a-lesson';

export type SourceKind =
  | 'topic'
  | 'subtopic'
  | 'unit-outcome'
  | 'assessment'
  | 'reference'
  | 'orientation'
  | 'deliverable';

export interface SourceCrosswalkEntry {
  sourceId: string;
  sourceTitle: string;
  sourceKind: SourceKind;
  priority: 'Core' | 'Support' | 'Optional';
  disposition: SourceDisposition;
  appUnitId?: string;
  appLessonId?: string;
  evidenceBlockIds?: string[];
  activityIds?: string[];
  assessmentIds?: string[];
  deliverableIds?: string[];
  gapNote?: string;
}

export const subject5SourceCrosswalk: SourceCrosswalkEntry[] = [
  { sourceId: '5.orientation', sourceTitle: 'Scientific computing and data science — subject overview', sourceKind: 'orientation', priority: 'Core', disposition: 'not-a-lesson', gapNote: 'Overview belongs in CurriculumSubject.overview; must not be a progress or quiz item.' },
  { sourceId: '5.1', sourceTitle: 'Mathematical and physical foundations', sourceKind: 'topic', priority: 'Core', disposition: 'mapped-and-taught', appUnitId: 'cgei-ds-unit-5-1', gapNote: 'Detailed subtopic-level mapping remains in 07-UNIT-5.1-APP-COVERAGE-MAP.md; lesson readiness remains review.' },
  { sourceId: '5.2', sourceTitle: 'Python for scientific work', sourceKind: 'topic', priority: 'Core', disposition: 'mapped-partial', appUnitId: 'cgei-ds-unit-5-2', gapNote: 'Draft lesson content exists; each manuscript subtopic still needs explicit evidence links and review.' },
  { sourceId: '5.3', sourceTitle: 'Exploration and visualisation', sourceKind: 'topic', priority: 'Core', disposition: 'mapped-partial', appUnitId: 'cgei-ds-unit-5-3', gapNote: 'Draft lesson content exists; validate diagnostics, honest figures, maps/time support and non-claims against the source.' },
  { sourceId: '5.4', sourceTitle: 'Introductory statistics', sourceKind: 'topic', priority: 'Core', disposition: 'mapped-partial', appUnitId: 'cgei-ds-unit-5-4', gapNote: 'Draft lesson content exists; trace sampling, intervals/tests, effect sizes and regression diagnostics individually.' },
  { sourceId: '5.5', sourceTitle: 'Data workflow and engineering basics', sourceKind: 'topic', priority: 'Core', disposition: 'mapped-partial', appUnitId: 'cgei-ds-unit-5-5', gapNote: 'Draft lesson content exists; trace workflows, SQL/joins, APIs, provenance and reproducible evidence individually.' },
  { sourceId: '5.6', sourceTitle: 'Intermediate inference and modelling', sourceKind: 'topic', priority: 'Core', disposition: 'source-only', gapNote: 'No accepted source-item-level app mapping recorded.' },
  { sourceId: '5.7', sourceTitle: 'Time-series analysis', sourceKind: 'topic', priority: 'Core', disposition: 'source-only', gapNote: 'Core for the climate track; needs dependence-aware trends, temporal validation and explicit limitations.' },
  { sourceId: '5.8', sourceTitle: 'Multivariate analysis for climate and EO', sourceKind: 'topic', priority: 'Support', disposition: 'source-only', gapNote: 'Needs explicit area weighting, sign ambiguity, reconstruction and synthetic validation evidence.' },
  { sourceId: '5.9', sourceTitle: 'Generalised, mixed and Bayesian models', sourceKind: 'topic', priority: 'Support', disposition: 'source-only', gapNote: 'Needs numeric examples and method-appropriate diagnostics, not descriptions alone.' },
  { sourceId: '5.10', sourceTitle: 'Causal inference for observational data', sourceKind: 'topic', priority: 'Support', disposition: 'source-only', gapNote: 'Needs design reasoning, DAGs and claim-language practice.' },
  { sourceId: '5.11', sourceTitle: 'Research software practice', sourceKind: 'topic', priority: 'Core', disposition: 'source-only', gapNote: 'Core priority; needs tests, environments, provenance and clean-rerun evidence mapped to actual lessons.' },
  { sourceId: '5.12', sourceTitle: 'Multidimensional and pipeline computing', sourceKind: 'topic', priority: 'Support', disposition: 'source-only', gapNote: 'Defer until core foundations and project need are established.' },
  { sourceId: '5.depth-checks', sourceTitle: 'Competence checks, failure modes, references and exit deliverable', sourceKind: 'assessment', priority: 'Core', disposition: 'candidate-match', gapNote: 'Map each check to a specific assessment, rubric, resource or deliverable; do not make the whole D section a pseudo-lesson.' },
];

export interface CrosswalkValidationIssue {
  code: string;
  message: string;
  sourceId?: string;
}

/**
 * Validate crosswalk identity and references without treating candidate matches
 * or source-only rows as coverage. Call this from tests/CI with the canonical
 * registry and the authoritative source inventory.
 */
export function validateSourceCrosswalk(
  entries: SourceCrosswalkEntry[],
  registry: {
    subjects: CurriculumSubject[];
    units: CurriculumUnit[];
    lessons: CurriculumLesson[];
  },
): CrosswalkValidationIssue[] {
  const issues: CrosswalkValidationIssue[] = [];
  const seen = new Set<string>();
  const lessonsById = new Map(registry.lessons.map((lesson) => [lesson.id, lesson]));
  const unitsById = new Map(registry.units.map((unit) => [unit.id, unit]));
  const subject5 = registry.subjects.find((subject) => subject.subjectId === 'cgei-data-science');

  for (const entry of entries) {
    if (!entry.sourceId.trim() || !entry.sourceTitle.trim()) {
      issues.push({ code: 'SOURCE_IDENTITY_MISSING', message: 'Every source row needs a stable ID and verbatim title.', sourceId: entry.sourceId });
    }
    if (seen.has(entry.sourceId)) {
      issues.push({ code: 'DUPLICATE_SOURCE_ID', message: 'Source IDs must be unique.', sourceId: entry.sourceId });
    }
    seen.add(entry.sourceId);

    if (entry.appUnitId && !unitsById.has(entry.appUnitId)) {
      issues.push({ code: 'UNKNOWN_APP_UNIT', message: `Mapped unit does not exist: ${entry.appUnitId}`, sourceId: entry.sourceId });
    }
    if (entry.appLessonId && !lessonsById.has(entry.appLessonId)) {
      issues.push({ code: 'UNKNOWN_APP_LESSON', message: `Mapped lesson does not exist: ${entry.appLessonId}`, sourceId: entry.sourceId });
    }
    if (entry.disposition === 'not-a-lesson' && entry.appLessonId) {
      issues.push({ code: 'NON_LESSON_MAPPED_AS_LESSON', message: 'Orientation/metadata rows cannot map to a lesson.', sourceId: entry.sourceId });
    }
    if (entry.disposition === 'mapped-and-taught') {
      if (!entry.appUnitId && !entry.appLessonId) {
        issues.push({ code: 'MAPPED_WITHOUT_TARGET', message: 'Mapped coverage requires a canonical unit or lesson target.', sourceId: entry.sourceId });
      }
      if (entry.appLessonId) {
        const lesson = lessonsById.get(entry.appLessonId);
        if (lesson && lesson.content.length === 0) {
          issues.push({ code: 'MAPPED_WITHOUT_CONTENT', message: 'A taught mapping requires substantive content blocks.', sourceId: entry.sourceId });
        }
        if (lesson && lesson.readiness !== 'review' && lesson.readiness !== 'validated' && lesson.readiness !== 'released') {
          issues.push({ code: 'READINESS_BELOW_TAUGHT', message: `Mapped-and-taught item points to lesson at readiness ${lesson.readiness}.`, sourceId: entry.sourceId });
        }
      }
    }
    if (entry.disposition === 'candidate-match' && (entry.evidenceBlockIds?.length || entry.activityIds?.length || entry.assessmentIds?.length)) {
      // Evidence may be recorded during review, but candidates do not count as coverage.
      // This issue is deliberately informational and does not promote the disposition.
    }
  }

  if (!subject5) {
    issues.push({ code: 'SUBJECT_5_MISSING', message: 'Canonical Subject 5 is absent from the registry.' });
  } else {
    const overviewIds = new Set(['cgei-data-science-roadmap', 'cgei-ds-roadmap', 'cgei-data-science-overview']);
    for (const lesson of registry.lessons) {
      if (overviewIds.has(lesson.id) || /\broadmap\b|subject overview/i.test(lesson.title)) {
        issues.push({ code: 'OVERVIEW_AS_LESSON', message: `Subject overview/roadmap must not be registered as a lesson: ${lesson.id}`, sourceId: lesson.id });
      }
    }
  }

  return issues;
}

/** Candidate and source-only rows never inflate the coverage numerator. */
export function getCrosswalkCoverage(entries: SourceCrosswalkEntry[]) {
  const covered = entries.filter((entry) => entry.disposition === 'mapped-and-taught').length;
  const partial = entries.filter((entry) => entry.disposition === 'mapped-partial').length;
  const unresolved = entries.filter((entry) => ['candidate-match', 'source-only', 'deferred-by-priority'].includes(entry.disposition)).length;
  const notLessons = entries.filter((entry) => entry.disposition === 'not-a-lesson').length;
  return { total: entries.length, covered, partial, unresolved, notLessons };
}
