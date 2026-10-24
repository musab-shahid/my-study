import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateLocalProgressForCloudPush } from '../cloud-restore.ts';
import type { AppData } from '../../types.ts';

const validData: AppData = {
  studiedTopics: [],
  topicProgress: {},
  questionResults: {},
  quizHistory: [],
  lastOpenedTopic: '',
  trackMembership: { schemaVersion: 1, enrollments: {}, activeTrackId: null },
};

describe('validateLocalProgressForCloudPush', () => {
  it('accepts a valid local snapshot for cloud persistence', () => {
    assert.deepEqual(validateLocalProgressForCloudPush(validData), { ok: true, data: validData });
  });

  it('rejects malformed top-level data with a stable error', () => {
    assert.deepEqual(
      validateLocalProgressForCloudPush({
        studiedTopics: [],
        topicProgress: {},
        questionResults: [],
        quizHistory: [],
        lastOpenedTopic: '',
      }),
      { ok: false, error: 'invalid-local-data' },
    );
  });

  it('rejects malformed nested progress records', () => {
    assert.deepEqual(
      validateLocalProgressForCloudPush({
        ...validData,
        topicProgress: { 'topic-a': { quizCorrect: 'many' } },
      }),
      { ok: false, error: 'invalid-local-data' },
    );
  });
});
