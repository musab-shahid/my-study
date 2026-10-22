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
});
