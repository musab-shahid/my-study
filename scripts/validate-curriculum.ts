/**
 * Validate the canonical curriculum registry and its compatibility bridge.
 * Run with: npx tsx --tsconfig tsconfig.app.json scripts/validate-curriculum.ts
 */
import { cgeiCurriculum } from '../src/data/cgei/curriculum';
import { topicMetadata } from '../src/data/topic-metadata';
import { sections } from '../src/data/sections';
import { questions as dataScienceQuestions } from '../src/data/cgei/data-science/questions-data-science';

const errors: string[] = [];
const warnings: string[] = [];
if (cgeiCurriculum.schemaVersion !== 2) errors.push(`Expected curriculum schema version 2; found ${cgeiCurriculum.schemaVersion}`);
const ids = new Set<string>();
const register = (kind: string, records: Array<{ id: string }>) => {
  for (const record of records) {
    if (ids.has(record.id)) errors.push(`Duplicate curriculum ID across registry: ${record.id} (${kind})`);
    ids.add(record.id);
  }
};
const questionIds = new Set([...dataScienceQuestions.map((question) => question.id), ...cgeiCurriculum.questions.map((question) => question.id)]);
const topicIds = new Set(topicMetadata.map((topic) => topic.id));
const sectionIds = new Set(sections.map((section) => section.id));
const unitIds = new Set(cgeiCurriculum.units.map((unit) => unit.id));
const lessonIds = new Set(cgeiCurriculum.lessons.map((lesson) => lesson.id));
const competencyIds = new Set(cgeiCurriculum.competencies.map((item) => item.id));
const resourceIds = new Set(cgeiCurriculum.resources.map((item) => item.id));
const activityIds = new Set(cgeiCurriculum.activities.map((item) => item.id));
const assessmentIds = new Set(cgeiCurriculum.assessments.map((item) => item.id));
const rubricIds = new Set(cgeiCurriculum.rubrics.map((item) => item.id));
const deliverableIds = new Set(cgeiCurriculum.deliverables.map((item) => item.id));
const projectIds = new Set(cgeiCurriculum.projects.map((item) => item.id));

register('track', cgeiCurriculum.tracks);
register('subject', cgeiCurriculum.subjects);
register('unit', cgeiCurriculum.units);
register('lesson', cgeiCurriculum.lessons);
register('question', cgeiCurriculum.questions);
register('competency', cgeiCurriculum.competencies);
register('resource', cgeiCurriculum.resources);
register('activity', cgeiCurriculum.activities);
register('assessment', cgeiCurriculum.assessments);
register('rubric', cgeiCurriculum.rubrics);
register('deliverable', cgeiCurriculum.deliverables);
register('project', cgeiCurriculum.projects);

const checkRefs = (label: string, refs: string[], valid: Set<string>) => {
  for (const ref of refs) if (!valid.has(ref)) errors.push(`${label} references unknown ID: ${ref}`);
};

for (const track of cgeiCurriculum.tracks) {
  checkRefs(`Track ${track.id} recommendedOrder`, track.recommendedOrder, new Set(track.subjectIds));
  if (!track.subjectIds.includes('cgei-data-science')) errors.push(`Track ${track.id} omits Subject 5`);
}
for (const subject of cgeiCurriculum.subjects) {
  if (!cgeiCurriculum.tracks.some((track) => track.subjectIds.includes(subject.subjectId))) {
    errors.push(`Subject ${subject.id} is not assigned to a curriculum track`);
  }
  checkRefs(`Subject ${subject.id} units`, subject.unitIds, unitIds);
  checkRefs(`Subject ${subject.id} projects`, subject.projectIds, projectIds);
  checkRefs(`Subject ${subject.id} competencies`, subject.competencyIds, competencyIds);
  checkRefs(`Subject ${subject.id} resources`, subject.resourceIds, resourceIds);
  for (const outcome of subject.outcomes) checkRefs(`Outcome ${outcome.id} competencies`, outcome.competencyIds ?? [], competencyIds);
}
for (const unit of cgeiCurriculum.units) {
  checkRefs(`Unit ${unit.id} lessons`, unit.lessonIds, lessonIds);
  checkRefs(`Unit ${unit.id} activities`, unit.activityIds, activityIds);
  checkRefs(`Unit ${unit.id} assessments`, unit.assessmentIds, assessmentIds);
  checkRefs(`Unit ${unit.id} resources`, unit.resourceIds, resourceIds);
  checkRefs(`Unit ${unit.id} deliverables`, unit.deliverableIds, deliverableIds);
  if (unit.legacySectionId && !sectionIds.has(unit.legacySectionId)) errors.push(`Unit ${unit.id} maps to missing legacy section ${unit.legacySectionId}`);
  if (unit.lessonIds.length === 0 && unit.readiness !== 'planned' && unit.kind !== 'orientation') {
    warnings.push(`Unit ${unit.code} has no lessons but readiness is ${unit.readiness}`);
  }
  const orders = unit.lessonIds.map((id) => cgeiCurriculum.lessons.find((lesson) => lesson.id === id)?.order);
  if (orders.some((order) => order === undefined)) errors.push(`Unit ${unit.id} has a lesson with no record`);
  const presentOrders = orders.filter((order): order is number => order !== undefined);
  if (new Set(presentOrders).size !== presentOrders.length) errors.push(`Unit ${unit.id} has duplicate lesson order values`);
}
const contentBlockIds = new Set<string>();
const bridgedTopicIds = new Set<string>();
for (const lesson of cgeiCurriculum.lessons) {
  if (lesson.sourceTopicId && !topicIds.has(lesson.sourceTopicId)) errors.push(`Lesson ${lesson.id} references missing legacy topic ${lesson.sourceTopicId}`);
  if (lesson.sourceTopicId && bridgedTopicIds.has(lesson.sourceTopicId)) errors.push(`More than one lesson bridges to legacy topic ${lesson.sourceTopicId}`);
  if (lesson.sourceTopicId) bridgedTopicIds.add(lesson.sourceTopicId);
  if (lesson.content.length === 0 && !lesson.sourceTopicId) errors.push(`Lesson ${lesson.id} has neither content blocks nor a legacy content bridge`);
  if (lesson.sourceTopicId && lesson.content.length === 0) errors.push(`Migrated lesson ${lesson.id} has no canonical content blocks`);
  for (const block of lesson.content) {
    if (contentBlockIds.has(block.id)) errors.push(`Duplicate content block ID: ${block.id}`);
    contentBlockIds.add(block.id);
    if (['prose', 'worked-example'].includes(block.kind) && !block.body?.trim()) errors.push(`Content block ${block.id} (${block.kind}) requires body text`);
    if (['key-points', 'checklist'].includes(block.kind) && !block.items?.length) errors.push(`Content block ${block.id} (${block.kind}) requires items`);
    if (block.kind === 'equation' && !block.expression?.trim()) errors.push(`Equation block ${block.id} requires an expression`);
    if (block.kind === 'table' && !block.headers?.length && !block.rows?.length) errors.push(`Table block ${block.id} requires headers or rows`);
    if (block.kind === 'code' && !block.code?.trim() && !block.body?.trim()) errors.push(`Code block ${block.id} requires code or body`);
    if (['callout', 'reflection'].includes(block.kind) && !block.body?.trim() && !block.items?.length) errors.push(`Content block ${block.id} (${block.kind}) requires body text or items`);
    if (block.kind === 'figure' && !block.body?.trim() && !block.caption?.trim()) errors.push(`Figure block ${block.id} requires a description or caption`);
  }
  checkRefs(`Lesson ${lesson.id} activities`, lesson.activityIds, activityIds);
  checkRefs(`Lesson ${lesson.id} assessments`, lesson.assessmentIds, assessmentIds);
  checkRefs(`Lesson ${lesson.id} resources`, lesson.resourceIds, resourceIds);
  checkRefs(`Lesson ${lesson.id} deliverables`, lesson.deliverableIds ?? [], deliverableIds);
  for (const outcome of lesson.objectives) checkRefs(`Lesson ${lesson.id} objective competencies`, outcome.competencyIds ?? [], competencyIds);
}
for (const question of cgeiCurriculum.questions) {
  checkRefs(`Curriculum question ${question.id} lesson`, [question.lessonId], lessonIds);
  if (question.options.length < 2) errors.push(`Curriculum question ${question.id} needs at least two options`);
  if (!Number.isInteger(question.correctAnswer) || question.correctAnswer < 0 || question.correctAnswer >= question.options.length) errors.push(`Curriculum question ${question.id} has an invalid correctAnswer index`);
  if (!question.explanation.trim()) errors.push(`Curriculum question ${question.id} requires an explanation`);
}
for (const activity of cgeiCurriculum.activities) {
  checkRefs(`Activity ${activity.id} objectives`, activity.objectiveIds, new Set([
    ...cgeiCurriculum.subjects.flatMap((subject) => subject.outcomes.map((outcome) => outcome.id)),
    ...cgeiCurriculum.units.flatMap((unit) => unit.outcomes.map((outcome) => outcome.id)),
    ...cgeiCurriculum.lessons.flatMap((lesson) => lesson.objectives.map((outcome) => outcome.id)),
  ]));
  checkRefs(`Activity ${activity.id} resources`, activity.resourceIds ?? [], resourceIds);
  if (activity.solutionResourceId && !resourceIds.has(activity.solutionResourceId)) errors.push(`Activity ${activity.id} has missing solution resource ${activity.solutionResourceId}`);
}
for (const assessment of cgeiCurriculum.assessments) {
  checkRefs(`Assessment ${assessment.id} objectives`, assessment.objectiveIds, new Set([
    ...cgeiCurriculum.subjects.flatMap((subject) => subject.outcomes.map((outcome) => outcome.id)),
    ...cgeiCurriculum.units.flatMap((unit) => unit.outcomes.map((outcome) => outcome.id)),
  ]));
  checkRefs(`Assessment ${assessment.id} questions`, assessment.questionIds ?? [], questionIds);
  checkRefs(`Assessment ${assessment.id} activities`, assessment.activityIds ?? [], activityIds);
  if (assessment.rubricId && !rubricIds.has(assessment.rubricId)) errors.push(`Assessment ${assessment.id} has missing rubric ${assessment.rubricId}`);
  if (assessment.passThreshold !== undefined && (assessment.passThreshold < 0 || assessment.passThreshold > 1)) errors.push(`Assessment ${assessment.id} passThreshold must be in [0,1]`);
}
for (const project of cgeiCurriculum.projects) {
  checkRefs(`Project ${project.id} prerequisites`, project.prerequisiteUnitIds ?? [], unitIds);
  checkRefs(`Project ${project.id} objectives`, project.objectiveIds, new Set(cgeiCurriculum.subjects.flatMap((subject) => subject.outcomes.map((outcome) => outcome.id))));
  checkRefs(`Project ${project.id} resources`, project.resourceIds ?? [], resourceIds);
  if (project.rubricId && !rubricIds.has(project.rubricId)) errors.push(`Project ${project.id} has missing rubric ${project.rubricId}`);
  for (const milestone of project.milestones) checkRefs(`Milestone ${milestone.id} deliverables`, milestone.deliverableIds, deliverableIds);
}
for (const rubric of cgeiCurriculum.rubrics) {
  const weight = rubric.criteria.reduce((sum, criterion) => sum + criterion.weight, 0);
  if (Math.abs(weight - 100) > 1e-9) errors.push(`Rubric ${rubric.id} weights sum to ${weight}, not 100`);
  for (const criterion of rubric.criteria) {
    if (criterion.levels.length !== 4) errors.push(`Rubric criterion ${criterion.id} must define four performance levels`);
    if (criterion.levels.some((level) => level.points < 0 || level.points > criterion.weight)) errors.push(`Rubric criterion ${criterion.id} has points outside its weight`);
  }
}
const subject5 = cgeiCurriculum.subjects.find((subject) => subject.subjectId === 'cgei-data-science');
const unit51 = cgeiCurriculum.units.find((unit) => unit.code === '5.1');
const unit52 = cgeiCurriculum.units.find((unit) => unit.code === '5.2');
const unit53 = cgeiCurriculum.units.find((unit) => unit.code === '5.3');
const unit54 = cgeiCurriculum.units.find((unit) => unit.code === '5.4');
if (!subject5 || !unit51) errors.push('Subject 5 or Unit 5.1 registry entry is missing');
if (subject5 && subject5.unitIds.length !== 12) errors.push(`Subject 5 should list the 12 instructional units; capstone is a separate project; found ${subject5.unitIds.length}`);
if (unit51 && unit51.lessonIds.length !== 8) errors.push(`Unit 5.1 should map 8 substantive lessons; found ${unit51.lessonIds.length}`);
if (unit52 && unit52.lessonIds.length !== 5) errors.push(`Unit 5.2 should map 5 substantive lessons; found ${unit52.lessonIds.length}`);
if (unit53 && unit53.lessonIds.length !== 5) errors.push(`Unit 5.3 should map 5 substantive lessons; found ${unit53.lessonIds.length}`);
if (unit54 && unit54.lessonIds.length !== 5) errors.push(`Unit 5.4 should map 5 substantive lessons; found ${unit54.lessonIds.length}`);
if (unit52 && cgeiCurriculum.questions.filter((question) => unit52.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.2 should include at least ten lesson-linked curriculum knowledge checks');
if (unit53 && cgeiCurriculum.questions.filter((question) => unit53.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.3 should include at least ten lesson-linked curriculum knowledge checks');
if (unit54 && cgeiCurriculum.questions.filter((question) => unit54.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.4 should include at least ten lesson-linked curriculum knowledge checks');
if (unit52 && unit52.readiness === 'released') errors.push('Unit 5.2 cannot be released before example execution and instructional review');
if (unit53 && unit53.readiness === 'released') errors.push('Unit 5.3 cannot be released before example execution and instructional review');
if (unit54 && unit54.readiness === 'released') errors.push('Unit 5.4 cannot be released before example execution and instructional review');
if (topicIds.has('cgei-data-science-roadmap')) errors.push('Course roadmap must not be registered as a lesson topic');
if (sectionIds.has('CGEI-05')) errors.push('Roadmap pseudo-section should not remain in legacy unit navigation');

if (errors.length) {
  console.error(`CGEI curriculum validation failed: ${errors.length} error(s)`);
  for (const error of errors) console.error(`  ERROR: ${error}`);
  for (const warning of warnings) console.warn(`  WARN: ${warning}`);
  process.exitCode = 1;
} else {
  console.log(`CGEI curriculum validation passed: ${cgeiCurriculum.subjects.length} curriculum subject, ${cgeiCurriculum.units.length} units, ${cgeiCurriculum.lessons.length} lessons, ${cgeiCurriculum.activities.length} activities, ${cgeiCurriculum.assessments.length} assessments, ${cgeiCurriculum.projects.length} project.`);
  for (const warning of warnings) console.warn(`  WARN: ${warning}`);
}
