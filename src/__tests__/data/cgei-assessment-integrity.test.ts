import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';
import { subjectsByTrack } from '../../data/subjects.ts';
import { topicMap } from '../../data/topics.ts';
import { hasSubstantiveLessonContent } from '../../data/cgei/readiness.ts';

describe('CGEI assessment and evidence integrity', () => {
  it('keeps lesson source-topic bridges valid and readiness claims evidence-based', () => {
    const topicIds = new Set(Object.keys(topicMap));
    for (const lesson of cgeiCurriculum.lessons) {
      if (lesson.sourceTopicId) {
        assert.ok(topicIds.has(lesson.sourceTopicId), `lesson ${lesson.id} references missing source topic ${lesson.sourceTopicId}`);
      }
      if (['review', 'validated', 'released'].includes(lesson.readiness)) {
        assert.ok(hasSubstantiveLessonContent(lesson), `lesson ${lesson.id} is marked ${lesson.readiness} without substantive content`);
      }
    }
  });

  it('keeps track subject membership and recommended order aligned', () => {
    const appSubjectIds = new Set(subjectsByTrack('cgei').map((subject) => subject.id));
    for (const track of cgeiCurriculum.tracks) {
      assert.equal(new Set(track.subjectIds).size, track.subjectIds.length, `duplicate subject in ${track.id}`);
      assert.equal(new Set(track.recommendedOrder).size, track.recommendedOrder.length, `duplicate recommendation in ${track.id}`);
      assert.deepEqual(
        [...track.subjectIds].sort(),
        [...track.recommendedOrder].sort(),
        `subject membership and recommended order differ for ${track.id}`,
      );
      for (const subjectId of track.subjectIds) {
        assert.ok(appSubjectIds.has(subjectId), `track subject ${subjectId} is not registered in the application`);
      }
    }
  });

  it('resolves assessment questions and objective references', () => {
    const questions = new Map(cgeiCurriculum.questions.map((question) => [question.id, question]));
    const outcomeIds = new Set([
      ...cgeiCurriculum.subjects.flatMap((subject) => subject.outcomes.map((outcome) => outcome.id)),
      ...cgeiCurriculum.units.flatMap((unit) => unit.outcomes.map((outcome) => outcome.id)),
      ...cgeiCurriculum.lessons.flatMap((lesson) => lesson.objectives.map((outcome) => outcome.id)),
    ]);
    const lessonIds = new Set(cgeiCurriculum.lessons.map((lesson) => lesson.id));
    const rubricIds = new Set(cgeiCurriculum.rubrics.map((rubric) => rubric.id));

    for (const assessment of cgeiCurriculum.assessments) {
      for (const questionId of assessment.questionIds ?? []) {
        const question = questions.get(questionId);
        assert.ok(question, `assessment ${assessment.id} references missing question ${questionId}`);
        assert.ok(lessonIds.has(question.lessonId), `question ${question.id} references missing lesson ${question.lessonId}`);
      }
      for (const objectiveId of assessment.objectiveIds) {
        assert.ok(outcomeIds.has(objectiveId), `assessment ${assessment.id} references missing outcome ${objectiveId}`);
      }
      if (assessment.rubricId) {
        assert.ok(rubricIds.has(assessment.rubricId), `assessment ${assessment.id} references missing rubric ${assessment.rubricId}`);
      }
    }
  });

  it('resolves activity objectives, resources and optional solution resources', () => {
    const outcomeIds = new Set([
      ...cgeiCurriculum.subjects.flatMap((subject) => subject.outcomes.map((outcome) => outcome.id)),
      ...cgeiCurriculum.units.flatMap((unit) => unit.outcomes.map((outcome) => outcome.id)),
      ...cgeiCurriculum.lessons.flatMap((lesson) => lesson.objectives.map((outcome) => outcome.id)),
    ]);
    const resourceIds = new Set(cgeiCurriculum.resources.map((resource) => resource.id));

    for (const activity of cgeiCurriculum.activities) {
      for (const objectiveId of activity.objectiveIds) {
        assert.ok(outcomeIds.has(objectiveId), `activity ${activity.id} references missing outcome ${objectiveId}`);
      }
      for (const resourceId of activity.resourceIds ?? []) {
        assert.ok(resourceIds.has(resourceId), `activity ${activity.id} references missing resource ${resourceId}`);
      }
      if (activity.solutionResourceId) {
        assert.ok(resourceIds.has(activity.solutionResourceId), `activity ${activity.id} references missing solution resource ${activity.solutionResourceId}`);
      }
    }
  });

  it('resolves rubric references and requires usable scoring criteria', () => {
    const rubricIds = new Set(cgeiCurriculum.rubrics.map((rubric) => rubric.id));
    const deliverableIds = new Set(cgeiCurriculum.deliverables.map((deliverable) => deliverable.id));
    const unitIds = new Set(cgeiCurriculum.units.map((unit) => unit.id));
    const outcomeIds = new Set([
      ...cgeiCurriculum.subjects.flatMap((subject) => subject.outcomes.map((outcome) => outcome.id)),
      ...cgeiCurriculum.units.flatMap((unit) => unit.outcomes.map((outcome) => outcome.id)),
      ...cgeiCurriculum.lessons.flatMap((lesson) => lesson.objectives.map((outcome) => outcome.id)),
    ]);

    for (const rubric of cgeiCurriculum.rubrics) {
      assert.ok(rubric.criteria.length > 0, `rubric ${rubric.id} has no criteria`);
      for (const criterion of rubric.criteria) {
        assert.ok(Number.isFinite(criterion.weight) && criterion.weight > 0, `rubric ${rubric.id} has invalid weight for ${criterion.id}`);
        assert.ok(criterion.levels.length >= 2, `criterion ${criterion.id} needs scoring levels`);
        assert.equal(new Set(criterion.levels.map((level) => level.level)).size, criterion.levels.length, `criterion ${criterion.id} has duplicate levels`);
      }
    }

    for (const deliverable of cgeiCurriculum.deliverables) {
      if (deliverable.rubricId) {
        assert.ok(rubricIds.has(deliverable.rubricId), `deliverable ${deliverable.id} references missing rubric ${deliverable.rubricId}`);
      }
    }

    for (const project of cgeiCurriculum.projects) {
      if (project.rubricId) {
        assert.ok(rubricIds.has(project.rubricId), `project ${project.id} references missing rubric ${project.rubricId}`);
      }
      for (const unitId of project.prerequisiteUnitIds ?? []) {
        assert.ok(unitIds.has(unitId), `project ${project.id} references missing prerequisite unit ${unitId}`);
      }
      for (const objectiveId of project.objectiveIds) {
        assert.ok(outcomeIds.has(objectiveId), `project ${project.id} references missing outcome ${objectiveId}`);
      }
      for (const milestone of project.milestones) {
        for (const deliverableId of milestone.deliverableIds) {
          assert.ok(deliverableIds.has(deliverableId), `milestone ${milestone.id} references missing deliverable ${deliverableId}`);
        }
      }
    }
  });
});
