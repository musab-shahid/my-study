import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { assessSavedDraftForResume, validateDraftShape } from '../quiz-session.ts';

function baseDraft(over: Record<string, unknown> = {}) {
  return {
    questionIds: ['Q1', 'Q2'],
    answers: [
      { questionId: 'Q1', correct: true, selectedIndices: [0] },
    ],
    currentIdx: 0,
    mode: 'quick',
    track: 'fpsc',
    examId: null,
    ...over,
  };
}

describe('assessSavedDraftForResume', () => {
  it('returns none for null raw', () => {
    const r = assessSavedDraftForResume(null, { trackId: 'fpsc', examId: null });
    assert.equal(r.status, 'none');
  });

  it('returns invalid for malformed shape', () => {
    const r = assessSavedDraftForResume({ questionIds: [] }, { trackId: 'fpsc', examId: null });
    assert.equal(r.status, 'invalid');
  });

  it('returns unknown when workspace is null (do not claim resumable)', () => {
    const shape = validateDraftShape(baseDraft());
    assert.equal(shape.ok, true);
    const r = assessSavedDraftForResume(baseDraft(), null);
    assert.equal(r.status, 'unknown');
  });

  it('rejects draft with missing track even if shape otherwise ok', () => {
    const d = baseDraft({ track: null });
    // track null may still pass shape with track: null
    const r = assessSavedDraftForResume(d, { trackId: 'fpsc', examId: null });
    assert.ok(r.status === 'incompatible' || r.status === 'invalid');
  });

  it('rejects track mismatch', () => {
    const r = assessSavedDraftForResume(baseDraft({ track: 'hat' }), {
      trackId: 'fpsc',
      examId: null,
    });
    assert.equal(r.status, 'incompatible');
  });

  it('rejects exam profile mismatch', () => {
    const r = assessSavedDraftForResume(baseDraft({ track: 'fpsc', examId: 'bs17' }), {
      trackId: 'fpsc',
      examId: null,
    });
    assert.equal(r.status, 'incompatible');
  });

  it('accepts structurally valid draft matching workspace', () => {
    const r = assessSavedDraftForResume(baseDraft(), { trackId: 'fpsc', examId: null });
    assert.equal(r.status, 'eligible');
    if (r.status === 'eligible') {
      assert.equal(r.draft.mode, 'quick');
      assert.equal(r.draft.questionIds.length, 2);
    }
  });
});
