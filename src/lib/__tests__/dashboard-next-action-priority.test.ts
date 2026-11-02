import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getDashboardRecommendation, type AttentionItems } from '../attention';

const base: AttentionItems = {
  dueReviews: [],
  dueReviewCount: 0,
  weakTopics: [],
  unfinished: null,
  daysSinceLastActivity: 0,
};

describe('dashboard next-action priority', () => {
  it('puts any due reviews ahead of the next lesson', () => {
    const attention: AttentionItems = {
      ...base,
      dueReviews: [{ topicId: 'topic-1', dateStr: '2026-11-02', accuracy: 72, group: 'review' }],
      dueReviewCount: 1,
      unfinished: { topicId: 'topic-2', reason: 'not_started' },
    };
    const recommendation = getDashboardRecommendation(attention);
    assert.equal(recommendation.kind, 'review');
    assert.equal(recommendation.payload.screen, 'review');
    assert.match(recommendation.headline, /1 topics due for review/);
  });

  it('keeps the next lesson ahead of weak-topic practice when no reviews are due', () => {
    const attention: AttentionItems = {
      ...base,
      weakTopics: [
        { topicId: 'weak-1', accuracy: 20 },
        { topicId: 'weak-2', accuracy: 30 },
        { topicId: 'weak-3', accuracy: 40 },
      ],
      unfinished: { topicId: 'topic-2', reason: 'not_started' },
    };
    assert.equal(getDashboardRecommendation(attention).kind, 'continue');
  });
});
