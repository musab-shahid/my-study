import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { ReviewEvent } from '../review-event.ts';
import { estimateItemDifficulty, errorRateToLabel, buildDifficultyMap } from '../item-difficulty.ts';

function ev(itemId: string, correct: boolean, ts: number): ReviewEvent {
  return {
    id: `e_${itemId}_${ts}`,
    ts,
    deviceId: 't',
    sessionId: 's',
    itemId,
    skillId: itemId,
    mode: 'quick',
    correct,
    algoVersion: 'test',
  };
}

describe('item difficulty calibration', () => {
  it('maps error rates to labels', () => {
    assert.equal(errorRateToLabel(0.1), 'easy');
    assert.equal(errorRateToLabel(0.4), 'medium');
    assert.equal(errorRateToLabel(0.8), 'hard');
  });

  it('uses author label below min attempts', () => {
    const events = [ev('q1', true, 1), ev('q1', false, 2)];
    const est = estimateItemDifficulty(events, 'q1', 'hard', 8);
    assert.equal(est.source, 'author');
    assert.equal(est.calibratedLabel, null);
    assert.equal(est.attempts, 2);
  });

  it('calibrates after enough attempts', () => {
    const events = Array.from({ length: 10 }, (_, i) => ev('q1', i < 2, i + 1)); // 2/10 correct → 0.8 error
    const est = estimateItemDifficulty(events, 'q1', 'easy', 8);
    assert.equal(est.source, 'calibrated');
    assert.equal(est.calibratedLabel, 'hard');
  });

  it('builds a map for multiple items', () => {
    const events = [
      ...Array.from({ length: 8 }, (_, i) => ev('a', true, i)),
      ...Array.from({ length: 8 }, (_, i) => ev('b', false, 100 + i)),
    ];
    const map = buildDifficultyMap(events, { a: 'hard', b: 'easy' }, 8);
    assert.equal(map.get('a')?.calibratedLabel, 'easy');
    assert.equal(map.get('b')?.calibratedLabel, 'hard');
  });
});
