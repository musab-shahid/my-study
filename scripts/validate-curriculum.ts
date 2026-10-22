/**
 * Validate the canonical curriculum registry and its compatibility bridge.
 * Run with: npx tsx --tsconfig tsconfig.app.json scripts/validate-curriculum.ts
 */
import { readFileSync } from 'node:fs';
import { cgeiCurriculum } from '../src/data/cgei/curriculum';
import { topicMetadata } from '../src/data/topic-metadata';
import { sections } from '../src/data/sections';

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
const questionIds = new Set(cgeiCurriculum.questions.map((question) => question.id));
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
const unitOrderValues = cgeiCurriculum.units.map((unit) => unit.order);
if (new Set(unitOrderValues).size !== unitOrderValues.length) errors.push('Curriculum units must have unique order values');
for (const unit of cgeiCurriculum.units) {
  const expectedOrder = Number(unit.code.slice(2));
  if (Number.isFinite(expectedOrder) && unit.order !== expectedOrder) {
    errors.push(`Unit ${unit.code} has order ${unit.order}; expected ${expectedOrder}`);
  }
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

/**
 * Validate the reviewed Subject 5.2 subtopic crosswalk against actual canonical
 * lesson/content-block IDs. This checks referential integrity, not pedagogy:
 * the CSV's explicit disposition and evidence note still require human review.
 */
const parseCsv = (input: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  const text = input.replace(/^\uFEFF/, '');
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(field);
      if (row.some((value) => value.length > 0)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
};

try {
  const crosswalkText = readFileSync(
    new URL('../docs/cgei/subject-5-unit-5-2-subtopic-traceability.csv', import.meta.url),
    'utf8',
  );
  const parsedRows = parseCsv(crosswalkText);
  const headers = parsedRows[0] ?? [];
  const values = parsedRows.slice(1);
  const records = values.map((valuesRow) =>
    Object.fromEntries(headers.map((header, index) => [header, valuesRow[index] ?? ''])) as Record<string, string>,
  );
  const expectedPaths = [
    '5.2.1.1', '5.2.1.2', '5.2.1.3', '5.2.1.4',
    '5.2.2.1', '5.2.2.2', '5.2.2.3', '5.2.2.4', '5.2.2.5',
    '5.2.3.1', '5.2.3.2', '5.2.3.3', '5.2.3.4', '5.2.3.5', '5.2.3.6', '5.2.3.7',
    '5.2.4.1', '5.2.4.2', '5.2.4.3', '5.2.4.4',
    '5.2.5.1', '5.2.5.2', '5.2.5.3',
  ];
  const paths = records.map((record) => record.source_subtopic_path);
  if (records.length !== expectedPaths.length) {
    errors.push(`Subject 5.2 crosswalk should contain ${expectedPaths.length} subtopics; found ${records.length}`);
  }
  if (new Set(paths).size !== paths.length) errors.push('Subject 5.2 crosswalk contains duplicate source subtopic paths');
  for (const path of expectedPaths) {
    if (!paths.includes(path)) errors.push(`Subject 5.2 crosswalk is missing source subtopic ${path}`);
  }
  for (const record of records) {
    const path = record.source_subtopic_path;
    const lessonId = record.app_lesson_id;
    if (!lessonIds.has(lessonId)) errors.push(`Crosswalk ${path} references unknown lesson ID: ${lessonId}`);
    const parentTopic = path.split('.').slice(0, 3).join('.');
    if (record.parent_topic_path !== parentTopic) {
      errors.push(`Crosswalk ${path} has incorrect parent topic ${record.parent_topic_path}; expected ${parentTopic}`);
    }
    const blockIds = record.app_content_block_ids.split(';').filter(Boolean);
    if (['mapped', 'mapped_partial'].includes(record.disposition) && blockIds.length === 0) {
      errors.push(`Crosswalk ${path} claims ${record.disposition} without content-block evidence`);
    }
    for (const blockId of blockIds) {
      if (!contentBlockIds.has(blockId)) errors.push(`Crosswalk ${path} references unknown content block ID: ${blockId}`);
    }
  }
} catch (error) {
  errors.push(`Could not validate Subject 5.2 subtopic crosswalk: ${String(error)}`);
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
const unit55 = cgeiCurriculum.units.find((unit) => unit.code === '5.5');
const unit56 = cgeiCurriculum.units.find((unit) => unit.code === '5.6');
const unit57 = cgeiCurriculum.units.find((unit) => unit.code === '5.7');
const unit58 = cgeiCurriculum.units.find((unit) => unit.code === '5.8');
const unit59 = cgeiCurriculum.units.find((unit) => unit.code === '5.9');
const unit510 = cgeiCurriculum.units.find((unit) => unit.code === '5.10');
const unit511 = cgeiCurriculum.units.find((unit) => unit.code === '5.11');
const unit512 = cgeiCurriculum.units.find((unit) => unit.code === '5.12');
if (!subject5 || !unit51) errors.push('Subject 5 or Unit 5.1 registry entry is missing');
if (subject5 && subject5.unitIds.length !== 12) errors.push(`Subject 5 should list the 12 instructional units; capstone is a separate project; found ${subject5.unitIds.length}`);
if (unit51 && unit51.lessonIds.length !== 8) errors.push(`Unit 5.1 should map 8 substantive lessons; found ${unit51.lessonIds.length}`);
if (unit52 && unit52.lessonIds.length !== 5) errors.push(`Unit 5.2 should map 5 substantive lessons; found ${unit52.lessonIds.length}`);
if (unit53 && unit53.lessonIds.length !== 5) errors.push(`Unit 5.3 should map 5 substantive lessons; found ${unit53.lessonIds.length}`);
if (unit54 && unit54.lessonIds.length !== 5) errors.push(`Unit 5.4 should map 5 substantive lessons; found ${unit54.lessonIds.length}`);
if (unit55 && unit55.lessonIds.length !== 5) errors.push(`Unit 5.5 should map 5 substantive lessons; found ${unit55.lessonIds.length}`);
if (unit52 && cgeiCurriculum.questions.filter((question) => unit52.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.2 should include at least ten lesson-linked curriculum knowledge checks');
if (unit53 && cgeiCurriculum.questions.filter((question) => unit53.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.3 should include at least ten lesson-linked curriculum knowledge checks');
if (unit54 && cgeiCurriculum.questions.filter((question) => unit54.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.4 should include at least ten lesson-linked curriculum knowledge checks');
if (unit55 && cgeiCurriculum.questions.filter((question) => unit55.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.5 should include at least ten lesson-linked curriculum knowledge checks');
if (unit52 && unit52.readiness === 'released') errors.push('Unit 5.2 cannot be released before example execution and instructional review');
if (unit53 && unit53.readiness === 'released') errors.push('Unit 5.3 cannot be released before example execution and instructional review');
if (unit54 && unit54.readiness === 'released') errors.push('Unit 5.4 cannot be released before example execution and instructional review');
if (unit55 && unit55.readiness === 'released') errors.push('Unit 5.5 cannot be released before workflow fixture execution and licensing/security review');
if (unit56 && unit56.lessonIds.length !== 5) errors.push(`Unit 5.6 should map 5 substantive lessons; found ${unit56.lessonIds.length}`);
if (unit56 && cgeiCurriculum.questions.filter((question) => unit56.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.6 should include at least ten lesson-linked knowledge checks');
if (unit56 && unit56.readiness === 'released') errors.push('Unit 5.6 cannot be released before blocked-validation examples and instructional review');
if (unit57 && unit57.lessonIds.length !== 5) errors.push(`Unit 5.7 should map 5 substantive lessons; found ${unit57.lessonIds.length}`);
if (unit57 && cgeiCurriculum.questions.filter((question) => unit57.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.7 should include at least ten lesson-linked knowledge checks');
if (unit57 && unit57.readiness === 'released') errors.push('Unit 5.7 cannot be released before time-series fixture execution and UI review');
if (unit58 && unit58.lessonIds.length !== 5) errors.push(`Unit 5.8 should map 5 substantive lessons; found ${unit58.lessonIds.length}`);
if (unit58 && cgeiCurriculum.questions.filter((question) => unit58.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.8 should include at least ten lesson-linked knowledge checks');
if (unit58 && unit58.readiness === 'released') errors.push('Unit 5.8 cannot be released before weighted EOF examples and instructional/UI review');
if (unit59 && unit59.lessonIds.length !== 5) errors.push(`Unit 5.9 should map 5 substantive lessons; found ${unit59.lessonIds.length}`);
if (unit59 && cgeiCurriculum.questions.filter((question) => unit59.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.9 should include at least ten lesson-linked knowledge checks');
if (unit59 && unit59.readiness === 'released') errors.push('Unit 5.9 cannot be released before executed GLM/mixed/Bayesian examples and instructional/UI review');
if (unit510 && unit510.lessonIds.length !== 5) errors.push(`Unit 5.10 should map 5 substantive lessons; found ${unit510.lessonIds.length}`);
if (unit510 && cgeiCurriculum.questions.filter((question) => unit510.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.10 should include at least ten lesson-linked knowledge checks');
if (unit510 && unit510.readiness === 'released') errors.push('Unit 5.10 cannot be released before causal-identification examples, design-specific checks and scientific/UI review');
if (unit511 && unit511.lessonIds.length !== 5) errors.push(`Unit 5.11 should map 5 substantive lessons; found ${unit511.lessonIds.length}`);
if (unit511 && cgeiCurriculum.questions.filter((question) => unit511.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.11 should include at least ten lesson-linked knowledge checks');
if (unit511 && unit511.readiness === 'released') errors.push('Unit 5.11 cannot be released before clean-environment execution, test review and scientific/UI review');
if (unit512 && unit512.lessonIds.length !== 5) errors.push(`Unit 5.12 should map 5 substantive lessons; found ${unit512.lessonIds.length}`);
if (unit512 && cgeiCurriculum.questions.filter((question) => unit512.lessonIds.includes(question.lessonId)).length < 10) errors.push('Unit 5.12 should include at least ten lesson-linked knowledge checks');
if (unit512 && unit512.readiness === 'released') errors.push('Unit 5.12 cannot be released before eager/lazy comparison, coordinate/metadata validation and scientific/UI review');
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
