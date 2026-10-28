import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { ReviewEvent } from '../review-event.ts';
import { compareSchedulersOnLog, updateSm2Shadow, predictSm2Recall } from '../fsrs-shadow-compare.ts';
import { rankTopicsForExamDay, planDailyWorkload } from '../exam-planner.ts';
import { stickyDistractors, computeDistractorStats } from '../distractor-analytics.ts';

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

describe('fsrs shadow compare', () => {
  it('returns null metrics on empty or single-touch log', () => {
    const r = compareSchedulersOnLog([
      ev({ itemId: 'a', correct: true, ts: 1 }),
    ]);
    assert.equal(r.predictionCount, 0);
    assert.equal(r.fsrsLogLoss, null);
  });

  it('produces comparable log loss when items are reviewed twice', () => {
    const events = [
      ev({ itemId: 'a', correct: true, ts: 1, confidence: 2 }),
      ev({ itemId: 'b', correct: false, ts: 2, confidence: 3 }),
      ev({
        itemId: 'a',
        correct: true,
        ts: 1 + 3 * 86_400_000,
        confidence: 2,
      }),
      ev({
        itemId: 'b',
        correct: true,
        ts: 2 + 1 * 86_400_000,
        confidence: 1,
      }),
    ];
    const r = compareSchedulersOnLog(events);
    assert.ok(r.predictionCount >= 2);
    assert.ok(r.fsrsLogLoss != null && r.fsrsLogLoss > 0);
    assert.ok(r.sm2LogLoss != null && r.sm2LogLoss > 0);
    assert.ok(r.constant68LogLoss != null);
  });

  it('grows SM-2 interval after good reviews', () => {
    let s = updateSm2Shadow(undefined, ev({ itemId: 'x', correct: true, ts: 0, confidence: 3 }));
    s = updateSm2Shadow(s, ev({ itemId: 'x', correct: true, ts: 86_400_000, confidence: 3 }));
    assert.ok(s.intervalDays >= 1);
    const p = predictSm2Recall(s, s.lastTs + s.intervalDays * 86_400_000);
    assert.ok(p > 0.2 && p < 1);
  });
});

describe('exam planner', () => {
  it('ranks higher weight + lower recall first', () => {
    const ranked = rankTopicsForExamDay([
      { topicId: 't1', blueprintId: 'atmosphere', predictedRecall: 0.9, due: false },
      { topicId: 't2', blueprintId: 'atmosphere', predictedRecall: 0.2, due: true },
      { topicId: 't3', blueprintId: 'climate', predictedRecall: 0.2, due: false },
    ]);
    assert.equal(ranked[0].topicId, 't2');
  });

  it('flags overload when due work exceeds budget', () => {
    const plan = planDailyWorkload({
      dueTopicCount: 20,
      minutesPerDueTopic: 12,
      dailyBudgetMinutes: 60,
      sessions: [],
    });
    assert.equal(plan.overloaded, true);
    assert.ok(plan.suggestedMinutes <= 60);
  });
});

describe('distractor analytics', () => {
  it('flags sticky wrong options', () => {
    const events = [
      ev({ itemId: 'q1', correct: false, ts: 1, chosenOption: '2' }),
      ev({ itemId: 'q1', correct: false, ts: 2, chosenOption: '2' }),
      ev({ itemId: 'q1', correct: true, ts: 3, chosenOption: '0' }),
      ev({ itemId: 'q1', correct: false, ts: 4, chosenOption: '1' }),
    ];
    const stats = computeDistractorStats(events);
    assert.ok(stats.some((s) => s.chosenOption === '2' && s.wrongCount === 2));
    const sticky = stickyDistractors(events, { minWrong: 2, minShare: 0.25 });
    assert.ok(sticky.some((s) => s.chosenOption === '2'));
  });
});
