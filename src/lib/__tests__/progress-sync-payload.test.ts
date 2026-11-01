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

  it('rejects non-finite schemaVersion', () => {
    assert.deepEqual(
      validateLocalProgressForCloudPush({
        ...validData,
        schemaVersion: Number.NaN,
      }),
      { ok: false, error: 'invalid-local-data' },
    );
  });

  it('rejects malformed examSessionsByProfile entries', () => {
    assert.deepEqual(
      validateLocalProgressForCloudPush({
        ...validData,
        examSessionsByProfile: { 'track:general': [{ id: 123 }] },
      }),
      { ok: false, error: 'invalid-local-data' },
    );
  });
});

describe('UTF-8 payload byte length', () => {
  it('UTF-8 byte length exceeds string length for multi-byte content', () => {
    const multi = '€'.repeat(50);
    const encoded = JSON.stringify({ note: multi });
    const charLen = encoded.length;
    const byteLen = new TextEncoder().encode(encoded).byteLength;
    assert.ok(byteLen > charLen);
  });
});
