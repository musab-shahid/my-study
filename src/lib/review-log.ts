/**
 * Append-only review log. Prefer IndexedDB in the browser; MemoryReviewLog for tests.
 */

import type { ReviewEvent } from './review-event.ts';

const DB_NAME = 'my-study-review-log';
const DB_VERSION = 1;
const STORE = 'events';

export interface ReviewLog {
  append(event: ReviewEvent): Promise<void>;
  appendMany(events: ReviewEvent[]): Promise<void>;
  getAll(): Promise<ReviewEvent[]>;
  getByItem(itemId: string): Promise<ReviewEvent[]>;
  count(): Promise<number>;
  clear(): Promise<void>;
}

/** In-memory log for unit tests and SSR-safe fallbacks. */
export class MemoryReviewLog implements ReviewLog {
  private events: ReviewEvent[] = [];

  async append(event: ReviewEvent): Promise<void> {
    this.events.push(event);
  }

  async appendMany(events: ReviewEvent[]): Promise<void> {
    this.events.push(...events);
  }

  async getAll(): Promise<ReviewEvent[]> {
    return [...this.events].sort((a, b) => a.ts - b.ts);
  }

  async getByItem(itemId: string): Promise<ReviewEvent[]> {
    return this.events.filter((e) => e.itemId === itemId).sort((a, b) => a.ts - b.ts);
  }

  async count(): Promise<number> {
    return this.events.length;
  }

  async clear(): Promise<void> {
    this.events = [];
  }
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('indexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error ?? new Error('idb open failed'));
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('by_ts', 'ts', { unique: false });
        store.createIndex('by_item', 'itemId', { unique: false });
        store.createIndex('by_skill', 'skillId', { unique: false });
      }
    };
  });
}

/** Browser IndexedDB-backed append-only log. */
export class IndexedDbReviewLog implements ReviewLog {
  async append(event: ReviewEvent): Promise<void> {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('idb append failed'));
      tx.objectStore(STORE).put(event);
    });
    db.close();
  }

  async appendMany(events: ReviewEvent[]): Promise<void> {
    if (events.length === 0) return;
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('idb appendMany failed'));
      const store = tx.objectStore(STORE);
      for (const e of events) store.put(e);
    });
    db.close();
  }

  async getAll(): Promise<ReviewEvent[]> {
    const db = await openDb();
    const rows = await new Promise<ReviewEvent[]>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).index('by_ts').getAll();
      req.onsuccess = () => resolve((req.result as ReviewEvent[]) ?? []);
      req.onerror = () => reject(req.error ?? new Error('idb getAll failed'));
    });
    db.close();
    return rows;
  }

  async getByItem(itemId: string): Promise<ReviewEvent[]> {
    const db = await openDb();
    const rows = await new Promise<ReviewEvent[]>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).index('by_item').getAll(itemId);
      req.onsuccess = () => resolve((req.result as ReviewEvent[]) ?? []);
      req.onerror = () => reject(req.error ?? new Error('idb getByItem failed'));
    });
    db.close();
    return rows.sort((a, b) => a.ts - b.ts);
  }

  async count(): Promise<number> {
    const db = await openDb();
    const n = await new Promise<number>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).count();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error ?? new Error('idb count failed'));
    });
    db.close();
    return n;
  }

  async clear(): Promise<void> {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error('idb clear failed'));
      tx.objectStore(STORE).clear();
    });
    db.close();
  }
}

let defaultLog: ReviewLog | null = null;

/** Prefer IndexedDB; fall back to memory when unavailable. */
export function getDefaultReviewLog(): ReviewLog {
  if (defaultLog) return defaultLog;
  if (typeof indexedDB !== 'undefined') {
    defaultLog = new IndexedDbReviewLog();
  } else {
    defaultLog = new MemoryReviewLog();
  }
  return defaultLog;
}

/** Test helper: force a specific log implementation. */
export function setDefaultReviewLogForTests(log: ReviewLog | null): void {
  defaultLog = log;
}
