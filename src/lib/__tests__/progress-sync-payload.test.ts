import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { pushProgress } from '../progress-sync.ts';
import type { AppData } from '../../types.ts';

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

describe('pushProgress payload integrity', () => {
  it('rejects malformed local progress before auth checks or network requests', async () => {
    let fetchCalled = false;
    globalThis.fetch = (async () => {
      fetchCalled = true;
      throw new Error('fetch must not be called for invalid data');
    }) as typeof fetch;

    const result = await pushProgress({
      studiedTopics: [],
      topicProgress: {},
      questionResults: [],
      quizHistory: [],
      lastOpenedTopic: '',
    } as unknown as AppData);

    assert.deepEqual(result, { ok: false, error: 'invalid-local-data' });
    assert.equal(fetchCalled, false);
  });

  it('rejects invalid nested records before attempting cloud persistence', async () => {
    let fetchCalled = false;
    globalThis.fetch = (async () => {
      fetchCalled = true;
      throw new Error('fetch must not be called for invalid data');
    }) as typeof fetch;

    const result = await pushProgress({
      studiedTopics: [],
      topicProgress: { 'topic-a': { quizCorrect: 'many' } },
      questionResults: {},
      quizHistory: [],
      lastOpenedTopic: '',
      trackMembership: { schemaVersion: 1, enrollments: {}, activeTrackId: null },
    } as unknown as AppData);

    assert.deepEqual(result, { ok: false, error: 'invalid-local-data' });
    assert.equal(fetchCalled, false);
  });
});
