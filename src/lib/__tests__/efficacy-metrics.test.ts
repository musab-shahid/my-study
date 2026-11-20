import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { ReviewEvent } from '../review-event.ts';
import {
  computeDelayedRetention,
  computeEfficacySnapshot,
  isDelayedRetentionEligible,
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
      ev({ itemId: 'a', correct: true, ts: 8 * DAY, sessionId: 's2' }),
      ev({ itemId: 'a', correct: false, ts: 10 * DAY, sessionId: 's3' }),
      ev({ itemId: 'b', correct: true, ts: 0 }),
      ev({ itemId: 'b', correct: true, ts: 8 * DAY, sessionId: 's2' }),
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

  describe('delayed-retention eligibility (audit finding 7)', () => {
    it('excludes unanswered timeout slots', () => {
      const events = [
        ev({ itemId: 'a', correct: true, ts: 0 }),
        ev({ itemId: 'a', correct: false, ts: 8 * DAY, responseStatus: 'unanswered' }),
      ];
      const stats = computeDelayedRetention(events, 7);
      assert.equal(stats.n, 0);
      assert.equal(isDelayedRetentionEligible(events[1]), false);
    });

    it('excludes flashcard self-grades even when marked correct', () => {
      const events = [
        ev({ itemId: 'a', correct: true, ts: 0 }),
        ev({ itemId: 'a', correct: true, ts: 8 * DAY, mode: 'flashcard', grade: 'easy' }),
      ];
      const stats = computeDelayedRetention(events, 7);
      assert.equal(stats.n, 0);
      assert.equal(isDelayedRetentionEligible(events[1]), false);
    });

    it('excludes lesson-check events with immediate in-lesson feedback', () => {
      const events = [
        ev({ itemId: 'a', correct: true, ts: 0 }),
        ev({ itemId: 'a', correct: true, ts: 8 * DAY, mode: 'lesson-check' }),
        ev({ itemId: 'a', correct: true, ts: 8 * DAY + 60_000, mode: 'lesson-check' }),
      ];
      const stats = computeDelayedRetention(events, 7);
      assert.equal(stats.n, 0);
      assert.equal(stats.uniqueEligibleItems, 0);
    });

    it('counts one observation per session/item so retry bursts cannot multiply the denominator', () => {
      const events = [
        ev({ itemId: 'a', correct: true, ts: 0 }),
        ev({ itemId: 'a', correct: true, ts: 8 * DAY, sessionId: 's1' }),
        ev({ itemId: 'a', correct: true, ts: 8 * DAY + 5_000, sessionId: 's1' }),
        ev({ itemId: 'a', correct: true, ts: 8 * DAY + 9_000, sessionId: 's1' }),
      ];
      const stats = computeDelayedRetention(events, 7);
      assert.equal(stats.n, 1);
      assert.equal(stats.correct, 1);
      assert.equal(stats.uniqueEligibleItems, 1);
    });

    it('counts separate sessions as separate observations', () => {
      const events = [
        ev({ itemId: 'a', correct: true, ts: 0 }),
        ev({ itemId: 'a', correct: false, ts: 8 * DAY, sessionId: 's1' }),
        ev({ itemId: 'a', correct: true, ts: 10 * DAY, sessionId: 's2' }),
      ];
      const stats = computeDelayedRetention(events, 7);
      assert.equal(stats.n, 2);
      assert.equal(stats.correct, 1);
    });

    it('treats legacy events without responseStatus as submitted', () => {
      const legacy = ev({ itemId: 'a', correct: true, ts: 8 * DAY });
      delete (legacy as { responseStatus?: unknown }).responseStatus;
      assert.equal(isDelayedRetentionEligible(legacy), true);
    });
  });
});
