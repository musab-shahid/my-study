import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeBayesianMastery,
  compositeReadiness,
  betaProbAbove,
} from '../mastery-bayesian.ts';

describe('Bayesian mastery', () => {
  it('3/3 correct is not yet mastered at 90% confidence for 80% threshold', () => {
    const m = computeBayesianMastery(3, 3);
    assert.equal(m.attempts, 3);
    assert.equal(m.correct, 3);
    assert.ok(m.mean > 0.7);
    // With Beta(4,1), P(p>=0.8)=1-0.8^4≈0.59 < 0.9 → not mastered.
    assert.equal(m.mastered, false);
    assert.ok(m.probAboveThreshold < 0.9);
  });

  it('10/10 correct is mastered', () => {
    const m = computeBayesianMastery(10, 10);
    assert.equal(m.mastered, true);
    assert.ok(m.probAboveThreshold >= 0.9);
  });

  it('0/5 is not mastered and mean is low', () => {
    const m = computeBayesianMastery(0, 5);
    assert.equal(m.mastered, false);
    assert.ok(m.mean < 0.3);
  });

  it('8/10 has mean 0.75 and is not mastered at the strict 90% bar', () => {
    const m = computeBayesianMastery(8, 10);
    assert.ok(Math.abs(m.mean - 0.75) < 1e-9);
    // Mean sits below 0.8; strict P(p>=0.8)>=0.9 should fail.
    assert.equal(m.mastered, false);
    assert.ok(m.probAboveThreshold < 0.9);
  });

  it('betaProbAbove boundaries', () => {
    assert.equal(betaProbAbove(2, 2, 0), 1);
    assert.equal(betaProbAbove(2, 2, 1), 0);
  });

  it('compositeReadiness keeps coverage separate and subordinate', () => {
    const r = compositeReadiness({
      coverageShare: 1,
      meanRecallProbability: 0,
      coverageWeight: 0.25,
    });
    assert.equal(r.score, 25);
    const r2 = compositeReadiness({
      coverageShare: 0,
      meanRecallProbability: 1,
      coverageWeight: 0.25,
    });
    assert.equal(r2.score, 75);
  });
});
