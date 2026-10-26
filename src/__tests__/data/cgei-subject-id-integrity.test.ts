import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';
import { subjects as appSubjects } from '../../data/subjects.ts';
import { cgeiIndexUnits, cgeiIndexLessons } from '../../data/cgei/curriculum-index.ts';
import { CGEI_OVERVIEW_TOPIC_BY_SUBJECT, isCgeiOverviewTopic } from '../../data/cgei/overview.ts';
import { sections } from '../../data/sections.ts';

/** Canonical CGEI subject IDs declared in the app registry. */
const APP_CGEI_SUBJECT_IDS = new Set(
  appSubjects.filter((s) => s.track === 'cgei').map((s) => s.id),
);

/** Canonical subject IDs declared on curriculum subject records. */
const CURRICULUM_SUBJECT_IDS = new Set(
  cgeiCurriculum.subjects.map((s) => s.subjectId),
);

describe('CGEI subject-ID integrity', () => {
  it('every curriculum subjectId exists in the app subject registry', () => {
    for (const subject of cgeiCurriculum.subjects) {
      assert.ok(
        APP_CGEI_SUBJECT_IDS.has(subject.subjectId),
        `curriculum subject ${subject.id} uses unknown app subjectId ${subject.subjectId}`,
      );
    }
  });

  it('when unit.subjectId is present it is a registered curriculum subjectId', () => {
    for (const unit of cgeiCurriculum.units) {
      if (unit.subjectId === undefined) continue;
      assert.ok(
        CURRICULUM_SUBJECT_IDS.has(unit.subjectId),
        `unit ${unit.id} references unknown subjectId ${unit.subjectId}`,
      );
      assert.ok(
        APP_CGEI_SUBJECT_IDS.has(unit.subjectId),
        `unit ${unit.id} subjectId ${unit.subjectId} is not in app registry`,
      );
    }
  });

  it('every unit is reachable from exactly one curriculum subject membership', () => {
    const owners = new Map<string, string[]>();
    for (const subject of cgeiCurriculum.subjects) {
      for (const unitId of subject.unitIds) {
        const list = owners.get(unitId) ?? [];
        list.push(subject.subjectId);
        owners.set(unitId, list);
      }
    }
    for (const unit of cgeiCurriculum.units) {
      const parentIds = owners.get(unit.id) ?? [];
      assert.equal(
        parentIds.length,
        1,
        `unit ${unit.id} must belong to exactly one subject; found ${parentIds.join(',') || 'none'}`,
      );
      if (unit.subjectId !== undefined) {
        assert.equal(
          unit.subjectId,
          parentIds[0],
          `unit ${unit.id} subjectId ${unit.subjectId} disagrees with parent membership ${parentIds[0]}`,
        );
      }
    }
  });

  it('rejects known short-form aliases that previously leaked into unit records', () => {
    const banned = new Set(['cgei-climate', 'cgei-ai', 'cgei-research']);
    for (const unit of cgeiCurriculum.units) {
      assert.ok(
        !banned.has(unit.subjectId as string),
        `unit ${unit.id} still uses banned short-form subjectId ${unit.subjectId}`,
      );
    }
  });

  it('curriculum-index unit subjectIds match parent membership in the full registry', () => {
    const unitById = new Map(cgeiCurriculum.units.map((u) => [u.id, u]));
    const ownerByUnit = new Map<string, string>();
    for (const subject of cgeiCurriculum.subjects) {
      for (const unitId of subject.unitIds) ownerByUnit.set(unitId, subject.subjectId);
    }
    for (const indexUnit of cgeiIndexUnits) {
      const full = unitById.get(indexUnit.id);
      assert.ok(full, `index unit ${indexUnit.id} missing from curriculum.ts`);
      const parentSubjectId = ownerByUnit.get(indexUnit.id);
      assert.ok(parentSubjectId, `index unit ${indexUnit.id} has no parent subject membership`);
      assert.equal(
        indexUnit.subjectId,
        parentSubjectId,
        `index unit ${indexUnit.id} subjectId ${indexUnit.subjectId} != parent ${parentSubjectId}`,
      );
      if (full!.subjectId !== undefined) {
        assert.equal(full!.subjectId, parentSubjectId);
      }
    }
  });

  it('curriculum-index lesson subjectIds are registered', () => {
    for (const lesson of cgeiIndexLessons) {
      assert.ok(
        APP_CGEI_SUBJECT_IDS.has(lesson.subjectId),
        `index lesson ${lesson.id} has unknown subjectId ${lesson.subjectId}`,
      );
    }
  });

  it('domain orientation map keys are valid app subject IDs', () => {
    for (const subjectId of Object.keys(CGEI_OVERVIEW_TOPIC_BY_SUBJECT)) {
      assert.ok(
        APP_CGEI_SUBJECT_IDS.has(subjectId),
        `overview map key ${subjectId} is not an app CGEI subject`,
      );
    }
  });

  it('legacy CGEI section IDs remain stable compatibility identifiers', () => {
    const legacyClimate = ['CGEI-02', 'CGEI-024', 'CGEI-025'];
    for (const id of legacyClimate) {
      const section = sections.find((s) => s.id === id);
      assert.ok(section, `expected legacy section ${id} to remain in sections.ts`);
      assert.equal(section!.subjectId, 'cgei-climate-science');
    }
  });

  it('overview topic IDs are classified as orientation, not lessons', () => {
    for (const topicId of Object.values(CGEI_OVERVIEW_TOPIC_BY_SUBJECT)) {
      assert.ok(isCgeiOverviewTopic(topicId), `${topicId} should be an overview topic`);
    }
  });
});
