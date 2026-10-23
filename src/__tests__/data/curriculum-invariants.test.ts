import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';

describe('CGEI curriculum invariants', () => {
  it('keeps curriculum question IDs unique', () => {
    const ids = cgeiCurriculum.questions.map((question) => question.id);
    assert.equal(ids.length, new Set(ids).size);
  });

  it('requires every question to reference an existing lesson with a valid answer index', () => {
    const lessonIds = new Set(cgeiCurriculum.lessons.map((lesson) => lesson.id));
    for (const question of cgeiCurriculum.questions) {
      assert.ok(lessonIds.has(question.lessonId), `missing lesson for ${question.id}`);
      assert.ok(question.options.length >= 2, `${question.id} needs options`);
      assert.ok(
        Number.isInteger(question.correctAnswer)
          && question.correctAnswer >= 0
          && question.correctAnswer < question.options.length,
        `${question.id} has an invalid correctAnswer`,
      );
      assert.ok(question.explanation.trim().length > 0, `${question.id} needs an explanation`);
    }
  });

  it('keeps content-block IDs unique within each lesson', () => {
    for (const lesson of cgeiCurriculum.lessons) {
      const blockIds = lesson.content.map((block) => block.id);
      assert.equal(blockIds.length, new Set(blockIds).size, `duplicate block in ${lesson.id}`);
    }
  });

  it('keeps canonical subject, unit, and lesson navigation references resolvable', () => {
    const unitsById = new Map(cgeiCurriculum.units.map((unit) => [unit.id, unit]));
    const lessonsById = new Map(cgeiCurriculum.lessons.map((lesson) => [lesson.id, lesson]));
    const activities = new Set(cgeiCurriculum.activities.map((item) => item.id));
    const assessments = new Set(cgeiCurriculum.assessments.map((item) => item.id));
    const resources = new Set(cgeiCurriculum.resources.map((item) => item.id));
    const deliverables = new Set(cgeiCurriculum.deliverables.map((item) => item.id));
    const projects = new Set(cgeiCurriculum.projects.map((item) => item.id));

    for (const subject of cgeiCurriculum.subjects) {
      for (const unitId of subject.unitIds) {
        assert.ok(unitsById.has(unitId), `missing unit ${unitId} for ${subject.subjectId}`);
      }
      for (const projectId of subject.projectIds) {
        assert.ok(projects.has(projectId), `missing project ${projectId} for ${subject.subjectId}`);
      }
      for (const resourceId of subject.resourceIds) {
        assert.ok(resources.has(resourceId), `missing resource ${resourceId} for ${subject.subjectId}`);
      }
    }

    for (const unit of cgeiCurriculum.units) {
      for (const lessonId of unit.lessonIds) {
        assert.ok(lessonsById.has(lessonId), `missing lesson ${lessonId} for unit ${unit.id}`);
      }
      for (const id of unit.activityIds) assert.ok(activities.has(id), `missing activity ${id} for unit ${unit.id}`);
      for (const id of unit.assessmentIds) assert.ok(assessments.has(id), `missing assessment ${id} for unit ${unit.id}`);
      for (const id of unit.resourceIds) assert.ok(resources.has(id), `missing resource ${id} for unit ${unit.id}`);
      for (const id of unit.deliverableIds) assert.ok(deliverables.has(id), `missing deliverable ${id} for unit ${unit.id}`);
    }

    for (const lesson of cgeiCurriculum.lessons) {
      for (const id of lesson.activityIds) assert.ok(activities.has(id), `missing activity ${id} for lesson ${lesson.id}`);
      for (const id of lesson.assessmentIds) assert.ok(assessments.has(id), `missing assessment ${id} for lesson ${lesson.id}`);
      for (const id of lesson.resourceIds) assert.ok(resources.has(id), `missing resource ${id} for lesson ${lesson.id}`);
      for (const id of lesson.deliverableIds ?? []) assert.ok(deliverables.has(id), `missing deliverable ${id} for lesson ${lesson.id}`);
    }
  });
});
