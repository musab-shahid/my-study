import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';
import {
  cgeiIndexLessons,
  cgeiIndexLessonById,
  cgeiIndexUnits,
  cgeiIndexUnitById,
} from '../../data/cgei/curriculum-index.ts';

describe('CGEI lightweight curriculum index', () => {
  it('contains exactly the canonical unit and lesson IDs', () => {
    assert.deepEqual(
      [...cgeiIndexUnitById.keys()].sort(),
      cgeiCurriculum.units.map((unit) => unit.id).sort(),
    );
    assert.deepEqual(
      [...cgeiIndexLessonById.keys()].sort(),
      cgeiCurriculum.lessons.map((lesson) => lesson.id).sort(),
    );
  });

  it('keeps navigation titles and unit relationships aligned with the registry', () => {
    for (const unit of cgeiCurriculum.units) {
      const indexed = cgeiIndexUnitById.get(unit.id);
      assert.ok(indexed, `Missing index unit ${unit.id}`);
      assert.equal(indexed.title, unit.title, unit.id);
      assert.equal(indexed.code, unit.code, unit.id);
      assert.deepEqual([...indexed.lessonIds].sort(), [...unit.lessonIds].sort(), unit.id);
    }

    const canonicalUnitByLessonId = new Map(
      cgeiCurriculum.units.flatMap((unit) => unit.lessonIds.map((lessonId) => [lessonId, unit] as const)),
    );
    for (const lesson of cgeiCurriculum.lessons) {
      const indexed = cgeiIndexLessonById.get(lesson.id);
      const unit = canonicalUnitByLessonId.get(lesson.id);
      assert.ok(indexed, `Missing index lesson ${lesson.id}`);
      assert.ok(unit, `Canonical lesson has no parent unit: ${lesson.id}`);
      assert.equal(indexed.title, lesson.title, lesson.id);
      assert.equal(indexed.unitId, unit.id, lesson.id);
      assert.equal(indexed.unitTitle, unit.title, lesson.id);
    }
  });

  it('has no duplicate metadata IDs', () => {
    assert.equal(new Set(cgeiIndexUnits.map((unit) => unit.id)).size, cgeiIndexUnits.length);
    assert.equal(new Set(cgeiIndexLessons.map((lesson) => lesson.id)).size, cgeiIndexLessons.length);
  });
});
