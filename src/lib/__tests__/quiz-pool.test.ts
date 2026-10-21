import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { selectQuizPool, filterRestoredQuestions } from '../quiz-pool.ts';
import { quizSignature, signaturesMatch } from '../quiz-signature.ts';
import type { Question } from '../../types.ts';

/** Minimal question fixture — no dependency on lazy-loaded banks */
function q(partial: Partial<Question> & { id: string; sectionId: string; topicId: string }): Question {
  return {
    type: 'single',
    difficulty: 'easy',
    question: 'fixture',
    options: ['a', 'b'],
    correctAnswer: 0,
    explanation: '',
    ...partial,
  };
}

describe('selectQuizPool workspace scope', () => {
  it('returns empty without track', () => {
    const pool = selectQuizPool({
      mode: 'quick',
      track: null,
      allowedSubjectIds: new Set(['physics']),
      scopeInput: null,
    });
    assert.equal(pool.length, 0);
  });

  it('returns empty with empty allowed subjects', () => {
    const pool = selectQuizPool({
      mode: 'quick',
      track: 'fpsc',
      allowedSubjectIds: new Set(),
      scopeInput: { trackId: 'fpsc', examId: null },
    });
    assert.equal(pool.length, 0);
  });

  it('subject outside allowed set yields empty', () => {
    const pool = selectQuizPool({
      mode: 'quick',
      scope: 'subject',
      subjectId: 'hat-verbal',
      track: 'fpsc',
      allowedSubjectIds: new Set(['physics', 'maths']),
      scopeInput: { trackId: 'fpsc', examId: null },
    });
    assert.equal(pool.length, 0);
  });

  it('missing scopeInput yields empty even with allowed subjects', () => {
    const pool = selectQuizPool({
      mode: 'quick',
      track: 'fpsc',
      allowedSubjectIds: new Set(['physics']),
      scopeInput: null,
    });
    assert.equal(pool.length, 0);
  });

  it('track / scopeInput.trackId mismatch yields empty', () => {
    const pool = selectQuizPool({
      mode: 'quick',
      track: 'fpsc',
      allowedSubjectIds: new Set(['physics']),
      scopeInput: { trackId: 'hat', examId: null },
    });
    assert.equal(pool.length, 0);
  });

  it('empty topicIds yields empty', () => {
    const pool = selectQuizPool({
      mode: 'quick',
      topicIds: [],
      track: 'fpsc',
      allowedSubjectIds: new Set(['physics']),
      scopeInput: { trackId: 'fpsc', examId: null },
    });
    assert.equal(pool.length, 0);
  });

  it('mixed topicIds with one invalid returns empty (reject policy)', () => {
    const pool = selectQuizPool({
      mode: 'quick',
      topicIds: ['not-a-real-topic-xyz', 'phy-kinematics'],
      track: 'fpsc',
      allowedSubjectIds: new Set(['physics']),
      scopeInput: { trackId: 'fpsc', examId: null },
    });
    assert.equal(pool.length, 0);
  });

  it('scope subject without id yields empty', () => {
    const pool = selectQuizPool({
      mode: 'quick',
      scope: 'subject',
      track: 'fpsc',
      allowedSubjectIds: new Set(['physics']),
      scopeInput: { trackId: 'fpsc', examId: null },
    });
    assert.equal(pool.length, 0);
  });
});

describe('filterRestoredQuestions', () => {
  it('rejects when any saved id is missing', () => {
    const qs = [q({ id: 'q1', sectionId: 'PHY-01', topicId: 't1' })];
    const r = filterRestoredQuestions(
      qs,
      ['q1', 'missing-id'],
      new Set(['physics']),
      { trackId: 'fpsc', examId: null },
    );
    assert.equal(r, null);
  });

  it('rejects when scopeInput is null', () => {
    const qs = [q({ id: 'q1', sectionId: 'PHY-01', topicId: 't1' })];
    const r = filterRestoredQuestions(qs, ['q1'], new Set(['physics']), null);
    assert.equal(r, null);
  });
});

describe('quiz signature includes exam profile', () => {
  const base = {
    mode: 'quick' as const,
    scope: 'subject' as const,
    subjectId: 'maths',
    count: 10,
    track: 'fpsc' as const,
  };

  it('differs when examId changes', () => {
    assert.equal(
      signaturesMatch(
        { ...base, examId: null },
        { ...base, examId: 'fpsc-met-bs17' },
      ),
      false,
    );
  });

  it('matches same examId', () => {
    assert.equal(
      signaturesMatch(
        { ...base, examId: 'fpsc-met-bs17' },
        { ...base, examId: 'fpsc-met-bs17' },
      ),
      true,
    );
  });
});
