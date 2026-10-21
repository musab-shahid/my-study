import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getOverallStats } from '../stats.ts';
import type { AppData, Topic, Question } from '../../types.ts';

const emptyData = {
  studiedTopics: [],
  topicProgress: {},
  questionResults: {},
  quizHistory: [],
  lastSelected: {},
  revisionDates: {},
  trackMembership: { version: 1, enrollments: {}, activeTrackId: null },
} as unknown as AppData;

describe('getOverallStats accuracy semantics', () => {
  it('returns null accuracy when there are no attempts', () => {
    const topics = [{ id: 't1', sectionId: 'PHY-01', order: 1, title: 'T', content: true }] as Topic[];
    const questions = [] as Question[];
    const s = getOverallStats(emptyData, topics, questions);
    assert.equal(s.questionsAnswered, 0);
    assert.equal(s.accuracy, null);
  });

  it('returns measured 0% when attempts exist but none correct', () => {
    const topics = [{ id: 't1', sectionId: 'PHY-01', order: 1, title: 'T', content: true }] as Topic[];
    const data = {
      ...emptyData,
      quizHistory: [{ topicId: 't1', subjectId: 'physics', score: 0, total: 5, timestamp: Date.now() }],
    } as unknown as AppData;
    const s = getOverallStats(data, topics, []);
    assert.equal(s.questionsAnswered, 5);
    assert.equal(s.accuracy, 0);
  });
});
