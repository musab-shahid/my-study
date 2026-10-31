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
import { hasSubstantiveContentBlock, hasSubstantiveText, validateReadinessEvidence } from '../src/data/cgei/readiness';

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

const lessonById = new Map(cgeiCurriculum.lessons.map((item) => [item.id, item] as const));
const lessons = unit.lessonIds.map((id) => lessonById.get(id)).filter((item): item is NonNullable<typeof item> => Boolean(item));
const lessonIds = new Set(lessons.map((lesson) => lesson.id));
const unitQuestions = allQuestions.filter((question) => question.lessonId && lessonIds.has(question.lessonId));
const questionsByLesson = new Map<string, typeof unitQuestions>();
for (const lesson of lessons) questionsByLesson.set(lesson.id, unitQuestions.filter((question) => question.lessonId === lesson.id));

const unique = (values: string[]) => [...new Set(values)];
const assessmentIds = unique([...unit.assessmentIds, ...lessons.flatMap((lesson) => lesson.assessmentIds)]);
const activityById = new Map(cgeiCurriculum.activities.map((item) => [item.id, item] as const));
const assessmentById = new Map(cgeiCurriculum.assessments.map((item) => [item.id, item] as const));
const activityIds = unique([
  ...unit.activityIds,
  ...lessons.flatMap((lesson) => lesson.activityIds),
  ...assessmentIds.flatMap((id) => assessmentById.get(id)?.activityIds ?? []),
]);
const resourceById = new Map(cgeiCurriculum.resources.map((item) => [item.id, item] as const));
const deliverableById = new Map(cgeiCurriculum.deliverables.map((item) => [item.id, item] as const));
const projectLinks = cgeiCurriculum.projects.filter((project) => project.prerequisiteUnitIds?.includes(unit.id));
const activityResourceIds = activityIds.flatMap((id) => [
  ...(activityById.get(id)?.resourceIds ?? []),
  ...(activityById.get(id)?.solutionResourceId ? [activityById.get(id)!.solutionResourceId!] : []),
]);
const projectResourceIds = projectLinks.flatMap((project) => project.resourceIds ?? []);
const resourceIds = unique([...unit.resourceIds, ...lessons.flatMap((lesson) => lesson.resourceIds), ...activityResourceIds, ...projectResourceIds, ...subject.resourceIds]);
const deliverableIds = unique([...unit.deliverableIds, ...lessons.flatMap((lesson) => lesson.deliverableIds ?? [])]);
const competencyById = new Map(cgeiCurriculum.competencies.map((item) => [item.id, item] as const));
const rubricById = new Map(cgeiCurriculum.rubrics.map((item) => [item.id, item] as const));
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
  questionObjectiveIds: unitQuestions.flatMap((question) => question.objectiveIds ?? []).filter((id) => !outcomeIds.has(id)),
  activityResourceIds: activityResourceIds.filter((id) => !resourceById.has(id)),
  projectResourceIds: projectResourceIds.filter((id) => !resourceById.has(id)),
};
const objectiveCompetencyIds = unique([
  ...subject.competencyIds,
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
const subjectNumber = subject.id.match(/cgei-subject-(\d+)/)?.[1];
const preferredTraceFile = subjectNumber
  ? `subject-${subjectNumber}-unit-${unit.code}-subtopic-traceability.csv`
  : '';
const alternateTraceFile = subjectNumber
  ? `subject-${subjectNumber}-unit-${unit.code.replace(/\./g, '-')}-subtopic-traceability.csv`
  : '';
const preferredRows = traceRows.filter((row) => row.source_file === preferredTraceFile);
const alternateRows = traceRows.filter((row) => row.source_file === alternateTraceFile);
const unitTraceRows = preferredRows.length
  ? preferredRows
  : alternateRows.length
    ? alternateRows
    : traceRows.filter((row) => !row.source_file && row.source_subtopic_path?.startsWith(`${unit.code}.`));
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
    const lesson = row.app_lesson_id && lessonIds.has(row.app_lesson_id)
      ? lessonById.get(row.app_lesson_id)
      : undefined;
    if (!lesson) return true;
    const blockIds = (row.app_content_block_ids ?? '').split(';').map((id) => id.trim()).filter(Boolean);
    if (!blockIds.length || blockIds.some((id) =>
      !lesson.content.some((block) => block.id === id && hasSubstantiveContentBlock(block)),
    )) return true;
  }
  return false;
});
const nonMappedCore = coreTraceRows.filter((row) => row.disposition?.toLowerCase() !== 'mapped');


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
  const text = JSON.stringify(lesson.content) ?? '';
  const lessonFixtureReferences = unique([...text.matchAll(/unit_[a-z0-9_]+_check\.py/g)].map((match) => match[0]));
  const substantiveContentBlocks = lesson.content.filter(hasSubstantiveContentBlock).length;
  const nonSubstantiveContentBlockIds = lesson.content.filter((block) => !hasSubstantiveContentBlock(block)).map((block) => block.id);
  const objectiveIssues = lesson.objectives
    .filter((objective) => !hasSubstantiveText(objective.statement) || !hasSubstantiveText(objective.action))
    .map((objective) => objective.id);
  const textValues = lesson.content.flatMap((block) => [
    block.body, block.expression, block.code, block.caption, ...(block.items ?? []),
  ]).filter((value): value is string => typeof value === 'string' && value.trim().length > 0);
  const hasPlaceholderText = textValues.some((value) => !hasSubstantiveText(value));
  const hasQuantitativeExample = lesson.content.some((block) =>
    block.kind === 'worked-example' && /\d/.test(`${block.body ?? ''} ${block.expression ?? ''} ${block.code ?? ''}`),
  );
  return {
    id: lesson.id,
    title: lesson.title,
    readiness: lesson.readiness,
    readinessEvidencePresent: Boolean(lesson.readinessEvidence),
    readinessEvidence: lesson.readinessEvidence ?? null,
    objectives: lesson.objectives.length,
    objectiveIds: lesson.objectives.map((outcome) => outcome.id),
    contentBlocks: lesson.content.length,
    substantiveContentBlocks,
    nonSubstantiveContentBlockIds,
    contentBlockIds: lesson.content.map((block) => block.id),
    questionIds: qs.map((question) => question.id),
    questionsDetail: qs.map((question) => ({
      id: question.id,
      type: question.type,
      difficulty: question.difficulty,
      cognitiveLevel: question.cognitiveLevel ?? null,
      sourceCitation: question.sourceCitation,
      objectiveIds: question.objectiveIds ?? [],
      tests: question.tests ?? null,
    })),
    objectiveIssues,
    hasQuantitativeExample,
    fixtureReferences: lessonFixtureReferences,
    contentKinds,
    questions: coverage,
    hasPlaceholderText,
    activityIds: lesson.activityIds,
    assessmentIds: lesson.assessmentIds,
    resourceIds: lesson.resourceIds,
    deliverableIds: lesson.deliverableIds ?? [],
    contentTextLength: text.length,
  };
});

const reviewBlockers: string[] = [];
if (!hasSubstantiveText(unit.summary)) reviewBlockers.push('Unit summary is empty or placeholder text.');
if (!unit.outcomes.length) reviewBlockers.push('Unit has no measurable outcomes.');
if (unit.outcomes.some((outcome) => !hasSubstantiveText(outcome.statement) || !hasSubstantiveText(outcome.action))) {
  reviewBlockers.push('One or more unit outcomes lack a substantive statement or observable action.');
}
if (new Set(unit.lessonIds).size !== unit.lessonIds.length) reviewBlockers.push('Unit lessonIds contains duplicates.');
if (!unit.lessonIds.length) reviewBlockers.push('Unit has no lessons.');
for (const lesson of lessons) {
  const report = lessonReports.find((item) => item.id === lesson.id)!;
  if (!lesson.objectives.length) reviewBlockers.push(`${lesson.id}: no learning objectives.`);
  if (report.objectiveIssues.length) reviewBlockers.push(`${lesson.id}: incomplete/placeholder objectives: ${report.objectiveIssues.join(', ')}.`);
  if (report.substantiveContentBlocks === 0) reviewBlockers.push(`${lesson.id}: no substantive instructional content blocks.`);
  if (!lesson.content.some((block) => block.kind === 'prose' && hasSubstantiveContentBlock(block))) reviewBlockers.push(`${lesson.id}: no substantive prose teaching block.`);
  if (!lesson.content.some((block) => block.kind === 'worked-example' || block.kind === 'code')) {
    reviewBlockers.push(`${lesson.id}: no worked example or executable/code block.`);
  }
  if (report.questions.total < 3) reviewBlockers.push(`${lesson.id}: ${report.questions.total}/3 lesson-linked questions.`);
  if (Object.keys(report.questions.cognitiveLevels).filter((level) => level !== 'unspecified').length < 2) {
    reviewBlockers.push(`${lesson.id}: fewer than two cognitive levels.`);
  }
  if (report.questions.applyOrHigher < 1) reviewBlockers.push(`${lesson.id}: no apply-or-higher question.`);
  if (report.questions.missingCitations > 0) reviewBlockers.push(`${lesson.id}: ${report.questions.missingCitations} questions lack a specific source citation.`);
  if (report.hasQuantitativeExample && fixtureFiles.length === 0) reviewBlockers.push(`${lesson.id}: quantitative worked example has no unit-scoped fixture file.`);
  if (report.hasPlaceholderText) reviewBlockers.push(`${lesson.id}: lesson content contains placeholder/draft text.`);
}
if (Object.values(unresolved).some((values) => values.length)) reviewBlockers.push('One or more lesson/activity/assessment/resource/deliverable references do not resolve.');
if (missingCompetencies.length) reviewBlockers.push(`Unknown competency references: ${missingCompetencies.join(', ')}.`);
if (missingRubrics.length) reviewBlockers.push(`Unknown rubric references: ${missingRubrics.join(', ')}.`);
if (!unitTraceRows.length) reviewBlockers.push('No source-TOC traceability rows found for this unit.');
if (traceabilityGaps.length) reviewBlockers.push(`${traceabilityGaps.length} Core traceability rows are unmapped, stale, or lack evidence notes.`);
if (missingFixtureReferences.length) reviewBlockers.push(`Missing referenced fixture files: ${missingFixtureReferences.join(', ')}.`);

const validatedBlockers = [...reviewBlockers];
if (nonMappedCore.length) {
  const counts = countDispositions(nonMappedCore);
  validatedBlockers.push(`Validated readiness requires every Core source leaf to be fully mapped; remaining dispositions: ${JSON.stringify(counts)}.`);
}
const evidence = unit.readinessEvidence;
validatedBlockers.push(...validateReadinessEvidence('validated', evidence, `Unit ${unit.id}`));
for (const lesson of lessons) {
  if (!['validated', 'released'].includes(lesson.readiness)) {
    validatedBlockers.push(`${lesson.id}: lesson must be validated/released with its own readiness evidence before the unit is validated.`);
    continue;
  }
  validatedBlockers.push(...validateReadinessEvidence('validated', lesson.readinessEvidence, `Lesson ${lesson.id}`));
}

const report = {
  unit: { id: unit.id, code: unit.code, title: unit.title, readiness: unit.readiness, summary: unit.summary, estimatedHours: unit.estimatedHours },
  subject: { id: subject.subjectId, title: subject.title },
  sourceDocument: unit.sourceDocument ?? null,
  prerequisites: unit.prerequisites,
  outcomes: unit.outcomes,
  lessons: lessonReports,
  linkedRecords: {
    activities: activityIds.flatMap((id) => activityById.get(id) ? [activityById.get(id)!] : []),
    assessments: assessmentIds.flatMap((id) => assessmentById.get(id) ? [assessmentById.get(id)!] : []),
    resources: resourceIds.flatMap((id) => resourceById.get(id) ? [resourceById.get(id)!] : []),
    deliverables: deliverableIds.flatMap((id) => deliverableById.get(id) ? [deliverableById.get(id)!] : []),
    rubrics: linkedRubricIds.flatMap((id) => rubricById.get(id) ? [rubricById.get(id)!] : []),
    competencies: objectiveCompetencyIds.flatMap((id) => competencyById.get(id) ? [competencyById.get(id)!] : []),
    projects: projectLinks,
  },
  references: { unresolved, missingCompetencies, missingRubrics },
  traceability: {
    sourceFile: preferredRows.length ? preferredTraceFile : alternateRows.length ? alternateTraceFile : null,
    rowCount: unitTraceRows.length,
    items: unitTraceRows.map((row) => ({
      sourcePath: row.source_subtopic_path,
      title: row.source_subtopic_title,
      priority: row.priority,
      lessonId: row.app_lesson_id || null,
      contentBlockIds: (row.app_content_block_ids ?? '').split(';').map((id) => id.trim()).filter(Boolean),
      disposition: row.disposition || 'missing',
      evidenceNote: row.evidence_note || '',
    })),
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
    console.log(`  Question IDs: ${item.questionsDetail.map((question) => `${question.id} [${question.type}/${question.difficulty}/${question.cognitiveLevel ?? 'unspecified'}]`).join(', ') || '(none)'}`);
    console.log(`  Substantive blocks: ${item.substantiveContentBlocks}/${item.contentBlocks}; non-substantive IDs: ${item.nonSubstantiveContentBlockIds.join(', ') || '(none)'}`);
    console.log(`  Quantitative example: ${item.hasQuantitativeExample ? 'yes' : 'no'} | fixtures: ${item.fixtureReferences.join(', ') || '(none)'}`);
  }
  console.log('\nLINKED RECORDS');
  for (const [kind, records] of Object.entries(report.linkedRecords)) {
    const summary = records.length ? records.map((item) => `${item.id}: ${item.title}`).join('; ') : '(none; optional unless the unit requires them)';
    console.log(`- ${kind}: ${summary}`);
  }
  const unresolvedEntries = Object.entries(unresolved).filter(([, values]) => values.length);
  console.log('\nUNRESOLVED REFERENCES');
  console.log(unresolvedEntries.length ? unresolvedEntries.map(([kind, values]) => `- ${kind}: ${values.join(', ')}`).join('\n') : '- none');
  if (missingCompetencies.length) console.log(`- competencies: ${missingCompetencies.join(', ')}`);
  if (missingRubrics.length) console.log(`- rubrics: ${missingRubrics.join(', ')}`);
  console.log(`\nTRACEABILITY — ${unitTraceRows.length} rows from ${report.traceability.sourceFile ?? 'aggregate fallback'}; Core: ${coreTraceRows.length} ${JSON.stringify(dispositionCounts)}; Support: ${supportTraceRows.length} ${JSON.stringify(supportDispositionCounts)}`);
  for (const row of traceabilityGaps.slice(0, 10)) console.log(`  - ${row.source_subtopic_path}: ${row.disposition || 'missing'} — ${row.evidence_note || 'no evidence note'}`);
  console.log(`FIXTURES — ${fixtureFiles.length} files: ${fixtureFiles.join(', ') || '(none)'}`);
  console.log(`  Explicit refs: ${fixtureReferences.join(', ') || '(none)'}; missing: ${missingFixtureReferences.join(', ') || '(none)'}`);
  console.log(`READINESS EVIDENCE — ${evidence?.reviewer || '(no reviewer)'} | ${evidence?.reviewedOn || '(no review date)'} | checks: ${evidence?.checksPassed?.length ?? 0} | notes: ${evidence?.notes?.length ?? 0}`);
  console.log(`\nREVIEW READINESS PREVIEW: ${reviewBlockers.length ? 'BLOCKED' : 'PASS'} (${reviewBlockers.length} blockers)`);
  for (const item of reviewBlockers) console.log(`  - ${item}`);
  console.log(`VALIDATED READINESS PREVIEW: ${validatedBlockers.length ? 'BLOCKED' : 'PASS'} (${validatedBlockers.length} blockers)`);
}

if (target) {
  const blockers = target === 'review' ? reviewBlockers : validatedBlockers;
  if (!jsonOutput) console.log(`\nREQUESTED PROMOTION (${target}): ${blockers.length ? 'FAIL' : 'PASS'}`);
  if (blockers.length) process.exitCode = 1;
}
