import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  scoreQuestion,
  pickAdaptiveQuestions,
  type AdaptiveSelectOptions,
} from '../adaptive-select.ts';
import type { Question } from '../../types.ts';

function q(id: string, topicId = 't1'): Question {
  return {
    id,
    topicId,
    sectionId: 's1',
    text: id,
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 0,
    difficulty: 'medium',
  } as Question;
}

describe('HC-miss pool priority', () => {
  it('boosts score for priority ids', () => {
    const base: AdaptiveSelectOptions = {
      mode: 'quick',
      deterministic: true,
      questionResults: {
        a: { correct: false, timestamp: Date.now() - 1000 },
        b: { correct: false, timestamp: Date.now() - 1000 },
      },
    };
    const without = scoreQuestion(q('a'), base);
    const withP = scoreQuestion(q('a'), { ...base, priorityQuestionIds: ['a'] });
    assert.ok(withP > without);
  });

  it('includes priority item even under hard cooldown pressure', () => {
    const now = Date.now();
    const pool = [q('fresh1'), q('fresh2'), q('hc-miss'), q('fresh3')];
    // hc-miss answered 1h ago (hard cooldown) but marked priority
    const results = {
      'hc-miss': { correct: true, timestamp: now - 60 * 60 * 1000, strength: 0.9 },
      fresh1: { correct: true, timestamp: now - 10 * 24 * 60 * 60 * 1000 },
      fresh2: { correct: true, timestamp: now - 10 * 24 * 60 * 60 * 1000 },
      fresh3: { correct: true, timestamp: now - 10 * 24 * 60 * 60 * 1000 },
    };
    const picked = pickAdaptiveQuestions(pool, 2, {
      mode: 'quick',
      deterministic: true,
      now,
      questionResults: results,
      priorityQuestionIds: ['hc-miss'],
    });
    assert.ok(
      picked.some((x) => x.id === 'hc-miss'),
      `expected hc-miss in ${picked.map((x) => x.id).join(',')}`,
    );
  });
});
