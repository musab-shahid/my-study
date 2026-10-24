import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  planCloudRestoreWrite,
  CLOUD_RESTORE_RECOVERY_SUFFIX,
  validateCloudRestoreData,
} from '../cloud-restore.ts';
import type { AppData } from '../../types.ts';

const validCloud: AppData = {
  studiedTopics: [],
  topicProgress: {},
  questionResults: {},
  quizHistory: [],
  lastOpenedTopic: '',
  trackMembership: { schemaVersion: 1, enrollments: {}, activeTrackId: null },
};

describe('validateCloudRestoreData', () => {
  it('accepts a coherent current AppData snapshot', () => {
    assert.equal(validateCloudRestoreData(validCloud), true);
  });

  it('rejects payloads that are missing required progress collections', () => {
    assert.equal(validateCloudRestoreData({ version: 1 }), false);
    assert.equal(validateCloudRestoreData({ ...validCloud, questionResults: [] }), false);
  });

  it('rejects malformed nested progress and quiz records', () => {
    assert.equal(
      validateCloudRestoreData({ ...validCloud, topicProgress: { topic: { quizCorrect: 'many' } } }),
      false,
    );
    assert.equal(
      validateCloudRestoreData({ ...validCloud, questionResults: { q1: { correct: 'yes', timestamp: 1 } } }),
      false,
    );
    assert.equal(
      validateCloudRestoreData({ ...validCloud, quizHistory: [{ date: 1, mode: 'unknown', score: 1, total: 2 }] }),
      false,
    );
  });

  it('rejects unsupported track-membership schemas instead of silently downgrading them', () => {
    assert.equal(
      validateCloudRestoreData({
        ...validCloud,
        trackMembership: { schemaVersion: 2, enrollments: {}, activeTrackId: null },
      }),
      false,
    );
  });
});

describe('planCloudRestoreWrite', () => {
  it('orders recovery key before app data and serializes a validated cloud payload', () => {
    const plan = planCloudRestoreWrite('examprep-data', '{"local":true}', validCloud);
    assert.equal(plan.recoveryKey, `examprep-data${CLOUD_RESTORE_RECOVERY_SUFFIX}`);
    assert.equal(plan.recoveryValue, '{"local":true}');
    assert.equal(plan.appDataKey, 'examprep-data');
    assert.equal(plan.appDataValue, JSON.stringify(validCloud));
  });

  it('allows null recovery when there was no prior local snapshot', () => {
    const plan = planCloudRestoreWrite('examprep-data', null, validCloud);
    assert.equal(plan.recoveryValue, null);
    assert.ok(plan.appDataValue.length > 0);
  });

  it('rejects invalid payloads before any write plan is returned', () => {
    assert.throws(
      () => planCloudRestoreWrite('examprep-data', '{"local":true}', { version: 1 } as AppData),
      /invalid or incompatible/,
    );
  });
});
