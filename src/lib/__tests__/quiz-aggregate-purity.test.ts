import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { AppData, Question, PracticeMode } from '@/types';
import { recordQuizResult } from '../storage.ts';
import { MemoryReviewLog, setDefaultReviewLogForTests } from '../review-log.ts';

const reviewLog = new MemoryReviewLog();

afterEach(() => {
  setDefaultReviewLogForTests(null);
});

describe('quiz aggregate calculation boundary', () => {
  it('calculates quiz aggregates without creating review events as a side effect', () => {
    setDefaultReviewLogForTests(reviewLog);

    const initial = {
      schemaVersion: 1,
      studiedTopics: [],
      studiedCurriculumLessons: [],
      lastOpenedCurriculumLesson: '',
      topicProgress: {},
      questionResults: {},
      quizHistory: [],
      revisionDates: {},
      lastOpenedTopic: '',
    } as unknown as AppData;
    const questions = [{
      id: 'question-a',
      topicId: 'topic-a',
      sectionId: 'section-a',
      difficulty: 0.5,
      options: ['A', 'B'],
    }] as unknown as Question[];

    const next = recordQuizResult(
      initial,
      'topic-a',
      [{ questionId: 'question-a', correct: true, confidence: 3, latencyMs: 1200, selectedIndices: [0] }],
      questions,
      'topic' as PracticeMode,
      undefined,
      undefined,
      1_800_000_000_000,
    );

    assert.equal(next.quizHistory.length, 1);
    assert.equal(next.quizHistory[0].date, 1_800_000_000_000);
    assert.equal(next.quizHistory[0].score, 1);
    assert.equal(next.quizHistory[0].total, 1);
    assert.equal(next.topicProgress['topic-a'].quizCorrect, 1);
    assert.equal(next.topicProgress['topic-a'].quizTotal, 1);
    assert.equal(initial.quizHistory.length, 0);
    assert.equal(await reviewLog.count(), 0);
  });
});
