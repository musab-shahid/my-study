import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateQuizRequest,
  isValidOptionPermutation,
  validateDraftShape,
  questionsMatchRequest,
  gradeAnswer,
  selectionsValidForQuestion,
  reconcileRestoredDraft,
  applyOptionOrderPure,
} from '../quiz-session.ts';
import type { Question } from '../../types.ts';
import { selectQuizPool } from '../quiz-pool.ts';
import { sectionMap } from '../../data/sections.ts';
import { allQuestions } from '../../data/questions.ts';

describe('validateQuizRequest', () => {
  it('rejects subject scope without subjectId', () => {
    const r = validateQuizRequest({ mode: 'quick', scope: 'subject' });
    assert.equal(r.ok, false);
  });

  it('rejects empty subjectId', () => {
    const r = validateQuizRequest({ mode: 'quick', scope: 'subject', subjectId: '' });
    assert.equal(r.ok, false);
  });

  it('rejects empty topicIds list', () => {
    const r = validateQuizRequest({ mode: 'quick', topicIds: [] });
    assert.equal(r.ok, false);
  });

  it('deduplicates topicIds', () => {
    const r = validateQuizRequest({ mode: 'quick', topicIds: ['a', 'a', 'b'] });
    assert.equal(r.ok, true);
    if (r.ok) assert.deepEqual(r.request.topicIds, ['a', 'b']);
  });
});

describe('isValidOptionPermutation', () => {
  it('accepts full permutation', () => {
    assert.equal(isValidOptionPermutation([2, 0, 1], 3), true);
  });
  it('rejects out of range', () => {
    assert.equal(isValidOptionPermutation([0, 1, 3], 3), false);
  });
  it('rejects duplicates', () => {
    assert.equal(isValidOptionPermutation([0, 0, 1], 3), false);
  });
});

describe('validateDraftShape', () => {
  it('rejects non-object', () => {
    assert.equal(validateDraftShape(null).ok, false);
  });
  it('rejects duplicate question ids', () => {
    const r = validateDraftShape({
      questionIds: ['q1', 'q1'],
      answers: [],
      currentIdx: 0,
      mode: 'quick',
    });
    assert.equal(r.ok, false);
  });
  it('rejects empty examId string', () => {
    const r = validateDraftShape({
      questionIds: ['q1'],
      answers: [],
      currentIdx: 0,
      mode: 'quick',
      examId: '',
    });
    assert.equal(r.ok, false);
  });
});

describe('selectQuizPool parameter integrity', () => {
  const physicsQs = allQuestions().filter(
    (q) => sectionMap[q.sectionId]?.subjectId === 'physics',
  );
  const sample = physicsQs[0];

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

  if (sample) {
    it('subject + foreign topic rejects', () => {
      // topic from maths if available
      const mathsTopic = allQuestions().find(
        (q) => sectionMap[q.sectionId]?.subjectId === 'maths',
      )?.topicId;
      if (!mathsTopic) return;
      const pool = selectQuizPool({
        mode: 'topic',
        topicId: mathsTopic,
        subjectId: 'physics',
        track: 'fpsc',
        allowedSubjectIds: new Set(['physics', 'maths']),
        scopeInput: { trackId: 'fpsc', examId: null },
      });
      assert.equal(pool.length, 0);
    });
  }
});

describe('questionsMatchRequest wrongPool', () => {
  it('rejects when a restored question is not wrong in history', () => {
    const qs = allQuestions().slice(0, 2);
    if (qs.length < 2) {
      assert.ok(true);
      return;
    }
    const ok = questionsMatchRequest(
      qs,
      { mode: 'review', wrongPool: true },
      { [qs[0].id]: { correct: false, timestamp: 1 }, [qs[1].id]: { correct: true, timestamp: 1 } },
    );
    assert.equal(ok, false);
  });

  it('accepts when all are wrong', () => {
    const qs = allQuestions().slice(0, 2);
    if (qs.length < 2) {
      assert.ok(true);
      return;
    }
    const results: Record<string, { correct: boolean; timestamp: number }> = {};
    for (const q of qs) results[q.id] = { correct: false, timestamp: 1 };
    assert.equal(questionsMatchRequest(qs, { mode: 'review', wrongPool: true }, results), true);
  });
});

describe('validateDraftShape mode', () => {
  it('rejects unsupported mode', () => {
    const r = validateDraftShape({
      questionIds: ['q1'],
      answers: [],
      currentIdx: 0,
      mode: 'not-a-mode',
    });
    assert.equal(r.ok, false);
  });
});


function makeQ(over: Partial<Question> & { id: string }): Question {
  return {
    sectionId: 'PHY-01',
    topicId: 't1',
    type: 'single',
    difficulty: 'easy',
    question: 'Q?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 1,
    explanation: '',
    ...over,
  };
}

describe('answer record uniqueness', () => {
  it('rejects duplicate answer records for same question', () => {
    const r = validateDraftShape({
      questionIds: ['q1', 'q2'],
      answers: [
        { questionId: 'q1', correct: true, selectedIndices: [0] },
        { questionId: 'q1', correct: true, selectedIndices: [0] },
      ],
      currentIdx: 0,
      mode: 'quick',
    });
    assert.equal(r.ok, false);
    if (!r.ok) assert.equal(r.reason, 'duplicate-answer-record');
  });

  it('accepts partial answers (unanswered ok)', () => {
    const r = validateDraftShape({
      questionIds: ['q1', 'q2'],
      answers: [{ questionId: 'q1', correct: false, selectedIndices: [2] }],
      currentIdx: 1,
      mode: 'quick',
    });
    assert.equal(r.ok, true);
  });
});

describe('selectionsValidForQuestion', () => {
  it('rejects out-of-range single', () => {
    const q = makeQ({ id: 'q1' });
    assert.equal(selectionsValidForQuestion(q, [4]), false);
    assert.equal(selectionsValidForQuestion(q, [1]), true);
  });

  it('rejects multi duplicates', () => {
    const q = makeQ({ id: 'q1', type: 'multi', correctAnswer: [0, 2] });
    assert.equal(selectionsValidForQuestion(q, [0, 0]), false);
    assert.equal(selectionsValidForQuestion(q, [0, 2]), true);
  });

  it('matching bounds use matchOptions length', () => {
    const q = makeQ({
      id: 'q1',
      type: 'matching',
      options: ['s1', 's2'],
      matchOptions: ['m1', 'm2', 'm3'],
      correctAnswer: [0, 1],
    });
    assert.equal(selectionsValidForQuestion(q, [0, 2]), true);
    assert.equal(selectionsValidForQuestion(q, [0, 3]), false);
    assert.equal(selectionsValidForQuestion(q, [0]), false);
  });
});

describe('reconcileRestoredDraft', () => {
  it('recomputes correctness (ignores stored boolean)', () => {
    const bank = [makeQ({ id: 'q1', correctAnswer: 1 })];
    const draft = {
      questionIds: ['q1'],
      answers: [{ questionId: 'q1', correct: true, selectedIndices: [0] }], // wrong but marked true
      currentIdx: 0,
      mode: 'quick' as const,
    };
    const r = reconcileRestoredDraft(bank, draft);
    assert.equal(r.ok, true);
    if (r.ok) {
      assert.equal(r.answers[0].correct, false);
      assert.equal(gradeAnswer(r.questions[0], [0]), false);
    }
  });

  it('rejects invalid option order when answers present', () => {
    const bank = [makeQ({ id: 'q1' })];
    const draft = {
      questionIds: ['q1'],
      optionOrders: [[0, 0, 1, 2]], // invalid permutation
      answers: [{ questionId: 'q1', correct: false, selectedIndices: [1] }],
      currentIdx: 0,
      mode: 'quick' as const,
    };
    const r = reconcileRestoredDraft(bank, draft);
    assert.equal(r.ok, false);
  });

  it('preserves grading under valid permutation', () => {
    const bank = [makeQ({ id: 'q1', correctAnswer: 1 })];
    // display order: bank indices [1,0,2,3] → correct at display 0
    const order = [1, 0, 2, 3];
    const draft = {
      questionIds: ['q1'],
      optionOrders: [order],
      answers: [{ questionId: 'q1', correct: true, selectedIndices: [0] }],
      currentIdx: 0,
      mode: 'quick' as const,
    };
    const r = reconcileRestoredDraft(bank, draft);
    assert.equal(r.ok, true);
    if (r.ok) {
      assert.equal(r.answers[0].correct, true);
      assert.deepEqual(r.optionOrders[0], order);
    }
  });
});

describe('schema field validation', () => {
  it('rejects bad scope', () => {
    const r = validateDraftShape({
      questionIds: ['q1'],
      answers: [],
      currentIdx: 0,
      mode: 'quick',
      scope: 'track',
    });
    assert.equal(r.ok, false);
  });

  it('rejects non-array topicIds', () => {
    const r = validateDraftShape({
      questionIds: ['q1'],
      answers: [],
      currentIdx: 0,
      mode: 'quick',
      topicIds: 'x',
    });
    assert.equal(r.ok, false);
  });
});

describe('applyOptionOrderPure fail-closed', () => {
  it('maps single-choice correct index under valid permutation', () => {
    const q = makeQ({ id: 's1', correctAnswer: 2 });
    const order = [3, 0, 1, 2]; // bank index 2 → display index 3
    const r = applyOptionOrderPure(q, order);
    assert.equal(r.correctAnswer, 3);
    assert.equal(r.options[3], q.options[2]);
  });

  it('does not retain bank correct index when mapping fails', () => {
    const q = makeQ({ id: 's1', correctAnswer: 2 });
    // Force incomplete inv by using order that claims length 4 but we pass invalid via out-of-range correctAnswer
    const broken = { ...q, correctAnswer: 99 as unknown as number };
    const order = [0, 1, 2, 3];
    const r = applyOptionOrderPure(broken, order);
    // Unchanged bank form — not a shuffled question with wrong key
    assert.equal(r.correctAnswer, 99);
    assert.deepEqual(r.options, broken.options);
  });

  it('multi-select maps all indices or fails closed', () => {
    const q = makeQ({ id: 'm1', type: 'multi', correctAnswer: [0, 2] });
    const order = [1, 2, 3, 0]; // 0→3, 2→1
    const r = applyOptionOrderPure(q, order);
    assert.deepEqual(r.correctAnswer, [1, 3].sort((a, b) => a - b));
  });
});
