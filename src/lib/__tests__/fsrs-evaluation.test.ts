import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Rating } from 'ts-fsrs';
import type { ReviewEvent } from '../review-event.ts';
import {
  evaluateSchedulersChronologically,
  mapAttemptToFsrsRating,
  requiredRecallSampleSize,
} from '../fsrs-evaluation.ts';

const DAY = 86_400_000;

function event(
  id: string,
  itemId: string,
  ts: number,
  correct: boolean,
  overrides: Partial<ReviewEvent> = {},
): ReviewEvent {
  return {
    id,
    ts,
    deviceId: 'unknown-device',
    sessionId: 'synthetic-session',
    itemId,
    skillId: `skill-${Number(itemId.replace('item-', '')) % 3}`,
    mode: 'topic',
    correct,
    responseStatus: 'submitted',
    aggregateEligible: true,
    confidence: correct ? 2 : 3,
    algoVersion: 'dual-write-v2',
    ...overrides,
  };
}

function syntheticHistory(itemCount = 8, reviewsPerItem = 10): ReviewEvent[] {
  const events: ReviewEvent[] = [];
  for (let item = 0; item < itemCount; item++) {
    for (let review = 0; review < reviewsPerItem; review++) {
      events.push(event(
        `e-${item}-${review}`,
        `item-${item}`,
        1_700_000_000_000 + review * 2 * DAY + item * 60_000,
        (item + review) % 4 !== 0,
        { mode: review % 2 === 0 ? 'topic' : 'quick' },
      ));
    }
  }
  return events;
}

describe('real ts-fsrs chronological evaluation', () => {
  it('maps the existing attempt-grade contract to the four FSRS ratings', () => {
    assert.equal(mapAttemptToFsrsRating(event('a', 'item-1', 1, false, { confidence: 3 })), Rating.Again);
    assert.equal(mapAttemptToFsrsRating(event('b', 'item-1', 2, false, { confidence: 1 })), Rating.Hard);
    assert.equal(mapAttemptToFsrsRating(event('c', 'item-1', 3, true, { confidence: 1 })), Rating.Hard);
    assert.equal(mapAttemptToFsrsRating(event('d', 'item-1', 4, true, { confidence: 2 })), Rating.Good);
    assert.equal(mapAttemptToFsrsRating(event('e', 'item-1', 5, true, { confidence: 3 })), Rating.Easy);
  });

  it('uses a chronological held-out window and compares every model on identical predictions', () => {
    const report = evaluateSchedulersChronologically(syntheticHistory(), {
      sourceKind: 'synthetic',
      trainFraction: 0.8,
      bootstrapIterations: 100,
    });

    assert.equal(report.split.trainFraction, 0.8);
    assert.ok(report.split.cutoffTs != null);
    assert.ok(report.split.trainingEventCount > 0);
    assert.ok(report.split.heldOutEventCount > 0);
    assert.ok(report.split.coldStartEventCount >= 0);

    const counts = [
      report.models.tsFsrs.metrics.n,
      report.models.productionPolicy.metrics.n,
      report.models.sm2.metrics.n,
      report.models.legacyProxy.metrics.n,
      report.models.constant68.metrics.n,
    ];
    assert.ok(counts[0] > 0);
    assert.ok(counts.every((n) => n === counts[0]), 'all models must score the same held-out attempts');

    const fsrsMetrics = report.models.tsFsrs.metrics;
    assert.ok(fsrsMetrics.brierScore != null && fsrsMetrics.brierScore >= 0 && fsrsMetrics.brierScore <= 1);
    assert.ok(fsrsMetrics.logLoss != null && Number.isFinite(fsrsMetrics.logLoss));
    assert.equal(fsrsMetrics.calibrationBins.length, 10);
    assert.ok(fsrsMetrics.intervalBuckets.length >= 5);
    assert.ok(report.models.tsFsrs.bySkill.length > 0);
    assert.ok(report.models.tsFsrs.byMode.length > 0);
    assert.equal(report.promotion.eligible, false);
    assert.ok(report.promotion.reasons.some((reason) => reason.includes('synthetic')));
  });

  it('deduplicates identical event IDs and excludes conflicting IDs and invalid records', () => {
    const history = syntheticHistory();
    const duplicate = { ...history[0] };
    const conflict = { ...history[0], correct: !history[0].correct };
    const invalid = { ...history[1], ts: Number.NaN } as ReviewEvent;
    const report = evaluateSchedulersChronologically(
      [...history, duplicate, conflict, invalid],
      { sourceKind: 'synthetic', bootstrapIterations: 50 },
    );

    assert.equal(report.dataQuality.duplicateEventCount, 1);
    assert.equal(report.dataQuality.conflictingEventIdCount, 1);
    assert.equal(report.dataQuality.invalidEventCount, 1);
    assert.equal(report.dataQuality.conflictingEventIds[0], history[0].id);
  });

  it('keeps equal timestamps on the same side of the chronological cutoff', () => {
    const history = syntheticHistory(5, 6);
    const report = evaluateSchedulersChronologically(history, {
      sourceKind: 'synthetic',
      trainFraction: 0.7,
      bootstrapIterations: 50,
    });
    assert.ok(report.split.cutoffTs != null);
    assert.ok(report.split.trainingEventCount > 0);
    assert.ok(report.split.heldOutEventCount > 0);
    assert.ok(report.split.lastTrainingTs != null);
    assert.ok(report.split.firstHeldOutTs != null);
    assert.ok(report.split.lastTrainingTs < report.split.cutoffTs);
    assert.ok(report.split.firstHeldOutTs >= report.split.cutoffTs);
  });

  it('derives minimum sample sizes from stated precision targets', () => {
    assert.equal(requiredRecallSampleSize(0.05), 385);
    assert.equal(requiredRecallSampleSize(0.1), 97);
  });

  it('does not permit promotion from unverified or underpowered evidence', () => {
    const report = evaluateSchedulersChronologically(syntheticHistory(4, 5), {
      sourceKind: 'unverified',
      bootstrapIterations: 50,
    });
    assert.equal(report.promotion.eligible, false);
    assert.ok(report.promotion.reasons.some((reason) => reason.includes('unverified')));
    assert.ok(report.sampleSize.overall.minimumN > report.models.tsFsrs.metrics.n);
  });
});
