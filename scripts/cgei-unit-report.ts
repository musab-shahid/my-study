/**
 * Read-only CGEI unit completeness report.
 *
 *   npm run report:cgei-unit -- --unit cgei-cl-unit-2-4
 *   npm run report:cgei-unit -- --unit cgei-cl-unit-2-4 --to review
 *   npm run report:cgei-unit -- --unit cgei-cl-unit-2-4 --to validated --json
 *
 * The report never edits curriculum data. Draft creation is not gated; a
 * promotion check runs only when --to review or --to validated is requested.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';
import { questions as envSystems } from '../src/data/cgei/env-systems/questions-env-systems';
import { questions as climateScience } from '../src/data/cgei/climate-science/questions-climate-science';
import { questions as geospatial } from '../src/data/cgei/geospatial/questions-geospatial';
import { questions as remoteSensing } from '../src/data/cgei/remote-sensing/questions-remote-sensing';
import { questions as dataScience } from '../src/data/cgei/data-science/questions-data-science';
import { questions as mlGeoai } from '../src/data/cgei/ml-geoai/questions-ml-geoai';
import { questions as climateRisk } from '../src/data/cgei/climate-risk/questions-climate-risk';
import { questions as researchPractice } from '../src/data/cgei/research-practice/questions-research-practice';
import { questions as decisionSupport } from '../src/data/cgei/decision-support/questions-decision-support';
import { questions as climatePolicy } from '../src/data/cgei/climate-policy/questions-climate-policy';
import { questions as softwareEngineering } from '../src/data/cgei/software-engineering/questions-software-engineering';
import { questions as advancedAi } from '../src/data/cgei/advanced-ai/questions-advanced-ai';
import { questions as capstone } from '../src/data/cgei/capstone/questions-capstone';
import { parseCsv, summarizeQuestionCoverage } from './lib/cgei-unit-report-core';

const allQuestions = [
  ...envSystems, ...climateScience, ...geospatial, ...remoteSensing, ...dataScience,
  ...mlGeoai, ...climateRisk, ...researchPractice, ...decisionSupport, ...climatePolicy,
  ...softwareEngineering, ...advancedAi, ...capstone,
];
const root = process.cwd();
const arg = (name: string): string | undefined => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 && process.argv[i + 1] && !process.argv[i + 1]!.startsWith('--') ? process.argv[i + 1] : undefined;
};
const unitId = arg('unit');
const target = arg('to');
const jsonOutput = process.argv.includes('--json');
if (!unitId) throw new Error('Usage: npm run report:cgei-unit -- --unit <unitId> [--to review|validated] [--json]');
if (target && target !== 'review' && target !== 'validated') throw new Error('--to must be review or validated');

const unit = cgeiCurriculum.units.find((item) => item.id === unitId);
if (!unit) throw new Error(`Unknown CGEI unit: ${unitId}`);
const subject = cgeiCurriculum.subjects.find((item) => item.unitIds.includes(unit.id));
if (!subject) throw new Error(`Unit ${unit.id} has no registered parent subject`);

const lessonById = new Map(cgeiCurriculum.lessons.map((item) => [item.id, item]));
const lessons = unit.lessonIds.map((id) => lessonById.get(id)).filter((item): item is NonNullable<typeof item> => Boolean(item));
const lessonIds = new Set(lessons.map((lesson) => lesson.id));
const unitQuestions = allQuestions.filter((question) => question.lessonId && lessonIds.has(question.lessonId));
const questionsByLesson = new Map<string, typeof unitQuestions>();
for (const lesson of lessons) questionsByLesson.set(lesson.id, unitQuestions.filter((question) => question.lessonId === lesson.id));

const unique = (values: string[]) => [...new Set(values)];
const activityIds = unique([...unit.activityIds, ...lessons.flatMap((lesson) => lesson.activityIds)]);
const assessmentIds = unique([...unit.assessmentIds, ...lessons.flatMap((lesson) => lesson.assessmentIds)]);
const activityById = new Map(cgeiCurriculum.activities.map((item) => [item.id, item]));
const assessmentById = new Map(cgeiCurriculum.assessments.map((item) => [item.id, item]));
const resourceById = new Map(cgeiCurriculum.resources.map((item) => [item.id, item]));
const deliverableById = new Map(cgeiCurriculum.deliverables.map((item) => [item.id, item]));
const projectLinks = cgeiCurriculum.projects.filter((project) => project.prerequisiteUnitIds?.includes(unit.id));
const activityResourceIds = activityIds.flatMap((id) => [
  ...(activityById.get(id)?.resourceIds ?? []),
  ...(activityById.get(id)?.solutionResourceId ? [activityById.get(id)!.solutionResourceId!] : []),
]);
const projectResourceIds = projectLinks.flatMap((project) => project.resourceIds ?? []);
const resourceIds = unique([...unit.resourceIds, ...lessons.flatMap((lesson) => lesson.resourceIds), ...activityResourceIds, ...projectResourceIds, ...subject.resourceIds]);
const deliverableIds = unique([...unit.deliverableIds, ...lessons.flatMap((lesson) => lesson.deliverableIds ?? [])]);
const competencyById = new Map(cgeiCurriculum.competencies.map((item) => [item.id, item]));
const rubricById = new Map(cgeiCurriculum.rubrics.map((item) => [item.id, item]));
const outcomeIds = new Set([...subject.outcomes, ...unit.outcomes, ...lessons.flatMap((lesson) => lesson.objectives)].map((outcome) => outcome.id));
const questionIds = new Set(allQuestions.map((question) => question.id));
const unresolved = {
  lessonIds: unit.lessonIds.filter((id) => !lessonById.has(id)),
  activityIds: activityIds.filter((id) => !activityById.has(id)),
  assessmentIds: assessmentIds.filter((id) => !assessmentById.has(id)),
  resourceIds: resourceIds.filter((id) => !resourceById.has(id)),
  deliverableIds: deliverableIds.filter((id) => !deliverableById.has(id)),
  activityObjectiveIds: activityIds.flatMap((id) => activityById.get(id)?.objectiveIds ?? []).filter((id) => !outcomeIds.has(id)),
  assessmentObjectiveIds: assessmentIds.flatMap((id) => assessmentById.get(id)?.objectiveIds ?? []).filter((id) => !outcomeIds.has(id)),
  assessmentQuestionIds: assessmentIds.flatMap((id) => assessmentById.get(id)?.questionIds ?? []).filter((id) => !questionIds.has(id)),
  assessmentActivityIds: assessmentIds.flatMap((id) => assessmentById.get(id)?.activityIds ?? []).filter((id) => !activityById.has(id)),
  activityResourceIds: activityResourceIds.filter((id) => !resourceById.has(id)),
  projectResourceIds: projectResourceIds.filter((id) => !resourceById.has(id)),
};
const objectiveCompetencyIds = unique([
  ...subject.outcomes.flatMap((outcome) => outcome.competencyIds ?? []),
  ...unit.outcomes.flatMap((outcome) => outcome.competencyIds ?? []),
  ...lessons.flatMap((lesson) => lesson.objectives.flatMap((outcome) => outcome.competencyIds ?? [])),
]);
const missingCompetencies = objectiveCompetencyIds.filter((id) => !competencyById.has(id));
const linkedRubricIds = unique([
  ...assessmentIds.flatMap((id) => assessmentById.get(id)?.rubricId ? [assessmentById.get(id)!.rubricId!] : []),
  ...projectLinks.flatMap((project) => project.rubricId ? [project.rubricId] : []),
  ...deliverableIds.flatMap((id) => deliverableById.get(id)?.rubricId ? [deliverableById.get(id)!.rubricId!] : []),
]);
const missingRubrics = linkedRubricIds.filter((id) => !rubricById.has(id));

const tracePath = resolve(root, 'docs/cgei/ALL-units-subtopic-traceability.csv');
const traceRows = existsSync(tracePath) ? parseCsv(readFileSync(tracePath, 'utf8')) : [];
const unitTraceRows = traceRows.filter((row) => row.source_subtopic_path?.startsWith(`${unit.code}.`));
const coreTraceRows = unitTraceRows.filter((row) => row.priority?.toLowerCase() === 'core');
const countDispositions = (rows: typeof unitTraceRows) => rows.reduce<Record<string, number>>((counts, row) => {
  const key = row.disposition || 'missing';
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});
const dispositionCounts = countDispositions(coreTraceRows);
const supportTraceRows = unitTraceRows.filter((row) => row.priority?.toLowerCase() === 'support');
const supportDispositionCounts = countDispositions(supportTraceRows);
const traceabilityGaps = coreTraceRows.filter((row) => {
  const disposition = row.disposition?.toLowerCase();
  if (!disposition || disposition === 'unmapped' || disposition === 'stale_mapping') return true;
  if (!row.evidence_note?.trim()) return true;
  if (disposition === 'mapped' || disposition === 'mapped_partial') {
    const lesson = row.app_lesson_id ? lessonById.get(row.app_lesson_id) : undefined;
    if (!lesson) return true;
    const blockIds = (row.app_content_block_ids ?? '').split(';').map((id) => id.trim()).filter(Boolean);
    const liveBlockIds = new Set(lesson.content.map((block) => block.id));
    if (!blockIds.length || blockIds.some((id) => !liveBlockIds.has(id))) return true;
  }
  return false;
});
const partialCore = coreTraceRows.filter((row) => row.disposition === 'mapped_partial');

const fixtureDir = resolve(root, 'fixtures/cgei');
const codeSlug = unit.code.toLowerCase().replace(/[^a-z0-9]/g, '_');
const fixtureFiles = existsSync(fixtureDir)
  ? readdirSync(fixtureDir).filter((name) => name.startsWith(`unit_${codeSlug}_`) && name.endsWith('_check.py')).sort()
  : [];
const contentText = lessons.map((lesson) => JSON.stringify(lesson.content)).join('\n');
const fixtureReferences = unique([...contentText.matchAll(/unit_[a-z0-9_]+_check\.py/g)].map((match) => match[0]));
const missingFixtureReferences = fixtureReferences.filter((name) => !existsSync(join(fixtureDir, name)));

const lessonReports = lessons.map((lesson) => {
  const qs = questionsByLesson.get(lesson.id) ?? [];
  const coverage = summarizeQuestionCoverage(qs);
  const contentKinds = lesson.content.reduce<Record<string, number>>((counts, block) => {
    counts[block.kind] = (counts[block.kind] ?? 0) + 1;
    return counts;
  }, {});
  const text = JSON.stringify(lesson.content);
  return {
    id: lesson.id,
    title: lesson.title,
    readiness: lesson.readiness,
    readinessEvidencePresent: Boolean(lesson.readinessEvidence),
    readinessEvidence: lesson.readinessEvidence ?? null,
    objectives: lesson.objectives.length,
    contentBlocks: lesson.content.length,
    contentKinds,
    questions: coverage,
    activityIds: lesson.activityIds,
    assessmentIds: lesson.assessmentIds,
    resourceIds: lesson.resourceIds,
    deliverableIds: lesson.deliverableIds ?? [],
    hasPlaceholderText: /\b(?:TODO|FIXME|TBD|LOREM\s+IPSUM)\b/i.test(text),
  };
});

const reviewBlockers: string[] = [];
if (!unit.outcomes.length) reviewBlockers.push('Unit has no measurable outcomes.');
if (!unit.lessonIds.length) reviewBlockers.push('Unit has no lessons.');
for (const lesson of lessons) {
  const report = lessonReports.find((item) => item.id === lesson.id)!;
  if (!lesson.objectives.length) reviewBlockers.push(`${lesson.id}: no learning objectives.`);
  if (!lesson.content.some((block) => block.kind === 'prose')) reviewBlockers.push(`${lesson.id}: no prose teaching block.`);
  if (!lesson.content.some((block) => block.kind === 'worked-example' || block.kind === 'code')) {
    reviewBlockers.push(`${lesson.id}: no worked example or executable/code block.`);
  }
  if (report.questions.total < 3) reviewBlockers.push(`${lesson.id}: ${report.questions.total}/3 lesson-linked questions.`);
  if (Object.keys(report.questions.cognitiveLevels).filter((level) => level !== 'unspecified').length < 2) {
    reviewBlockers.push(`${lesson.id}: fewer than two cognitive levels.`);
  }
  if (report.questions.applyOrHigher < 1) reviewBlockers.push(`${lesson.id}: no apply-or-higher question.`);
  if (report.questions.missingCitations > 0) reviewBlockers.push(`${lesson.id}: ${report.questions.missingCitations} questions lack a specific source citation.`);
  if (report.hasPlaceholderText) reviewBlockers.push(`${lesson.id}: lesson content contains TODO/FIXME/TBD placeholder text.`);
}
if (Object.values(unresolved).some((values) => values.length)) reviewBlockers.push('One or more lesson/activity/assessment/resource/deliverable references do not resolve.');
if (missingCompetencies.length) reviewBlockers.push(`Unknown competency references: ${missingCompetencies.join(', ')}.`);
if (missingRubrics.length) reviewBlockers.push(`Unknown rubric references: ${missingRubrics.join(', ')}.`);
if (!unitTraceRows.length) reviewBlockers.push('No source-TOC traceability rows found for this unit.');
if (traceabilityGaps.length) reviewBlockers.push(`${traceabilityGaps.length} Core traceability rows are unmapped, stale, or lack evidence notes.`);
if (missingFixtureReferences.length) reviewBlockers.push(`Missing referenced fixture files: ${missingFixtureReferences.join(', ')}.`);

const validatedBlockers = [...reviewBlockers];
if (partialCore.length) validatedBlockers.push(`${partialCore.length} Core traceability rows remain mapped_partial.`);
const evidence = unit.readinessEvidence;
if (!evidence?.reviewer?.trim()) validatedBlockers.push('Validated readiness requires a named reviewer.');
if (!evidence?.reviewedOn || !/^\d{4}-\d{2}-\d{2}$/.test(evidence.reviewedOn)) validatedBlockers.push('Validated readiness requires reviewedOn in YYYY-MM-DD format.');
if (!evidence?.checksPassed?.length) validatedBlockers.push('Validated readiness requires recorded checksPassed.');
if (!evidence?.notes?.length) validatedBlockers.push('Validated readiness requires review notes and caveats.');
for (const lesson of lessons) {
  if (lesson.readiness !== 'validated' || !lesson.readinessEvidence) {
    validatedBlockers.push(`${lesson.id}: lesson must be validated with its own readiness evidence before the unit is validated.`);
  }
}

const report = {
  unit: { id: unit.id, code: unit.code, title: unit.title, readiness: unit.readiness, summary: unit.summary, estimatedHours: unit.estimatedHours },
  subject: { id: subject.subjectId, title: subject.title },
  sourceDocument: unit.sourceDocument ?? null,
  prerequisites: unit.prerequisites,
  outcomes: unit.outcomes,
  lessons: lessonReports,
  linkedRecords: {
    activities: activityIds.map((id) => activityById.get(id)).filter(Boolean),
    assessments: assessmentIds.map((id) => assessmentById.get(id)).filter(Boolean),
    resources: resourceIds.map((id) => resourceById.get(id)).filter(Boolean),
    deliverables: deliverableIds.map((id) => deliverableById.get(id)).filter(Boolean),
    rubrics: linkedRubricIds.map((id) => rubricById.get(id)).filter(Boolean),
    competencies: objectiveCompetencyIds.map((id) => competencyById.get(id)).filter(Boolean),
    projects: projectLinks,
  },
  references: { unresolved, missingCompetencies, missingRubrics },
  traceability: {
    rows: unitTraceRows.length,
    coreRows: coreTraceRows.length,
    supportRows: supportTraceRows.length,
    coreDispositions: dispositionCounts,
    supportDispositions: supportDispositionCounts,
    gaps: traceabilityGaps.slice(0, 20),
  },
  fixtures: { files: fixtureFiles, referenced: fixtureReferences, missingReferences: missingFixtureReferences },
  readiness: {
    current: unit.readiness,
    evidence: evidence ?? null,
    reviewPromotion: { complete: reviewBlockers.length === 0, blockers: reviewBlockers },
    validatedPromotion: { complete: validatedBlockers.length === 0, blockers: validatedBlockers },
  },
};

if (jsonOutput) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`CGEI UNIT REPORT — ${unit.code} · ${unit.title}`);
  console.log(`Subject: ${subject.title} | Current readiness: ${unit.readiness} | Lessons: ${lessons.length}/${unit.lessonIds.length}`);
  console.log(`Outcomes: ${unit.outcomes.length} | Activities: ${activityIds.length} | Assessments: ${assessmentIds.length} | Resources: ${resourceIds.length} | Deliverables: ${deliverableIds.length}`);
  console.log('\nLESSONS');
  for (const item of lessonReports) {
    console.log(`- ${item.id} — ${item.title} [${item.readiness}]`);
    console.log(`  Objectives: ${item.objectives} | Blocks: ${item.contentBlocks} ${JSON.stringify(item.contentKinds)}`);
    console.log(`  Questions: ${item.questions.total}; levels ${JSON.stringify(item.questions.cognitiveLevels)}; apply+: ${item.questions.applyOrHigher}; missing citations: ${item.questions.missingCitations}`);
  }
  console.log(`\nTRACEABILITY — ${unitTraceRows.length} rows; Core: ${coreTraceRows.length} ${JSON.stringify(dispositionCounts)}; Support: ${supportTraceRows.length} ${JSON.stringify(supportDispositionCounts)}`);
  console.log(`FIXTURES — ${fixtureFiles.length} files; explicit refs: ${fixtureReferences.length}; missing refs: ${missingFixtureReferences.length}`);
  console.log(`\nPROMOTION TO REVIEW: ${reviewBlockers.length ? 'BLOCKED' : 'PASS'} (${reviewBlockers.length} blockers)`);
  for (const item of reviewBlockers) console.log(`  - ${item}`);
  console.log(`PROMOTION TO VALIDATED: ${validatedBlockers.length ? 'BLOCKED' : 'PASS'} (${validatedBlockers.length} blockers)`);
}

if (target) {
  const blockers = target === 'review' ? reviewBlockers : validatedBlockers;
  if (!jsonOutput) console.log(`\nREQUESTED PROMOTION (${target}): ${blockers.length ? 'FAIL' : 'PASS'}`);
  if (blockers.length) process.exitCode = 1;
}
