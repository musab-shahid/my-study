import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { dualWriteQuizAttempts } from '../dual-write.ts';
import {
  MemoryReviewLog,
  ReviewLogPersistenceError,
  type ReviewLog,
} from '../review-log.ts';
import { MemoryReviewOutbox } from '../review-outbox.ts';
import type { ReviewEvent } from '../review-event.ts';

describe('dual-write persistence contract', () => {
  it('retries transient failures with the exact same event IDs and payloads', async () => {
    const persisted = new MemoryReviewLog();
    const attemptedBatches: ReviewEvent[][] = [];
    let failuresRemaining = 2;
    const log: ReviewLog = {
      async append(event) { await persisted.append(event); },
      async appendMany(events) {
        attemptedBatches.push(events.map((event) => ({ ...event })));
        if (failuresRemaining > 0) {
          failuresRemaining -= 1;
          throw new ReviewLogPersistenceError('idb_transaction_failed', 'temporary failure');
        }
        await persisted.appendMany(events);
      },
      getAll: () => persisted.getAll(),
      getByItem: (id) => persisted.getByItem(id),
      count: () => persisted.count(),
      clear: () => persisted.clear(),
    };

    const result = await dualWriteQuizAttempts({
      answers: [
        { questionId: 'q-1', correct: true },
        { questionId: 'q-2', correct: false },
      ],
      mode: 'quick',
      sessionId: 'session-stable',
      ts: 1234,
      log,
      outbox: new MemoryReviewOutbox(),
    });

    assert.equal(result.status, 'persisted');
    assert.equal(result.attempts, 3);
    assert.equal(attemptedBatches.length, 3);
    assert.deepEqual(attemptedBatches[1], attemptedBatches[0]);
    assert.deepEqual(attemptedBatches[2], attemptedBatches[0]);
    assert.equal(await persisted.count(), 2);
  });

  it('does not retry permanent identity conflicts', async () => {
    let attempts = 0;
    const log: ReviewLog = {
      async append() { attempts += 1; },
      async appendMany() {
        attempts += 1;
        throw new ReviewLogPersistenceError('duplicate_id_conflict', 'payload conflict', 'event-1');
      },
      async getAll() { return []; },
      async getByItem() { return []; },
      async count() { return 0; },
      async clear() {},
    };

    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'q-1', correct: true }],
      mode: 'quick',
      ts: 1234,
      log,
    });

    assert.equal(result.status, 'failed');
    assert.equal(result.errorCategory, 'duplicate_id_conflict');
    assert.equal(result.attempts, 1);
    assert.equal(attempts, 1);
  });

  it('keeps an empty answer batch a successful no-op', async () => {
    const result = await dualWriteQuizAttempts({
      answers: [],
      mode: 'quick',
      ts: 1234,
      log: new MemoryReviewLog(),
      outbox: new MemoryReviewOutbox(),
    });
    assert.equal(result.status, 'persisted');
    assert.equal(result.attempts, 1);
    assert.deepEqual(result.events, []);
  });
});
