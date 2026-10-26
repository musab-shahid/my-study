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

/** Regression: HAT items that previously shipped duplicate options */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('HAT verbal option integrity regressions', () => {
  it('keeps fixed items free of duplicate option text', () => {
    const src = readFileSync(resolve('src/data/hat/verbal/questions-verbal.ts'), 'utf8');
    for (const id of ['HATV-06-Q030', 'HATV-03-Q011']) {
      const idx = src.indexOf(`id: '${id}'`);
      assert.ok(idx >= 0, `missing ${id}`);
      const slice = src.slice(idx, idx + 500);
      const m = slice.match(/options:\s*\[([^\]]+)\]/);
      assert.ok(m, `options not found for ${id}`);
      const parts = m[1].split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '').toLowerCase());
      assert.equal(new Set(parts).size, parts.length, `${id} has duplicate options: ${parts.join(' | ')}`);
    }
  });
});
