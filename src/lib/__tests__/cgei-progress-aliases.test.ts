import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  applyCgeiProgressAliases,
  CGEI_TOPIC_TO_LESSON,
  CGEI_CLIMATE_PRIMARY_TOPIC_IDS,
  lessonIdForCgeiTopic,
} from '../cgei-progress-aliases.ts';
import { isCgeiOverviewTopic } from '../../data/cgei/overview.ts';
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
    const ds = Object.keys(CGEI_TOPIC_TO_LESSON).filter((k) => k.startsWith('cgei-ds-'));
    assert.equal(ds.length, 16);
    assert.equal(lessonIdForCgeiTopic('cgei-ds-units-dimensions'), 'cgei-ds-lesson-5-1-1');
    assert.equal(lessonIdForCgeiTopic('cgei-ds-clt-lln-distributions'), 'cgei-ds-lesson-5-1-16');
  });

  it('maps Climate Science legacy topics to Subject 2 lessons (E2)', () => {
    assert.equal(lessonIdForCgeiTopic('cgei-climate-data-products'), 'cgei-cl-lesson-2-4-2');
    assert.equal(lessonIdForCgeiTopic('cgei-time-units-daily'), 'cgei-cl-lesson-2-5-1');
    assert.equal(lessonIdForCgeiTopic('cgei-extremes-and-trend-analysis'), 'cgei-cl-lesson-2-6-1');
    assert.equal(lessonIdForCgeiTopic('cgei-2-4-era5'), 'cgei-cl-lesson-2-4-2');
    assert.equal(lessonIdForCgeiTopic('cgei-2-6-trends'), 'cgei-cl-lesson-2-6-2');
    for (const id of CGEI_CLIMATE_PRIMARY_TOPIC_IDS) {
      assert.ok(lessonIdForCgeiTopic(id), `primary climate topic ${id} must be aliased`);
    }
  });

  it('never maps roadmap overview topics to lessons', () => {
    for (const topicId of Object.keys(CGEI_TOPIC_TO_LESSON)) {
      assert.equal(isCgeiOverviewTopic(topicId), false, `${topicId} must not be an overview id`);
    }
    assert.equal(lessonIdForCgeiTopic('cgei-env-systems-roadmap'), undefined);
    assert.equal(lessonIdForCgeiTopic('cgei-capstone-roadmap'), undefined);
  });

  it('promotes studied legacy topics into studiedCurriculumLessons on load', () => {
    const saved = {
      ...empty,
      studiedTopics: [
        'cgei-ds-units-dimensions',
        'cgei-climate-data-products',
        'cgei-time-units-daily',
        'unrelated-topic',
      ],
      studiedCurriculumLessons: [],
    } as AppData;
    const next = applyCgeiProgressAliases(saved);
    assert.ok(next.studiedCurriculumLessons?.includes('cgei-ds-lesson-5-1-1'));
    assert.ok(next.studiedCurriculumLessons?.includes('cgei-cl-lesson-2-4-2'));
    assert.ok(next.studiedCurriculumLessons?.includes('cgei-cl-lesson-2-5-1'));
    assert.equal(next.studiedCurriculumLessons?.length, 3);
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
