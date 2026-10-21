import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { planCloudRestoreWrite, CLOUD_RESTORE_RECOVERY_SUFFIX } from '../cloud-restore.ts';
import type { AppData } from '../../types.ts';

const minimalCloud = { version: 1 } as unknown as AppData;

describe('planCloudRestoreWrite', () => {
  it('orders recovery key before app data and serializes cloud payload', () => {
    const plan = planCloudRestoreWrite('examprep-data', '{"local":true}', minimalCloud);
    assert.equal(plan.recoveryKey, `examprep-data${CLOUD_RESTORE_RECOVERY_SUFFIX}`);
    assert.equal(plan.recoveryValue, '{"local":true}');
    assert.equal(plan.appDataKey, 'examprep-data');
    assert.equal(plan.appDataValue, JSON.stringify(minimalCloud));
  });

  it('allows null recovery when there was no prior local snapshot', () => {
    const plan = planCloudRestoreWrite('examprep-data', null, minimalCloud);
    assert.equal(plan.recoveryValue, null);
    assert.ok(plan.appDataValue.length > 0);
  });

  it('never implies reload-before-write (caller must write both keys first)', () => {
    const plan = planCloudRestoreWrite('examprep-data', '{}', minimalCloud);
    // Contract: both write targets are present in the plan object before any reload.
    assert.ok(plan.recoveryKey);
    assert.ok(plan.appDataKey);
    assert.notEqual(plan.recoveryKey, plan.appDataKey);
  });
});
