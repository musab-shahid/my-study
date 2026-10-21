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
const ids = new Set<string>();
const register = (kind: string, records: Array<{ id: string }>) => {
  for (const record of records) {
    if (ids.has(record.id)) errors.push(`Duplicate curriculum ID across registry: ${record.id} (${kind})`);
    ids.add(record.id);
  }
};
const questionIds = new Set(dataScienceQuestions.map((question) => question.id));
const topicIds = new Set(topicMetadata.map((topic) => topic.id));
const sectionIds = new Set(sections.map((section) => section.id));
const subjectIds = new Set(cgeiCurriculum.subjects.map((subject) => subject.subjectId));
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
}
for (const lesson of cgeiCurriculum.lessons) {
  if (lesson.sourceTopicId && !topicIds.has(lesson.sourceTopicId)) errors.push(`Lesson ${lesson.id} references missing legacy topic ${lesson.sourceTopicId}`);
  if (!lesson.sourceTopicId && lesson.content.length === 0) errors.push(`Lesson ${lesson.id} has neither content blocks nor a legacy content bridge`);
  checkRefs(`Lesson ${lesson.id} activities`, lesson.activityIds, activityIds);
  checkRefs(`Lesson ${lesson.id} assessments`, lesson.assessmentIds, assessmentIds);
  checkRefs(`Lesson ${lesson.id} resources`, lesson.resourceIds, resourceIds);
  checkRefs(`Lesson ${lesson.id} deliverables`, lesson.deliverableIds ?? [], deliverableIds);
  for (const outcome of lesson.objectives) checkRefs(`Lesson ${lesson.id} objective competencies`, outcome.competencyIds ?? [], competencyIds);
}
for (const activity of cgeiCurriculum.activities) {
  checkRefs(`Activity ${activity.id} objectives`, activity.objectiveIds, new Set([
    ...cgeiCurriculum.subjects.flatMap((subject) => subject.outcomes.map((outcome) => outcome.id)),
    ...cgeiCurriculum.units.flatMap((unit) => unit.outcomes.map((outcome) => outcome.id)),
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
if (!subject5 || !unit51) errors.push('Subject 5 or Unit 5.1 registry entry is missing');
if (subject5 && subject5.unitIds.length !== 13) errors.push(`Subject 5 should list 12 units plus capstone unit; found ${subject5.unitIds.length}`);
if (unit51 && unit51.lessonIds.length !== 8) errors.push(`Unit 5.1 should map 8 substantive lessons; found ${unit51.lessonIds.length}`);
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
