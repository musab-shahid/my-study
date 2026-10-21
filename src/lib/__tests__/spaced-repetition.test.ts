import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getCurrentStage,
  computeNextReviewDate,
  reviewStages,
  resolveReviewStage,
  nextStageAfterReview,
  scheduleAfterReview,
  accuracyToQuality,
  nextEaseFactor,
  DEFAULT_EASE,
  MIN_EASE,
} from '../spaced-repetition.ts';

describe('spaced repetition stage machine', () => {
  const today = new Date(2026, 0, 15);

  it('returns -1 when never scheduled', () => {
    assert.equal(getCurrentStage(null, today), -1);
  });

  it('first schedule (stage -1) lands on 1-day interval', () => {
    assert.equal(computeNextReviewDate(-1, 100, today), '2026-01-16');
  });

  it('successful review advances stage', () => {
    assert.equal(computeNextReviewDate(0, 80, today), '2026-01-18');
  });

  it('accuracy under 65 schedules short retry (1 day)', () => {
    assert.equal(computeNextReviewDate(2, 50, today), '2026-01-16');
  });

  it('does not go below stage 0 on failed first review', () => {
    assert.equal(computeNextReviewDate(0, 40, today), '2026-01-16');
  });

  it('stages match constants', () => {
    assert.deepEqual([...reviewStages()], [1, 3, 7, 14, 30]);
  });

  it('overdue nextReview does not collapse inferred stage to 0', () => {
    assert.equal(getCurrentStage('2026-01-05', today), 4);
  });

  it('due-today nextReview does not collapse inferred stage to 0', () => {
    assert.equal(getCurrentStage('2026-01-15', today), 4);
  });

  it('resolveReviewStage prefers stored stage over date inference', () => {
    assert.equal(resolveReviewStage(3, '2026-01-05', today), 3);
    assert.equal(resolveReviewStage(undefined, null, today), -1);
  });

  it('nextStageAfterReview maps continuous schedule to stage bucket', () => {
    assert.equal(nextStageAfterReview(-1, 100), 0);
    assert.equal(nextStageAfterReview(3, 50), 0);
    assert.ok(nextStageAfterReview(3, 90) >= 3);
  });

  it('accuracyToQuality maps bands', () => {
    assert.equal(accuracyToQuality(95), 5);
    assert.equal(accuracyToQuality(70), 3);
    assert.equal(accuracyToQuality(40), 1);
    assert.equal(accuracyToQuality(10), 0);
  });

  it('nextEaseFactor never drops below MIN_EASE', () => {
    assert.ok(nextEaseFactor(DEFAULT_EASE, 0) >= MIN_EASE);
    assert.ok(nextEaseFactor(1.3, 0) >= MIN_EASE);
  });

  it('scheduleAfterReview: failure resets to 1-day interval', () => {
    const r = scheduleAfterReview({
      intervalDays: 14,
      easeFactor: 2.5,
      reviewStage: 3,
      accuracy: 40,
      from: today,
    });
    assert.equal(r.intervalDays, 1);
    assert.equal(r.nextReview, '2026-01-16');
    assert.ok(r.easeFactor < 2.5);
  });

  it('scheduleAfterReview: success grows interval via ease', () => {
    const first = scheduleAfterReview({
      intervalDays: null,
      reviewStage: -1,
      accuracy: 90,
      from: today,
    });
    assert.equal(first.intervalDays, 1);
    const second = scheduleAfterReview({
      intervalDays: 1,
      easeFactor: first.easeFactor,
      reviewStage: first.reviewStage,
      accuracy: 90,
      from: today,
    });
    assert.equal(second.intervalDays, 3);
    const third = scheduleAfterReview({
      intervalDays: 3,
      easeFactor: second.easeFactor,
      reviewStage: second.reviewStage,
      accuracy: 90,
      from: today,
    });
    assert.ok(third.intervalDays >= 6);
  });
});
