import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { STORAGE_KEYS } from '../constants.ts';
import { CLOUD_RESTORE_RECOVERY_SUFFIX } from '../cloud-restore.ts';
import { consumeStorageWarning, flushPendingSave, loadData, resetData, saveData } from '../storage.ts';

const BACKUP_KEY = 'examprep-data-backup';
const originalLocalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');

function installLocalStorage(initial: Record<string, string> = {}, failOnKey?: string) {
  const values = new Map(Object.entries(initial));
  const storage = {
    get length() { return values.size; },
    clear() { values.clear(); },
    getItem(key: string) { return values.get(key) ?? null; },
    key(index: number) { return [...values.keys()][index] ?? null; },
    removeItem(key: string) { values.delete(key); },
    setItem(key: string, value: string) {
      if (key === failOnKey) throw new Error('Storage quota exceeded');
      values.set(key, String(value));
    },
  } as Storage;
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: storage,
  });
  return storage;
}

afterEach(() => {
  if (originalLocalStorage) {
    Object.defineProperty(globalThis, 'localStorage', originalLocalStorage);
  } else {
    Reflect.deleteProperty(globalThis, 'localStorage');
  }
  consumeStorageWarning();
});

describe('storage reset safety', () => {
  it('round-trips valid exam settings and quarantines malformed optional settings without losing progress', () => {
    const storage = installLocalStorage();
    const data = loadData();
    data.studiedTopics = ['topic-a'];
    data.examSessionsByProfile = {
      'fpsc:general': [{
        id: 'configured-exam',
        label: 'Configured exam',
        startsAtIso: '2027-01-12T09:00:00.000Z',
        timeZone: 'UTC',
        note: '',
      }],
      'hat:general': [{ id: 'broken', label: 'Broken', startsAtIso: 'not-a-date' }] as unknown as NonNullable<typeof data.examSessionsByProfile>[string],
    };

    saveData(data);
    assert.equal(flushPendingSave(), true);
    const loaded = loadData();

    assert.deepEqual(loaded.studiedTopics, ['topic-a']);
    assert.deepEqual(Object.keys(loaded.examSessionsByProfile ?? {}), ['fpsc:general']);
    assert.equal(loaded.examSessionsByProfile?.['fpsc:general']?.[0]?.label, 'Configured exam');
    assert.equal(storage.getItem(STORAGE_KEYS.appData) !== null, true);
  });

  it('cancels reset when the backup cannot be written and keeps pending data recoverable', () => {
    const storage = installLocalStorage({}, BACKUP_KEY);
    const data = loadData();
    data.lastOpenedTopic = 'pending-topic';
    saveData(data);

    assert.equal(resetData(), false);
    assert.match(consumeStorageWarning() ?? '', /Reset cancelled so your data is not lost/);

    // The pending in-memory state must survive the cancelled reset and remain
    // writable if storage becomes available again.
    assert.equal(flushPendingSave(), true);
    const saved = JSON.parse(storage.getItem(STORAGE_KEYS.appData) ?? 'null') as { lastOpenedTopic?: string } | null;
    assert.equal(saved?.lastOpenedTopic, 'pending-topic');
  });

  it('restores a valid backup without overwriting it with malformed primary JSON', () => {
    const storage = installLocalStorage();
    const validSnapshot = JSON.stringify(loadData());
    storage.setItem(BACKUP_KEY, validSnapshot);
    storage.setItem(STORAGE_KEYS.appData, '{not valid json');

    const loaded = loadData();

    assert.deepEqual(loaded, JSON.parse(validSnapshot));
    assert.equal(storage.getItem(BACKUP_KEY), validSnapshot);
    assert.deepEqual(
      JSON.parse(storage.getItem(STORAGE_KEYS.appData) ?? 'null'),
      JSON.parse(validSnapshot),
    );
  });

  it('restores a pre-restore snapshot if the primary key is missing', () => {
    const storage = installLocalStorage();
    const validSnapshot = JSON.stringify(loadData());
    const recoveryKey = `${STORAGE_KEYS.appData}${CLOUD_RESTORE_RECOVERY_SUFFIX}`;
    storage.setItem(recoveryKey, validSnapshot);

    const loaded = loadData();

    assert.deepEqual(loaded, JSON.parse(validSnapshot));
    assert.ok(storage.getItem(STORAGE_KEYS.appData));
    assert.equal(storage.getItem(recoveryKey), null);
  });

  it('does not undo an intentional reset by restoring the ordinary backup when primary is absent', () => {
    const storage = installLocalStorage();
    const validSnapshot = JSON.stringify(loadData());
    storage.setItem(BACKUP_KEY, validSnapshot);

    const loaded = loadData();

    assert.deepEqual(loaded, JSON.parse(validSnapshot));
    // No primary and no cloud-recovery key: ordinary reset semantics remain intact.
    assert.equal(storage.getItem(STORAGE_KEYS.appData), null);
    assert.equal(storage.getItem(BACKUP_KEY), validSnapshot);
  });

  it('uses the pre-restore recovery snapshot if primary data is corrupt', () => {
    const storage = installLocalStorage();
    const validSnapshot = JSON.stringify(loadData());
    const recoveryKey = `${STORAGE_KEYS.appData}${CLOUD_RESTORE_RECOVERY_SUFFIX}`;
    storage.setItem(recoveryKey, validSnapshot);
    storage.setItem(STORAGE_KEYS.appData, '{not valid json');

    const loaded = loadData();

    assert.deepEqual(loaded, JSON.parse(validSnapshot));
    assert.deepEqual(
      JSON.parse(storage.getItem(STORAGE_KEYS.appData) ?? 'null'),
      JSON.parse(validSnapshot),
    );
    assert.equal(storage.getItem(recoveryKey), null);
  });

  it('preserves malformed primary bytes for export when no valid backup exists', () => {
    const storage = installLocalStorage();
    const corruptRaw = '{not valid json';
    storage.setItem(STORAGE_KEYS.appData, corruptRaw);

    const loaded = loadData();

    assert.equal(storage.getItem(BACKUP_KEY), corruptRaw);
    assert.deepEqual(
      JSON.parse(storage.getItem(STORAGE_KEYS.appData) ?? 'null'),
      JSON.parse(JSON.stringify(loaded)),
    );
  });

  it('restores a valid backup when the primary JSON has an invalid schema', () => {
    const storage = installLocalStorage();
    const validSnapshot = JSON.stringify(loadData());
    storage.setItem(BACKUP_KEY, validSnapshot);
    storage.setItem(STORAGE_KEYS.appData, JSON.stringify({ version: 999, topicProgress: [] }));

    const loaded = loadData();

    assert.deepEqual(loaded, JSON.parse(validSnapshot));
    assert.equal(storage.getItem(BACKUP_KEY), validSnapshot);
    assert.deepEqual(
      JSON.parse(storage.getItem(STORAGE_KEYS.appData) ?? 'null'),
      JSON.parse(validSnapshot),
    );
  });

  it('backs up existing saved data before removing app and preference keys', () => {
    const raw = JSON.stringify({ saved: true });
    const storage = installLocalStorage({
      [STORAGE_KEYS.appData]: raw,
      [STORAGE_KEYS.legacyAppData]: 'legacy',
      [STORAGE_KEYS.subjectSelection]: 'subjects',
      [STORAGE_KEYS.practicePrefs]: 'practice',
      [STORAGE_KEYS.quizProgress]: 'quiz',
      [STORAGE_KEYS.sidebarExpanded]: 'sidebar',
    });

    assert.equal(resetData(), true);
    assert.equal(storage.getItem(BACKUP_KEY), raw);
    assert.equal(storage.getItem(STORAGE_KEYS.appData), null);
    assert.equal(storage.getItem(STORAGE_KEYS.legacyAppData), null);
    assert.equal(storage.getItem(STORAGE_KEYS.subjectSelection), null);
    assert.equal(storage.getItem(STORAGE_KEYS.practicePrefs), null);
    assert.equal(storage.getItem(STORAGE_KEYS.quizProgress), null);
    assert.equal(storage.getItem(STORAGE_KEYS.sidebarExpanded), null);
  });
});
