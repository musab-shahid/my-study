import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { CurriculumLesson, CurriculumReadinessEvidence } from '../../types/curriculum.ts';
import {
  hasSubstantiveLessonContent,
  validateLessonReadiness,
  validateReadinessEvidence,
} from '../../data/cgei/readiness.ts';

const evidence: CurriculumReadinessEvidence = {
  reviewer: 'Independent curriculum reviewer',
  reviewedOn: '2026-10-24',
  checksPassed: ['content review', 'worked-example check', 'keyboard/browser smoke test'],
  notes: ['Reviewed scope and recorded remaining limitations in the audit notes.'],
};

function lesson(overrides: Partial<Pick<
  CurriculumLesson,
  'id' | 'readiness' | 'readinessEvidence' | 'content' | 'objectives' | 'activityIds' | 'assessmentIds'
>> = {}): Pick<
  CurriculumLesson,
  'id' | 'readiness' | 'readinessEvidence' | 'content' | 'objectives' | 'activityIds' | 'assessmentIds'
> {
  return {
    id: 'test-lesson',
    readiness: 'validated',
    readinessEvidence: evidence,
    content: [{ id: 'block-1', kind: 'prose', body: 'A substantive explanation with enough instructional meaning.' }],
    objectives: [{ id: 'objective-1', statement: 'Calculate and interpret the result.', action: 'calculate and interpret', level: 'L2' }],
    activityIds: ['activity-1'],
    assessmentIds: [],
    ...overrides,
  };
}

describe('CGEI readiness evidence', () => {
  it('does not require release evidence for planned, draft, or review work', () => {
    for (const readiness of ['planned', 'outlined', 'draft', 'review'] as const) {
      assert.deepEqual(validateReadinessEvidence(readiness, undefined), []);
    }
  });

  it('rejects validated or released nodes without explicit review evidence', () => {
    assert.match(validateReadinessEvidence('validated', undefined, 'Unit 5.1').join(' '), /without readiness evidence/);
    assert.match(validateReadinessEvidence('released', undefined, 'Subject A').join(' '), /without readiness evidence/);
  });

  it('rejects invalid dates and empty evidence fields', () => {
    const invalid = { reviewer: ' ', reviewedOn: '2026-02-30', checksPassed: [' '], notes: [] };
    const issues = validateReadinessEvidence('validated', invalid, 'Lesson A');
    assert.ok(issues.some((issue) => /reviewer/.test(issue)));
    assert.ok(issues.some((issue) => /real YYYY-MM-DD/.test(issue)));
    assert.ok(issues.some((issue) => /completed check/.test(issue)));
    assert.ok(issues.some((issue) => /review notes/.test(issue)));
  });

  it('rejects review dates in the future', () => {
    const future = { ...evidence, reviewedOn: '2999-01-01' };
    assert.ok(validateReadinessEvidence('validated', future, 'Lesson A').some((issue) => /real YYYY-MM-DD/.test(issue)));
  });

  it('accepts a lesson only when evidence, substantive content, objectives, and practice/checks exist', () => {
    assert.deepEqual(validateLessonReadiness(lesson()), []);
  });

  it('rejects placeholder-only content even when a lesson has a content block', () => {
    const placeholder = lesson({
      content: [{ id: 'placeholder', kind: 'figure', body: 'Figure or visual resource to be added.' }],
    });
    assert.equal(hasSubstantiveLessonContent(placeholder), false);
    assert.ok(validateLessonReadiness(placeholder).some((issue) => /without substantive instructional content/.test(issue)));
  });

  it('rejects validated lessons with missing objectives or practice/checks', () => {
    const invalid = lesson({ objectives: [], activityIds: [], assessmentIds: [] });
    const issues = validateLessonReadiness(invalid);
    assert.ok(issues.some((issue) => /learning objectives/.test(issue)));
    assert.ok(issues.some((issue) => /linked practice or assessment/.test(issue)));
  });

  it('keeps the review gate in force for released lessons', () => {
    const released = lesson({ readiness: 'released', readinessEvidence: undefined });
    assert.ok(validateLessonReadiness(released).some((issue) => /without readiness evidence/.test(issue)));
  });
});
