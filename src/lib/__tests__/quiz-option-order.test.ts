import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { Question } from '../../types.ts';
import { applyOptionOrder, isValidOptionPermutation } from '../quiz-option-order.ts';

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

  it('rejects malformed permutations without changing the question', () => {
    const original = question();
    assert.equal(isValidOptionPermutation([0, 0, 2], 3), false);
    assert.equal(applyOptionOrder(original, [0, 0, 2]), original);
    assert.deepEqual(original.options, ['A', 'B', 'C']);
    assert.equal(original.correctAnswer, 0);
  });

});
