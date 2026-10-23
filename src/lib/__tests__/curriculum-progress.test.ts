import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import type { AppData } from '../../types.ts';
import { markCurriculumLessonStudied, setLastOpenedCurriculumLesson } from '../storage.ts';

function emptyTestData(): AppData {
  return {
    studiedTopics: [],
    studiedCurriculumLessons: [],
    lastOpenedCurriculumLesson: '',
    topicProgress: {},
    questionResults: {},
    quizHistory: [],
    lastOpenedTopic: '',
  };
}

describe('canonical curriculum lesson progress', () => {
  it('records lesson study without contaminating legacy Topic or spaced-repetition state', () => {
    const before = emptyTestData();
    const after = markCurriculumLessonStudied(before, 'cgei-ds-lesson-5-3-1');

    assert.deepEqual(after.studiedCurriculumLessons, ['cgei-ds-lesson-5-3-1']);
    assert.deepEqual(after.studiedTopics, []);
    assert.deepEqual(after.topicProgress, {});
    assert.equal(after.lastOpenedCurriculumLesson, 'cgei-ds-lesson-5-3-1');
    assert.equal(after.lastOpenedTopic, '');
  });

  it('is idempotent and updates the curriculum last-opened pointer independently', () => {
    const first = markCurriculumLessonStudied(emptyTestData(), 'cgei-ds-lesson-5-3-1');
    const second = markCurriculumLessonStudied(first, 'cgei-ds-lesson-5-3-1');
    const last = setLastOpenedCurriculumLesson(second, 'cgei-ds-lesson-5-3-2');

    assert.deepEqual(last.studiedCurriculumLessons, ['cgei-ds-lesson-5-3-1']);
    assert.equal(last.lastOpenedCurriculumLesson, 'cgei-ds-lesson-5-3-2');
    assert.equal(last.lastOpenedTopic, '');
  });
});
