import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { computeReadiness, rankScoreGainOpportunities } from '../readiness.ts';
import type { AppData } from '../../types.ts';

const empty: AppData = {
  studiedTopics: [],
  topicProgress: {},
  questionResults: {},
  quizHistory: [],
  lastOpenedTopic: '',
};

describe('readiness', () => {
  it('returns 0 on empty data', () => {
    const scope = new Set<string>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    const r = computeReadiness(empty, 10, scope);
    assert.equal(r.score, 0);
    assert.equal(r.coveragePct, 0);
  });

  it('rises with study + mastery-shaped progress', () => {
    const scope = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']);
    const data: AppData = {
      ...empty,
      studiedTopics: ['a', 'b', 'c', 'd', 'e'],
      topicProgress: {
        a: { lastStudied: null, nextReview: null, lastQuizDate: null, quizCorrect: 8, quizTotal: 10 },
        b: { lastStudied: null, nextReview: null, lastQuizDate: null, quizCorrect: 9, quizTotal: 10 },
        c: { lastStudied: null, nextReview: null, lastQuizDate: null, quizCorrect: 7, quizTotal: 10 },
      },
    };
    const r = computeReadiness(data, 10, scope);
    assert.ok(r.score > 20);
    assert.equal(r.coveragePct, 50);
  });

  it('rankScoreGainOpportunities prefers low accuracy with attempts', () => {
    const data: AppData = {
      ...empty,
      studiedTopics: ['weak', 'ok'],
      topicProgress: {
        weak: { lastStudied: null, nextReview: null, lastQuizDate: null, quizCorrect: 2, quizTotal: 10 },
        ok: { lastStudied: null, nextReview: null, lastQuizDate: null, quizCorrect: 9, quizTotal: 10 },
      },
    };
    const rows = rankScoreGainOpportunities(data, new Set(['weak', 'ok']), 2);
    assert.ok(rows.length >= 1);
    assert.equal(rows[0].topicId, 'weak');
  });
});
