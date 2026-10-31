/**
 * Phase B3 — split cgeiCurriculum into per-subject topics-<subject>.ts modules.
 *
 * Usage (content freeze recommended):
 *   npx tsx --tsconfig tsconfig.app.json scripts/migrations/split-curriculum-by-subject.ts
 *   npx prettier --write src/data/cgei/<subject>/topics-<subject>.ts src/data/cgei/shared.ts src/data/cgei/curriculum.ts
 *
 * Writes:
 *   src/data/cgei/shared.ts (track + any shared resources if present)
 *   src/data/cgei/<folder>/topics-<folder>.ts for each curriculum subject
 *   src/data/cgei/curriculum-questions.ts (temporary flat questions array)
 *   Writes topics-<subject>.ts only (one topics + one questions file per subject).
 *
 * After review, replace curriculum.ts with the thin assembler printed at the end.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { cgeiCurriculum } from '../../src/data/cgei/curriculum';
import type {
  CurriculumSubject,
  CurriculumUnit,
  CurriculumLesson,
  CurriculumActivity,
  CurriculumAssessment,
  CurriculumResource,
  CurriculumDeliverable,
  CurriculumOutcome,
  CurriculumQuestion,
  CurriculumCompetency,
  CurriculumRubric,
  CurriculumProject,
} from '../../src/types/curriculum';

const ROOT = resolve(process.cwd(), 'src/data/cgei');

/** Map curriculum subjectId → folder name under src/data/cgei/ */
const SUBJECT_FOLDER: Record<string, string> = {
  'cgei-env-systems': 'env-systems',
  'cgei-climate-science': 'climate-science',
  'cgei-geospatial': 'geospatial',
  'cgei-remote-sensing': 'remote-sensing',
  'cgei-data-science': 'data-science',
  'cgei-ml-geoai': 'ml-geoai',
  'cgei-climate-risk': 'climate-risk',
  'cgei-research-practice': 'research-practice',
  'cgei-decision-support': 'decision-support',
  'cgei-climate-policy': 'climate-policy',
  'cgei-software-engineering': 'software-engineering',
  'cgei-advanced-ai': 'advanced-ai',
  'cgei-capstone': 'capstone',
  'cgei-advanced-branches': 'advanced-branches',
};

function stableStringify(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function exportConst(name: string, value: unknown, type?: string): string {
  const ann = type ? `: ${type}` : '';
  return `export const ${name}${ann} = ${stableStringify(value)} as const;\n`;
}

function subjectFolder(subjectId: string): string {
  return SUBJECT_FOLDER[subjectId] ?? subjectId.replace(/^cgei-/, '');
}

function write(path: string, body: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, body, 'utf8');
  console.log('wrote', path, createHash('sha256').update(body).digest('hex').slice(0, 12));
}

function main(): void {
  const registry = cgeiCurriculum;
  const units = registry.units ?? [];
  const lessons = registry.lessons ?? [];
  const activities = registry.activities ?? [];
  const assessments = registry.assessments ?? [];
  const resources = registry.resources ?? [];
  const deliverables = registry.deliverables ?? [];
  const questions = registry.questions ?? [];
  const subjects = registry.subjects ?? [];
  const competencies = registry.competencies ?? [];
  const rubrics = registry.rubrics ?? [];
  const projects = registry.projects ?? [];

  // Index lessons by unit via unit.lessonIds
  const lessonById = new Map(lessons.map((l) => [l.id, l]));
  const unitById = new Map(units.map((u) => [u.id, u]));

  // shared track
  const track = registry.tracks?.[0];
  if (track) {
    const sharedPath = join(ROOT, 'shared.ts');
    // Keep existing shared.ts if already authored; only write if missing
    if (!existsSync(sharedPath)) {
      write(
        sharedPath,
        `import type { CurriculumTrack } from '@/types/curriculum';\n\nexport const cgeiTrack: CurriculumTrack = ${stableStringify(track)};\n`,
      );
    }
  }

  write(
    join(ROOT, 'registry-shared.ts'),
    `import type { CurriculumCompetency, CurriculumRubric } from '@/types/curriculum';\n\nexport const competencies: CurriculumCompetency[] = ${stableStringify(competencies)};\nexport const rubrics: CurriculumRubric[] = ${stableStringify(rubrics)};\n`,
  );

  // Temporary flat questions
  write(
    join(ROOT, 'curriculum-questions.ts'),
    `import type { CurriculumQuestion } from '@/types/curriculum';\n\n/** Temporary flat projection; Phase C moves these into questions-<subject>.ts banks. */\nexport const curriculumQuestions: CurriculumQuestion[] = ${stableStringify(questions)};\n`,
  );

  for (const subject of subjects) {
    const folder = subjectFolder(subject.subjectId);
    const unitIds = new Set(subject.unitIds ?? []);
    const subjectUnits = units.filter((u) => unitIds.has(u.id) || u.subjectId === subject.subjectId);
    const subjectLessonIds = new Set(subjectUnits.flatMap((u) => u.lessonIds ?? []));
    const subjectLessons = lessons.filter((l) => subjectLessonIds.has(l.id));
    // activities/assessments referenced by units or lessons
    const activityIds = new Set(
      subjectUnits.flatMap((u) => u.activityIds ?? []).concat(subjectLessons.flatMap((l) => l.activityIds ?? [])),
    );
    const assessmentIds = new Set(
      subjectUnits.flatMap((u) => u.assessmentIds ?? []).concat(subjectLessons.flatMap((l) => l.assessmentIds ?? [])),
    );
    const subjectActivities = activities.filter((a) => activityIds.has(a.id));
    const subjectAssessments = assessments.filter((a) => assessmentIds.has(a.id));
    // outcomes on subject
    const outcomes = (subject as CurriculumSubject & { outcomes?: CurriculumOutcome[] }).outcomes ?? [];
    const resourceIds = new Set(
      subject.resourceIds
        .concat(subjectUnits.flatMap((unit) => unit.resourceIds ?? []))
        .concat(subjectLessons.flatMap((lesson) => lesson.resourceIds ?? [])),
    );
    const deliverableIds = new Set(
      subjectUnits.flatMap((unit) => unit.deliverableIds ?? [])
        .concat(subjectLessons.flatMap((lesson) => lesson.deliverableIds ?? [])),
    );
    const subjectResources = resources.filter((resource) => resourceIds.has(resource.id));
    const subjectProjects = projects.filter((project) => subject.projectIds.includes(project.id));
    // Deliverables can be referenced by units, lessons, or project milestones.
    // They may also be nested inside project.deliverables without appearing in
    // the top-level registry.deliverables array, so collect those too.
    const projectDeliverableIds = subjectProjects.flatMap((project) =>
      project.milestones.flatMap((milestone) => milestone.deliverableIds ?? []),
    );
    for (const id of projectDeliverableIds) deliverableIds.add(id);
    const embeddedDeliverables = subjectProjects.flatMap((project) => project.deliverables ?? []);
    const subjectDeliverables = [
      ...deliverables.filter((deliverable) => deliverableIds.has(deliverable.id)),
      ...embeddedDeliverables.filter((deliverable) => deliverableIds.has(deliverable.id) && !deliverables.some((d) => d.id === deliverable.id)),
    ];

    const fileName = `topics-${folder}.ts`;
    const outPath = join(ROOT, folder, fileName);
    const body = `/**
 * Canonical ${subject.title} module — generated by split-curriculum-by-subject.ts
 * Quiz-engine legacy topics (if any) live under ./legacy/
 */
import type {
  CurriculumSubject,
  CurriculumUnit,
  CurriculumLesson,
  CurriculumActivity,
  CurriculumAssessment,
  CurriculumOutcome,
  CurriculumResource,
  CurriculumDeliverable,
  CurriculumProject,
} from '@/types/curriculum';

${exportConst('subject', subject, 'CurriculumSubject')}
${exportConst('units', subjectUnits, 'CurriculumUnit[]')}
${exportConst('lessons', subjectLessons, 'CurriculumLesson[]')}
${exportConst('activities', subjectActivities, 'CurriculumActivity[]')}
${exportConst('assessments', subjectAssessments, 'CurriculumAssessment[]')}
${exportConst('outcomes', outcomes, 'CurriculumOutcome[]')}
${exportConst('resources', subjectResources, 'CurriculumResource[]')}
${exportConst('deliverables', subjectDeliverables, 'CurriculumDeliverable[]')}
${exportConst('projects', subjectProjects, 'CurriculumProject[]')}
`;
    write(outPath, body);
  }

  console.log('\nNext: point curriculum.ts at subject modules + shared + curriculum-questions.');
  console.log('Keep sourceTopicId on lessons; prefer static content over legacyTopicToBlocks.');
}

main();
