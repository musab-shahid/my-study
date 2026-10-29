/**
 * Append-only review log. Prefer IndexedDB in the browser; MemoryReviewLog for tests.
 * Idempotency: same ID + same payload = no-op; same ID + different payload = conflict.
 */

import {
  validateReviewEvent,
  type ReviewEvent,
} from './review-event.ts';

const DB_NAME = 'my-study-review-log';
const DB_VERSION = 1;
const STORE = 'events';

/** Error categories for log operations. */
export type ReviewLogError =
  | 'invalid_event'
  | 'duplicate_id_conflict'
  | 'batch_conflict'
  | 'idb_unavailable'
  | 'idb_open_failed'
  | 'idb_transaction_failed';

export class ReviewLogPersistenceError extends Error {
  category: ReviewLogError;
  conflictingId?: string;
  constructor(category: ReviewLogError, message: string, conflictingId?: string) {
    super(message);
    this.name = 'ReviewLogPersistenceError';
    this.category = category;
    this.conflictingId = conflictingId;
  }
}

export interface ReviewLog {
  append(event: ReviewEvent): Promise<void>;
  appendMany(events: ReviewEvent[]): Promise<void>;
  getAll(): Promise<ReviewEvent[]>;
  getByItem(itemId: string): Promise<ReviewEvent[]>;
  count(): Promise<number>;
  clear(): Promise<void>;
}

/** Serialize event for payload comparison (stable key order). */
function eventKey(e: ReviewEvent): string {
  return JSON.stringify({
    id: e.id,
    ts: e.ts,
    deviceId: e.deviceId,
    sessionId: e.sessionId,
    itemId: e.itemId,
    skillId: e.skillId,
    mode: e.mode,
    correct: e.correct,
    latencyMs: e.latencyMs,
    confidence: e.confidence,
    chosenOption: e.chosenOption,
    algoVersion: e.algoVersion,
  });
}

/** In-memory log for unit tests and SSR-safe fallbacks. */
export class MemoryReviewLog implements ReviewLog {
  private events = new Map<string, ReviewEvent>();

  async append(event: ReviewEvent): Promise<void> {
    const validation = validateReviewEvent(event);
    if (!validation.valid) {
      throw new ReviewLogPersistenceError('invalid_event', `Event validation failed: ${validation.errors.join(', ')}`);
    }
    const existing = this.events.get(event.id);
    if (existing) {
      if (eventKey(existing) === eventKey(event)) return; // idempotent
      throw new ReviewLogPersistenceError('duplicate_id_conflict', `Event id ${event.id} already exists with different payload`, event.id);
    }
    this.events.set(event.id, event);
  }

  async appendMany(events: ReviewEvent[]): Promise<void> {
    if (events.length === 0) return;
    // Validate all events first
    for (const e of events) {
      const validation = validateReviewEvent(e);
      if (!validation.valid) {
        throw new ReviewLogPersistenceError('invalid_event', `Event validation failed: ${validation.errors.join(', ')}`);
      }
    }
    // Check for duplicate IDs within the batch and against existing
    const batchKeys = new Map<string, string>(); // id → eventKey
    for (const e of events) {
      const existingKey = batchKeys.get(e.id);
      if (existingKey !== undefined) {
        if (existingKey !== eventKey(e)) {
          throw new ReviewLogPersistenceError('batch_conflict', `Batch contains conflicting events with id ${e.id}`, e.id);
        }
        // Same payload in batch — idempotent, skip
        continue;
      }
      batchKeys.set(e.id, eventKey(e));
    }
    // Check against existing store
    for (const [id, key] of batchKeys) {
      const existing = this.events.get(id);
      if (existing) {
        if (eventKey(existing) !== key) {
          throw new ReviewLogPersistenceError('duplicate_id_conflict', `Event id ${id} already exists with different payload`, id);
        }
      }
    }
    // All clear — commit atomically
    for (const [id, key] of batchKeys) {
      // Find the event from the batch (first occurrence)
      const e = events.find((ev) => ev.id === id && eventKey(ev) === key);
      if (e && !this.events.has(id)) {
        this.events.set(id, e);
      }
    }
  }

  async getAll(): Promise<ReviewEvent[]> {
    return [...this.events.values()].sort((a, b) => a.ts - b.ts);
  }

  async getByItem(itemId: string): Promise<ReviewEvent[]> {
    return [...this.events.values()].filter((e) => e.itemId === itemId).sort((a, b) => a.ts - b.ts);
  }

  async count(): Promise<number> {
    return this.events.size;
  }

  async clear(): Promise<void> {
    this.events.clear();
  }
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new ReviewLogPersistenceError('idb_unavailable', 'indexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(new ReviewLogPersistenceError('idb_open_failed', req.error?.message ?? 'idb open failed'));
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

function eventKeyFromDb(e: ReviewEvent): string {
  return eventKey(e);
}

/** Browser IndexedDB-backed append-only log. */
export class IndexedDbReviewLog implements ReviewLog {
  async append(event: ReviewEvent): Promise<void> {
    const validation = validateReviewEvent(event);
    if (!validation.valid) {
      throw new ReviewLogPersistenceError('invalid_event', `Event validation failed: ${validation.errors.join(', ')}`);
    }
    const db = await openDb();
    try {
      // Check for existing event with same ID
      const existing = await new Promise<ReviewEvent | undefined>((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).get(event.id);
        req.onsuccess = () => resolve(req.result as ReviewEvent | undefined);
        req.onerror = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', req.error?.message ?? 'idb get failed'));
      });
      if (existing) {
        if (eventKeyFromDb(existing) === eventKey(event)) return; // idempotent
        throw new ReviewLogPersistenceError('duplicate_id_conflict', `Event id ${event.id} already exists with different payload`, event.id);
      }
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', tx.error?.message ?? 'idb append failed'));
        tx.objectStore(STORE).put(event);
      });
    } finally {
      db.close();
    }
  }

  async appendMany(events: ReviewEvent[]): Promise<void> {
    if (events.length === 0) return;
    // Validate all events first
    for (const e of events) {
      const validation = validateReviewEvent(e);
      if (!validation.valid) {
        throw new ReviewLogPersistenceError('invalid_event', `Event validation failed: ${validation.errors.join(', ')}`);
      }
    }
    // Deduplicate within batch: check for conflicting payloads on same ID
    const batchKeys = new Map<string, string>();
    for (const e of events) {
      const existing = batchKeys.get(e.id);
      if (existing !== undefined && existing !== eventKey(e)) {
        throw new ReviewLogPersistenceError('batch_conflict', `Batch contains conflicting events with id ${e.id}`, e.id);
      }
      batchKeys.set(e.id, eventKey(e));
    }

    const db = await openDb();
    try {
      // Check existing events for conflicts
      const existingEvents = new Map<string, ReviewEvent>();
      for (const id of batchKeys.keys()) {
        const existing = await new Promise<ReviewEvent | undefined>((resolve, reject) => {
          const tx = db.transaction(STORE, 'readonly');
          const req = tx.objectStore(STORE).get(id);
          req.onsuccess = () => resolve(req.result as ReviewEvent | undefined);
          req.onerror = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', req.error?.message ?? 'idb get failed'));
        });
        if (existing) existingEvents.set(id, existing);
      }
      for (const [id, key] of batchKeys) {
        const existing = existingEvents.get(id);
        if (existing && eventKeyFromDb(existing) !== key) {
          throw new ReviewLogPersistenceError('duplicate_id_conflict', `Event id ${id} already exists with different payload`, id);
        }
      }

      // Write all new events in a single transaction
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', tx.error?.message ?? 'idb appendMany failed'));
        const store = tx.objectStore(STORE);
        for (const [id] of batchKeys) {
          if (!existingEvents.has(id)) {
            const e = events.find((ev) => ev.id === id)!;
            store.put(e);
          }
        }
      });
    } finally {
      db.close();
    }
  }

  async getAll(): Promise<ReviewEvent[]> {
    const db = await openDb();
    try {
      const rows = await new Promise<ReviewEvent[]>((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).index('by_ts').getAll();
        req.onsuccess = () => resolve((req.result as ReviewEvent[]) ?? []);
        req.onerror = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', req.error?.message ?? 'idb getAll failed'));
      });
      return rows;
    } finally {
      db.close();
    }
  }

  async getByItem(itemId: string): Promise<ReviewEvent[]> {
    const db = await openDb();
    try {
      const rows = await new Promise<ReviewEvent[]>((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).index('by_item').getAll(itemId);
        req.onsuccess = () => resolve((req.result as ReviewEvent[]) ?? []);
        req.onerror = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', req.error?.message ?? 'idb getByItem failed'));
      });
      return rows.sort((a, b) => a.ts - b.ts);
    } finally {
      db.close();
    }
  }

  async count(): Promise<number> {
    const db = await openDb();
    try {
      const n = await new Promise<number>((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const req = tx.objectStore(STORE).count();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', req.error?.message ?? 'idb count failed'));
      });
      return n;
    } finally {
      db.close();
    }
  }

  async clear(): Promise<void> {
    const db = await openDb();
    try {
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(new ReviewLogPersistenceError('idb_transaction_failed', tx.error?.message ?? 'idb clear failed'));
        tx.objectStore(STORE).clear();
      });
    } finally {
      db.close();
    }
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
