import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createRecoveryBackup } from '../storage.ts';
import type { AppData } from '../../types.ts';

const originalLocalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');

function installLocalStorage(setItem: (key: string, value: string) => void) {
  const values = new Map<string, string>();
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => setItem(key, value),
      removeItem: (key: string) => values.delete(key),
    },
  });
  return values;
}

afterEach(() => {
  if (originalLocalStorage) {
    Object.defineProperty(globalThis, 'localStorage', originalLocalStorage);
  } else {
    delete (globalThis as { localStorage?: unknown }).localStorage;
  }
});

const sampleData: AppData = {
  studiedTopics: ['topic-a'],
  studiedCurriculumLessons: [],
  lastOpenedCurriculumLesson: '',
  topicProgress: {},
  questionResults: {},
  quizHistory: [],
  revisionDates: {},
  lastOpenedTopic: 'topic-a',
  trackMembership: {
    schemaVersion: 1,
    enrollments: {},
    activeTrackId: null,
  },
};

describe('partial reset recovery backup', () => {
  it('stores the current progress snapshot before destructive changes', () => {
    const values = installLocalStorage((key, value) => values.set(key, value));
    assert.equal(createRecoveryBackup(sampleData), true);
    const saved = values.get('examprep-data-backup');
    assert.ok(saved);
    assert.deepEqual(JSON.parse(saved), sampleData);
  });

  it('cancels when the browser refuses to write the recovery snapshot', () => {
    installLocalStorage(() => {
      throw new Error('quota exceeded');
    });
    assert.equal(createRecoveryBackup(sampleData), false);
  });
});
