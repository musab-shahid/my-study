import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { AppData, Question, PracticeMode } from '@/types';
import { recordQuizResult } from '../storage.ts';
import { MemoryReviewLog, setDefaultReviewLogForTests } from '../review-log.ts';
import { parseLocalDate } from '@/lib/constants';

const reviewLog = new MemoryReviewLog();

afterEach(() => {
  setDefaultReviewLogForTests(null);
});

describe('quiz aggregate calculation boundary', () => {
  it('calculates quiz aggregates without creating review events as a side effect', async () => {
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

  it('a failed review reschedules soon even after strong history (no pooled-average override)', () => {
    const initial = {
      schemaVersion: 1,
      studiedTopics: [],
      studiedCurriculumLessons: [],
      lastOpenedCurriculumLesson: '',
      topicProgress: {
        'topic-a': {
          lastStudied: '2026-01-01T00:00:00.000Z',
          nextReview: '2026-01-16',
          lastQuizDate: '2026-01-05T00:00:00.000Z',
          quizCorrect: 9,
          quizTotal: 9,
          reviewStage: 4,
          intervalDays: 10,
          easeFactor: 2.5,
          recentSessions: [
            { correct: 3, total: 3, at: 1_767_225_600_000 },
            { correct: 3, total: 3, at: 1_767_312_000_000 },
            { correct: 3, total: 3, at: 1_767_398_400_000 },
          ],
        },
      },
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

    const now = Date.UTC(2026, 0, 15, 12, 0, 0);
    const next = recordQuizResult(
      initial,
      'topic-a',
      [{ questionId: 'question-a', correct: false, selectedIndices: [1] }],
      questions,
      'topic' as PracticeMode,
      undefined,
      undefined,
      now,
    );

    const prog = next.topicProgress['topic-a'];
    // The failed session (0%) must govern: interval resets to 1 day, NOT a
    // 26-day extension produced by the old rolling-average (90%) input.
    assert.equal(prog.intervalDays, 1);
    const due = parseLocalDate(prog.nextReview ?? '');
    const expected = parseLocalDate('2026-01-16');
    assert.equal(due.getTime(), expected.getTime());
  });

  it('uses the passed-in workspace exam sessions for exam-aware compression', () => {
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
      examSessionsByProfile: {},
    } as unknown as AppData;
    const questions = [{
      id: 'question-a',
      topicId: 'topic-a',
      sectionId: 'section-a',
      difficulty: 0.5,
      options: ['A', 'B'],
    }] as unknown as Question[];

    // Success advances the interval to 3 days; an exam in 2 days must compress it.
    const sessions = [{
      id: 'exam-1',
      title: 'Exam soon',
      startsAtIso: new Date(Date.UTC(2026, 0, 17, 9, 0, 0)).toISOString(),
      timeZone: 'UTC',
    }];
    const now = Date.UTC(2026, 0, 15, 12, 0, 0);
    const withExam = recordQuizResult(
      initial,
      'topic-a',
      [{ questionId: 'question-a', correct: true, selectedIndices: [0] }],
      questions,
      'topic' as PracticeMode,
      undefined,
      undefined,
      now,
      sessions as never,
    );
    const withoutExam = recordQuizResult(
      initial,
      'topic-a',
      [{ questionId: 'question-a', correct: true, selectedIndices: [0] }],
      questions,
      'topic' as PracticeMode,
      undefined,
      undefined,
      now,
    );
    assert.ok(
      (withExam.topicProgress['topic-a'].intervalDays ?? 3) <= (withoutExam.topicProgress['topic-a'].intervalDays ?? 3),
      'exam-aware compression must not extend the interval beyond the plain schedule',
    );
  });
});
