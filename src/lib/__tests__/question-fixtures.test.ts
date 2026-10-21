import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/** Minimal inline fixtures — avoids path-alias import of the full bank */
const sampleQuestions = [
  {
    id: 'MATH-01-Q001',
    sectionId: 'MATH-01',
    topicId: 'math-1-1',
    difficulty: 'easy',
    type: 'single',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
  },
  {
    id: 'MATH-01-Q002',
    sectionId: 'MATH-01',
    topicId: 'math-1-1',
    difficulty: 'easy',
    type: 'true_false',
    options: ['True', 'False'],
    correctAnswer: 0,
  },
  {
    id: 'MATH-01-Q003',
    sectionId: 'MATH-01',
    topicId: 'math-1-1',
    difficulty: 'medium',
    type: 'multi',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: [0, 2],
  },
];

describe('question fixtures (structural)', () => {
  it('has required fields', () => {
    for (const q of sampleQuestions) {
      assert.ok(q.id);
      assert.ok(q.sectionId);
      assert.ok(q.topicId);
      assert.ok(Array.isArray(q.options));
      assert.ok(q.options.length >= 2);
    }
  });

  it('single/tf correctAnswer in range', () => {
    for (const q of sampleQuestions.filter((q) => q.type === 'single' || q.type === 'true_false')) {
      const ans = q.correctAnswer as number;
      assert.ok(Number.isInteger(ans));
      assert.ok(ans >= 0 && ans < q.options.length);
    }
  });

  it('ids are unique', () => {
    const ids = sampleQuestions.map((q) => q.id);
    assert.equal(new Set(ids).size, ids.length);
  });
});
