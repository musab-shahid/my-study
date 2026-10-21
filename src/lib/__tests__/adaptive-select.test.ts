import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  pickAdaptiveQuestions,
  scoreQuestion,
  updateTopicAbility,
  nearMissScore,
  predictedSuccess,
  getTopicAbility,
  updateQuestionStrength,
  resolveStrength,
} from '../adaptive-select.ts';
import type { Question, TopicProgress } from '../../types.ts';

function q(partial: Partial<Question> & { id: string; topicId: string }): Question {
  return {
    sectionId: 'sec',
    type: 'single',
    difficulty: 'medium',
    question: partial.id,
    options: ['a', 'b'],
    correctAnswer: 0,
    ...partial,
  } as Question;
}

const baseOpts = {
  mode: 'topic' as const,
  deterministic: true,
  now: Date.parse('2026-10-11T12:00:00Z'),
};

describe('adaptive-select phase 1–2 smoke', () => {
  it('prefers wrong/unseen over recent correct', () => {
    const wrong = q({ id: 'w', topicId: 't1' });
    const right = q({ id: 'r', topicId: 't1' });
    const opts = {
      ...baseOpts,
      questionResults: {
        w: { correct: false, timestamp: baseOpts.now - 2 * 86400000, strength: 0.2 },
        r: { correct: true, timestamp: baseOpts.now - 2 * 86400000, strength: 0.85 },
      },
    };
    assert.ok(scoreQuestion(wrong, opts) > scoreQuestion(right, opts));
  });

  it('updateTopicAbility moves with outcomes', () => {
    assert.ok(updateTopicAbility(0, 'medium', true) > 0);
    assert.ok(updateTopicAbility(0, 'medium', false) < 0);
  });

  it('nearMiss peaks near target', () => {
    assert.ok(nearMissScore(0.75, 'medium') > nearMissScore(0, 'medium'));
  });
});

describe('adaptive-select phase 3 (question strength)', () => {
  it('updateQuestionStrength rises on correct, falls on wrong', () => {
    const a = updateQuestionStrength(undefined, true, 1);
    assert.ok((a.strength ?? 0) > 0.5);
    const b = updateQuestionStrength(a, true, 2);
    assert.ok((b.strength ?? 0) > (a.strength ?? 0));
    const c = updateQuestionStrength(b, false, 3);
    assert.ok((c.strength ?? 1) < (b.strength ?? 0));
    assert.equal(c.correct, false);
    assert.equal(c.attempts, 3);
  });

  it('one lucky correct does not fully clear a weak item', () => {
    let r = updateQuestionStrength(undefined, false, 1);
    r = updateQuestionStrength(r, false, 2);
    r = updateQuestionStrength(r, false, 3);
    const weak = r.strength ?? 0;
    r = updateQuestionStrength(r, true, 4);
    // Still clearly below a solid item
    assert.ok((r.strength ?? 1) < 0.55);
    assert.ok((r.strength ?? 0) > weak);
  });

  it('resolveStrength falls back for legacy rows', () => {
    assert.equal(resolveStrength({ correct: true, timestamp: 1 }), 0.7);
    assert.equal(resolveStrength({ correct: false, timestamp: 1 }), 0.25);
    assert.equal(resolveStrength(undefined), null);
  });

  it('lower strength scores higher than high strength (same recency)', () => {
    const weak = q({ id: 'weak', topicId: 't' });
    const strong = q({ id: 'strong', topicId: 't' });
    const opts = {
      ...baseOpts,
      questionResults: {
        weak: { correct: true, timestamp: baseOpts.now - 2 * 86400000, strength: 0.3 },
        strong: { correct: true, timestamp: baseOpts.now - 2 * 86400000, strength: 0.9 },
      },
    };
    assert.ok(scoreQuestion(weak, opts) > scoreQuestion(strong, opts));
  });

  it('pickAdaptiveQuestions prioritizes low-strength items', () => {
    const pool = [
      q({ id: 'solid', topicId: 't' }),
      q({ id: 'shaky', topicId: 't' }),
      q({ id: 'new', topicId: 't' }),
    ];
    const picked = pickAdaptiveQuestions(pool, 2, {
      ...baseOpts,
      questionResults: {
        solid: { correct: true, timestamp: baseOpts.now - 86400000, strength: 0.92 },
        shaky: { correct: true, timestamp: baseOpts.now - 86400000, strength: 0.28 },
      },
    });
    const ids = picked.map((x) => x.id);
    assert.ok(ids.includes('shaky'));
    assert.ok(ids.includes('new'));
    assert.ok(!ids.includes('solid'));
  });
});
