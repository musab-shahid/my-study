import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { clearTutorData, getTutorMemoryRecords } from '../ai-tutor-storage.ts';

function makeStorage(seed: Record<string, string>): Storage {
  const values = new Map(Object.entries(seed));
  return {
    get length() { return values.size; },
    clear() { values.clear(); },
    getItem(key: string) { return values.get(key) ?? null; },
    key(index: number) { return Array.from(values.keys())[index] ?? null; },
    removeItem(key: string) { values.delete(key); },
    setItem(key: string, value: string) { values.set(key, String(value)); },
  } as Storage;
}

describe('AI tutor local data controls', () => {
  it('clears chat histories and memory across topics without touching study data', () => {
    const original = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: makeStorage({
        'ai-tutor-chat:topic-a': '[{"role":"user","content":"hello"}]',
        'ai-tutor-chat:topic-b': '[]',
        'ai-tutor-memory:topic-a': '[{"at":100,"note":"struggle"}]',
        'ai-tutor-memory:topic-c': '[]',
        'my-study-app-data': '{"progress":true}',
        'examprep-supabase-access-token': 'session-token',
      }),
    });

    try {
      const records = getTutorMemoryRecords();
      assert.deepEqual(records, [{ topicKey: 'topic-a', notes: ['struggle'] }]);

      const result = clearTutorData();
      assert.deepEqual(result, { ok: true, chatThreads: 2, memoryTopics: 2 });
      assert.equal(localStorage.getItem('ai-tutor-chat:topic-a'), null);
      assert.equal(localStorage.getItem('ai-tutor-memory:topic-a'), null);
      assert.equal(localStorage.getItem('my-study-app-data'), '{"progress":true}');
      assert.equal(localStorage.getItem('examprep-supabase-access-token'), 'session-token');
    } finally {
      if (original) Object.defineProperty(globalThis, 'localStorage', original);
      else Reflect.deleteProperty(globalThis, 'localStorage');
    }
  });
});
