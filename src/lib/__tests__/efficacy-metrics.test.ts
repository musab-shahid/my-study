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
      ev({ itemId: 'a', correct: false, ts: 60_000 }), // same day
    ];
    const r = computeDelayedRetention(events, 7);
    assert.equal(r.n, 0);
    assert.equal(r.accuracy, null);
  });

  it('counts attempts after the delay window', () => {
    const events = [
      ev({ itemId: 'a', correct: true, ts: 0 }),
      ev({ itemId: 'a', correct: true, ts: 8 * DAY }),
      ev({ itemId: 'a', correct: false, ts: 10 * DAY }),
      ev({ itemId: 'b', correct: true, ts: 0 }),
    ];
    const r = computeDelayedRetention(events, 7);
    assert.equal(r.n, 2);
    assert.equal(r.correct, 1);
    assert.ok(r.accuracy != null && Math.abs(r.accuracy - 0.5) < 1e-9);
  });

  it('builds an efficacy snapshot', () => {
    const events = [
      ev({ itemId: 'a', correct: true, ts: 0, latencyMs: 1000 }),
      ev({ itemId: 'a', correct: true, ts: 9 * DAY, latencyMs: 2000 }),
    ];
    const s = computeEfficacySnapshot(events, 7);
    assert.equal(s.totalEvents, 2);
    assert.equal(s.uniqueItems, 1);
    assert.equal(s.delayedRetention.n, 1);
    assert.equal(s.meanLatencyMs, 2000);
  });

  it('computes Brier score', () => {
    assert.equal(brierScore([1, 0], [true, false]), 0);
    assert.ok((brierScore([0.5, 0.5], [true, false]) ?? 9) < 0.26);
    assert.equal(brierScore([], []), null);
  });
});
