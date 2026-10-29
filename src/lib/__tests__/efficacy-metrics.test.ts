import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { ReviewEvent } from '../review-event.ts';
import {
  computeDelayedRetention,
  computeEfficacySnapshot,
  brierScore,
} from '../efficacy-metrics.ts';

function ev(
  partial: Partial<ReviewEvent> & Pick<ReviewEvent, 'itemId' | 'correct' | 'ts'>,
): ReviewEvent {
  return {
    id: partial.id ?? `e_${partial.ts}_${partial.itemId}`,
    deviceId: 't',
    sessionId: 's',
    skillId: partial.skillId ?? partial.itemId,
    mode: 'quick',
    algoVersion: 'test',
    ...partial,
  };
}

const DAY = 86_400_000;

describe('efficacy metrics', () => {
  it('ignores same-session repeats for delayed retention', () => {
    const events = [
      ev({ itemId: 'a', correct: true, ts: 0 }),
      ev({ itemId: 'a', correct: false, ts: 60_000 }),
    ];
    const stats = computeDelayedRetention(events, 7);
    assert.equal(stats.n, 0);
    assert.equal(stats.uniqueEligibleItems, 0);
    assert.equal(stats.accuracy, null);
  });

  it('counts qualifying attempts and reports distinct eligible items separately', () => {
    const events = [
      ev({ itemId: 'a', correct: true, ts: 0 }),
      ev({ itemId: 'a', correct: true, ts: 8 * DAY }),
      ev({ itemId: 'a', correct: false, ts: 10 * DAY }),
      ev({ itemId: 'b', correct: true, ts: 0 }),
      ev({ itemId: 'b', correct: true, ts: 8 * DAY }),
    ];
    const stats = computeDelayedRetention(events, 7);
    assert.equal(stats.n, 3);
    assert.equal(stats.correct, 2);
    assert.equal(stats.uniqueEligibleItems, 2);
    assert.ok(stats.accuracy != null && Math.abs(stats.accuracy - 2 / 3) < 1e-9);
  });

  it('builds an efficacy snapshot with delayed attempt-level latency', () => {
    const events = [
      ev({ itemId: 'a', correct: true, ts: 0, latencyMs: 1000 }),
      ev({ itemId: 'a', correct: true, ts: 9 * DAY, latencyMs: 2000 }),
    ];
    const snapshot = computeEfficacySnapshot(events, 7);
    assert.equal(snapshot.totalEvents, 2);
    assert.equal(snapshot.uniqueItems, 1);
    assert.equal(snapshot.delayedRetention.n, 1);
    assert.equal(snapshot.delayedRetention.uniqueEligibleItems, 1);
    assert.equal(snapshot.meanLatencyMs, 2000);
  });

  it('computes Brier score without clamping invalid probabilities', () => {
    assert.equal(brierScore([1, 0], [true, false]), 0);
    assert.equal(brierScore([0.5, 0.5], [true, false]), 0.25);
    assert.equal(brierScore([], []), null);
    assert.equal(brierScore([0.5], []), null);
    assert.throws(() => brierScore([Number.NaN], [true]), RangeError);
    assert.throws(() => brierScore([-0.1], [true]), RangeError);
    assert.throws(() => brierScore([1.1], [true]), RangeError);
    assert.throws(() => brierScore([0.5], [1 as unknown as boolean]), RangeError);
  });

  it('rejects invalid delay thresholds', () => {
    const events = [ev({ itemId: 'a', correct: true, ts: 0 })];
    assert.throws(() => computeDelayedRetention(events, -1), RangeError);
    assert.throws(() => computeDelayedRetention(events, Number.NaN), RangeError);
    assert.throws(() => computeEfficacySnapshot(events, Number.POSITIVE_INFINITY), RangeError);
  });
});
