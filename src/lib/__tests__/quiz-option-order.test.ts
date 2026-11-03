import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { Question } from '../../types.ts';
import { applyOptionOrder, applySavedOptionOrders } from '../quiz-option-order.ts';

function question(overrides: Partial<Question> = {}): Question {
  return {
    id: 'q1',
    sectionId: 'A',
    topicId: 'topic-a',
    difficulty: 'medium',
    type: 'single',
    question: 'Which option is correct?',
    options: ['A', 'B', 'C'],
    correctAnswer: 0,
    explanation: 'Because A.',
    sourceCitation: 'fixture',
    ...overrides,
  };
}

describe('quiz option ordering', () => {
  it('remaps a single correct answer when options are permuted', () => {
    const original = question();
    const reordered = applyOptionOrder(original, [2, 0, 1]);
    assert.deepEqual(reordered.options, ['C', 'A', 'B']);
    assert.equal(reordered.correctAnswer, 1);
    assert.deepEqual(original.options, ['A', 'B', 'C']);
    assert.equal(original.correctAnswer, 0);
  });

  it('remaps multi-select answers into sorted display indices', () => {
    const reordered = applyOptionOrder(
      question({ type: 'multi', correctAnswer: [0, 2] }),
      [2, 0, 1],
    );
    assert.deepEqual(reordered.options, ['C', 'A', 'B']);
    assert.deepEqual(reordered.correctAnswer, [0, 1]);
  });

  it('keeps matching answers paired with their original prompt options', () => {
    const reordered = applyOptionOrder(
      question({ type: 'matching', correctAnswer: [1, 0, 2] }),
      [2, 0, 1],
    );
    assert.deepEqual(reordered.options, ['C', 'A', 'B']);
    assert.deepEqual(reordered.correctAnswer, [2, 1, 0]);
  });

  it('aligns restored permutations by question ID, not filtered array position', () => {
    const q2 = question({ id: 'q2', correctAnswer: 1 });
    const restored = applySavedOptionOrders(
      [q2],
      ['missing-from-bank', 'q2'],
      [[0, 1, 2], [2, 0, 1]],
    );
    assert.deepEqual(restored[0].options, ['C', 'A', 'B']);
    assert.equal(restored[0].correctAnswer, 2);
  });

  it('fails closed on invalid saved permutations without changing the question', () => {
    const q2 = question({ id: 'q2' });
    const restored = applySavedOptionOrders([q2], ['q2'], [[0, 0, 2]]);
    assert.equal(restored[0], q2);
  });
});
