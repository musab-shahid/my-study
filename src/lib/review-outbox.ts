import type { ReviewEvent } from './review-event.ts';
import { ReviewLogPersistenceError } from './review-log.ts';

const DB_NAME = 'my-study-review-outbox';
const DB_VERSION = 1;
const STORE = 'pending-events';

export interface ReviewOutbox {
  enqueueMany(events: ReviewEvent[]): Promise<void>;
  getAll(): Promise<ReviewEvent[]>;
  removeMany(ids: string[]): Promise<void>;
}

export class MemoryReviewOutbox implements ReviewOutbox {
  private events = new Map<string, ReviewEvent>();

  async enqueueMany(events: ReviewEvent[]): Promise<void> {
    for (const event of events) {
      const existing = this.events.get(event.id);
      if (existing && JSON.stringify(existing) !== JSON.stringify(event)) {
        throw new ReviewLogPersistenceError('duplicate_id_conflict', `Outbox event ${event.id} has a conflicting payload`, event.id);
      }
    }
    for (const event of events) this.events.set(event.id, event);
  }

  async getAll(): Promise<ReviewEvent[]> {
    return [...this.events.values()].sort((a, b) => a.ts - b.ts);
  }

  async removeMany(ids: string[]): Promise<void> {
    for (const id of ids) this.events.delete(id);
  }
}

function openOutboxDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new ReviewLogPersistenceError('idb_unavailable', 'IndexedDB unavailable; review events cannot be queued for reload recovery'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(new ReviewLogPersistenceError('idb_open_failed', request.error?.message ?? 'Review outbox could not be opened'));
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) {
        request.result.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
  });
}

export class IndexedDbReviewOutbox implements ReviewOutbox {
  async enqueueMany(events: ReviewEvent[]): Promise<void> {
    if (events.length === 0) return;
    const db = await openOutboxDb();
    try {
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        const store = tx.objectStore(STORE);
        let settled = false;
        const fail = (error: Error) => {
          if (settled) return;
          settled = true;
          try { tx.abort(); } catch { /* transaction may already be inactive */ }
          reject(error);
        };
        tx.oncomplete = () => { if (!settled) { settled = true; resolve(); } };
        tx.onerror = () => fail(new ReviewLogPersistenceError('idb_transaction_failed', tx.error?.message ?? 'Review outbox enqueue failed'));
        tx.onabort = () => fail(new ReviewLogPersistenceError('idb_transaction_failed', tx.error?.message ?? 'Review outbox enqueue aborted'));

        for (const event of events) {
          const get = store.get(event.id);
          get.onerror = () => fail(new ReviewLogPersistenceError('idb_transaction_failed', get.error?.message ?? 'Review outbox lookup failed'));
          get.onsuccess = () => {
            if (settled) return;
            const existing = get.result as ReviewEvent | undefined;
            if (existing && JSON.stringify(existing) !== JSON.stringify(event)) {
              fail(new ReviewLogPersistenceError('duplicate_id_conflict', `Outbox event ${event.id} has a conflicting payload`, event.id));
              return;
            }
            if (!existing) {
              const add = store.add(event);
              add.onerror = () => fail(new ReviewLogPersistenceError('idb_transaction_failed', add.error?.message ?? 'Review outbox insert failed'));
            }
          };
        }
      });
    } finally {
      db.close();
    }
  }

  async getAll(): Promise<ReviewEvent[]> {
    const db = await openOutboxDb();
    try {
      return await new Promise<ReviewEvent[]>((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const request = tx.objectStore(STORE).getAll();
        request.onsuccess = () => resolve((request.result as ReviewEvent[]).sort((a, b) => a.ts - b.ts));
        request.onerror = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', request.error?.message ?? 'Review outbox read failed'));
      });
    } finally {
      db.close();
    }
  }

  async removeMany(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    const db = await openOutboxDb();
    try {
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', tx.error?.message ?? 'Review outbox cleanup failed'));
        tx.onabort = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', tx.error?.message ?? 'Review outbox cleanup aborted'));
        const store = tx.objectStore(STORE);
        for (const id of ids) store.delete(id);
      });
    } finally {
      db.close();
    }
  }
}

let defaultOutbox: ReviewOutbox | null = null;

export function getDefaultReviewOutbox(): ReviewOutbox {
  if (!defaultOutbox) {
    // Never use an in-memory queue in production: reporting it as durable
    // would falsely promise reload recovery when IndexedDB is unavailable.
    defaultOutbox = new IndexedDbReviewOutbox();
  }
  return defaultOutbox;
}

export function setDefaultReviewOutboxForTests(outbox: ReviewOutbox | null): void {
  defaultOutbox = outbox;
}
