import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  applyCgeiProgressAliases,
  CGEI_TOPIC_TO_LESSON,
  lessonIdForCgeiTopic,
} from '../cgei-progress-aliases.ts';
import type { AppData } from '../../types.ts';

const empty = {
  studiedTopics: [],
  studiedCurriculumLessons: [],
  topicProgress: {},
  revisionDates: {},
  quizHistory: [],
  questionResults: {},
} as unknown as AppData;

describe('CGEI progress aliases (Phase E)', () => {
  it('maps all 16 Unit 5.1 legacy topics to lessons', () => {
    assert.equal(Object.keys(CGEI_TOPIC_TO_LESSON).length, 16);
    assert.equal(lessonIdForCgeiTopic('cgei-ds-units-dimensions'), 'cgei-ds-lesson-5-1-1');
    assert.equal(lessonIdForCgeiTopic('cgei-ds-clt-lln-distributions'), 'cgei-ds-lesson-5-1-16');
    assert.equal(lessonIdForCgeiTopic('cgei-env-systems-roadmap'), undefined);
  });

  it('promotes studied legacy topics into studiedCurriculumLessons on load', () => {
    const saved = {
      ...empty,
      studiedTopics: ['cgei-ds-units-dimensions', 'cgei-ds-energy-balance', 'unrelated-topic'],
      studiedCurriculumLessons: [],
    } as AppData;
    const next = applyCgeiProgressAliases(saved);
    assert.ok(next.studiedCurriculumLessons?.includes('cgei-ds-lesson-5-1-1'));
    assert.ok(next.studiedCurriculumLessons?.includes('cgei-ds-lesson-5-1-7'));
    assert.equal(next.studiedCurriculumLessons?.length, 2);
  });

  it('is idempotent when lesson progress already present', () => {
    const saved = {
      ...empty,
      studiedTopics: ['cgei-ds-units-dimensions'],
      studiedCurriculumLessons: ['cgei-ds-lesson-5-1-1'],
    } as AppData;
    const next = applyCgeiProgressAliases(saved);
    assert.equal(next, saved);
  });
});
