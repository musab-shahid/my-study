import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { shuffleOptions, collectLessonChecks, bankQuestionToCheck, getVisibleLessonChecks, LESSON_CHECK_DISPLAY_LIMIT } from '../cgei-lesson-questions.ts';
import type { Question } from '../../types.ts';

describe('cgei-lesson-questions', () => {
  it('shuffles options and remaps the correct index', () => {
    const options = ['A', 'B', 'C', 'D'];
    const correctAnswer = 1; // B
    // Deterministic: always pick j=0 when i>0 → reverses toward front
    let calls = 0;
    const random = () => {
      calls += 1;
      return 0; // always swap with index 0
    };
    const result = shuffleOptions(options, correctAnswer, random);
    assert.equal(result.options.length, 4);
    assert.equal(result.options[result.correctAnswer], 'B');
    assert.ok(calls > 0);
  });

  it('only maps single and true_false bank questions for lesson checks', () => {
    const multi: Question = {
      id: 'x',
      sectionId: 'CGEI-01',
      topicId: 't',
      difficulty: 'easy',
      type: 'multi',
      question: 'pick',
      options: ['a', 'b'],
      correctAnswer: [0],
      explanation: 'e',
      sourceCitation: 's',
      lessonId: 'lesson-1',
    };
    assert.equal(bankQuestionToCheck(multi), null);
  });

  it('caps the initial lesson-page list but preserves an explicit show-all path', () => {
    const items = Array.from({ length: 8 }, (_, index) => ({
      id: `q${index + 1}`, prompt: `Question ${index + 1}`, options: ['a', 'b'],
      correctAnswer: 0, difficulty: 'easy', explanation: '', source: 'bank' as const,
    }));
    assert.equal(LESSON_CHECK_DISPLAY_LIMIT, 5);
    assert.equal(getVisibleLessonChecks(items, false).length, 5);
    assert.equal(getVisibleLessonChecks(items, true).length, 8);
    assert.equal(items.length, 8, 'display cap must not mutate or delete source items');
  });

  it('collects bank questions by lessonId and dedupes against curriculum', () => {
    const bank: Question[] = [
      {
        id: 'q1',
        sectionId: 'CGEI-01',
        topicId: 't',
        difficulty: 'easy',
        type: 'single',
        question: 'Bank prompt',
        options: ['a', 'b'],
        correctAnswer: 0,
        explanation: 'because a',
        sourceCitation: 'src',
        lessonId: 'lesson-1',
      },
    ];
    const items = collectLessonChecks({
      lessonId: 'lesson-1',
      assessmentQuestionIds: [],
      curriculumQuestions: [],
      bankQuestions: bank,
    });
    assert.equal(items.length, 1);
    assert.equal(items[0]?.prompt, 'Bank prompt');
    assert.equal(items[0]?.source, 'bank');
  });
});
