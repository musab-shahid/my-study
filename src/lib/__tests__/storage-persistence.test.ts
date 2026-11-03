import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { requestPersistentStorage } from '../storage-persistence.ts';

describe('browser storage persistence request', () => {
  it('reports an already-persisted origin without requesting again', async () => {
    let requested = false;
    const result = await requestPersistentStorage({
      persisted: async () => true,
      persist: async () => { requested = true; return true; },
      estimate: async () => ({ usage: 1024, quota: 4096 }),
    });
    assert.equal(result.status, 'already-persisted');
    assert.equal(requested, false);
    assert.equal(result.usage, 1024);
    assert.equal(result.quota, 4096);
  });

  it('reports a newly granted request', async () => {
    const result = await requestPersistentStorage({
      persisted: async () => false,
      persist: async () => true,
    });
    assert.equal(result.status, 'granted');
  });

  it('reports a denied request without claiming data is protected', async () => {
    const result = await requestPersistentStorage({
      persisted: async () => false,
      persist: async () => false,
    });
    assert.equal(result.status, 'denied');
  });

  it('handles unsupported browsers and API failures', async () => {
    assert.deepEqual(await requestPersistentStorage(null), { status: 'unsupported' });
    assert.deepEqual(await requestPersistentStorage({}), { status: 'unsupported' });
    assert.deepEqual(await requestPersistentStorage({
      persist: async () => { throw new Error('not available'); },
    }), { status: 'error' });
  });

  it('does not turn an optional estimate failure into a persistence failure', async () => {
    const result = await requestPersistentStorage({
      persisted: async () => false,
      persist: async () => true,
      estimate: async () => { throw new Error('estimate unavailable'); },
    });
    assert.equal(result.status, 'granted');
    assert.equal(result.usage, undefined);
  });
});
