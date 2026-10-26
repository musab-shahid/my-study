import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { CGEI_OVERVIEW_TOPIC_BY_SUBJECT, isCgeiOverviewTopic } from '../../data/cgei/overview.ts';
import { cgeiCurriculum } from '../../data/cgei/curriculum.ts';
import { sections } from '../../data/sections.ts';

describe('CGEI orientation and hierarchy presentation', () => {
  it('treats roadmap overview topics as non-lesson orientation records', () => {
    const overviewIds = Object.values(CGEI_OVERVIEW_TOPIC_BY_SUBJECT);
    assert.ok(overviewIds.length >= 12);
    for (const id of overviewIds) {
      assert.equal(isCgeiOverviewTopic(id), true);
    }
    assert.equal(isCgeiOverviewTopic('cgei-ds-lesson-5-1-1'), false);
  });

  it('registers climate-science legacy sections with stable CGEI-* ids (badge suffixes)', () => {
    const climateSections = sections.filter((section) => section.subjectId === 'cgei-climate-science');
    const ids = climateSections.map((section) => section.id).sort();
    assert.deepEqual(ids, ['CGEI-02', 'CGEI-024', 'CGEI-025']);
    // shortCode behaviour: suffix after last hyphen
    for (const id of ids) {
      const suffix = id.slice(id.lastIndexOf('-') + 1);
      assert.ok(/^\d+$/.test(suffix), `expected numeric suffix for ${id}`);
    }
  });

  it('keeps course orientation subjects distinct from lesson entities', () => {
    const subject = cgeiCurriculum.subjects.find((item) => item.subjectId === 'cgei-climate-science');
    assert.ok(subject);
    assert.ok(subject.overview.length > 0);
    assert.ok(subject.unitIds.length > 0);
    assert.ok(!subject.unitIds.includes(subject.id));
  });
});
