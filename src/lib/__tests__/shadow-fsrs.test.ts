import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildReviewEvent } from '../review-event.ts';
import {
  predictRecall,
  shadowEvaluate,
  constantLogLoss,
} from '../shadow-fsrs.ts';
import { computeCalibration, confidentErrors } from '../calibration.ts';

describe('shadow FSRS-style predictor', () => {
  it('predictRecall decays with elapsed days', () => {
    const p0 = predictRecall(10, 0);
    const p1 = predictRecall(10, 10);
    assert.ok(p0 > 0.99);
    assert.ok(p1 < p0);
    assert.ok(p1 > 0.3);
  });

  it('shadowEvaluate returns log-loss on repeated items', () => {
    const events = [
      buildReviewEvent({ itemId: 'q1', skillId: 's', correct: true, mode: 'topic', ts: 1000 }),
      buildReviewEvent({
        itemId: 'q1',
        skillId: 's',
        correct: true,
        mode: 'topic',
        ts: 1000 + 3 * 86_400_000,
      }),
      buildReviewEvent({
        itemId: 'q1',
        skillId: 's',
        correct: false,
        mode: 'topic',
        ts: 1000 + 10 * 86_400_000,
        confidence: 3,
      }),
    ];
    const { predictions, logLoss } = shadowEvaluate(events);
    assert.equal(predictions.length, 2);
    assert.ok(logLoss != null && logLoss > 0);
    const baseline = constantLogLoss(events, 0.68);
    assert.ok(baseline != null);
  });
});

describe('calibration', () => {
  it('bins confidence and finds confident errors', () => {
    const events = [
      buildReviewEvent({
        itemId: 'a',
        skillId: 's',
        correct: true,
        mode: 'topic',
        confidence: 3,
        ts: 1,
      }),
      buildReviewEvent({
        itemId: 'b',
        skillId: 's',
        correct: false,
        mode: 'topic',
        confidence: 3,
        ts: 2,
      }),
      buildReviewEvent({
        itemId: 'c',
        skillId: 's',
        correct: true,
        mode: 'topic',
        confidence: 1,
        ts: 3,
      }),
    ];
    const bins = computeCalibration(events);
    assert.equal(bins.length, 3);
    const sure = bins.find((b) => b.confidence === 3)!;
    assert.equal(sure.n, 2);
    assert.equal(sure.accuracy, 0.5);
    assert.equal(confidentErrors(events).length, 1);
  });
});
