import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  dualWriteQuizAttempts,
  recoverPendingReviewEvents,
} from '../dual-write.ts';
import {
  MemoryReviewLog,
  ReviewLogPersistenceError,
  type ReviewLog,
} from '../review-log.ts';
import { MemoryReviewOutbox } from '../review-outbox.ts';
import type { ReviewEvent } from '../review-event.ts';

describe('durable review outbox', () => {
  it('retains exact events after primary-log failure and recovers them later', async () => {
    const primary = new MemoryReviewLog();
    const outbox = new MemoryReviewOutbox();
    let failWrites = true;
    const log: ReviewLog = {
      append: (event) => primary.append(event),
      async appendMany(events) {
        if (failWrites) throw new ReviewLogPersistenceError('idb_transaction_failed', 'temporary primary-log failure');
        await primary.appendMany(events);
      },
      getAll: () => primary.getAll(),
      getByItem: (id) => primary.getByItem(id),
      count: () => primary.count(),
      clear: () => primary.clear(),
    };

    const result = await dualWriteQuizAttempts({
      answers: [
        { questionId: 'q-1', correct: true },
        { questionId: 'q-2', correct: false },
      ],
      mode: 'quick',
      sessionId: 'session-durable',
      ts: 5000,
      log,
      outbox,
    });

    assert.equal(result.status, 'pending');
    assert.equal(await primary.count(), 0);
    const queued = await outbox.getAll();
    assert.equal(queued.length, 2);
    assert.deepEqual(queued, result.events);

    failWrites = false;
    const recovered = await recoverPendingReviewEvents(log, outbox);
    assert.equal(recovered.status, 'recovered');
    assert.equal(recovered.recovered, 2);
    assert.equal(await primary.count(), 2);
    assert.deepEqual(await outbox.getAll(), []);

    const repeated = await recoverPendingReviewEvents(log, outbox);
    assert.equal(repeated.status, 'clean');
    assert.equal(await primary.count(), 2);
  });

  it('does not claim durable recovery when the outbox itself cannot write', async () => {
    const primary = new MemoryReviewLog();
    const outbox = {
      async enqueueMany() { throw new Error('quota exceeded'); },
      async getAll() { return []; },
      async removeMany() {},
    };
    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'q-1', correct: true }],
      mode: 'quick',
      ts: 7000,
      log: primary,
      outbox,
    });
    assert.equal(result.status, 'failed');
    assert.equal(await primary.count(), 0);
  });

  it('preserves explicit flashcard grades without inventing confidence', async () => {
    const log = new MemoryReviewLog();
    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'card-1', correct: true, grade: 'hard', skillId: 'topic-1' }],
      mode: 'flashcard',
      sessionId: 'flash-session',
      ts: 11000,
      log,
      outbox: new MemoryReviewOutbox(),
    });
    assert.equal(result.status, 'persisted');
    const [event] = await log.getAll();
    assert.equal(event?.grade, 'hard');
    assert.equal(event?.confidence, undefined);
    assert.equal(event?.responseStatus, 'submitted');
  });

  it('records lesson-check outcomes without fabricating confidence or latency', async () => {
    const log = new MemoryReviewLog();
    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'lesson-q1', correct: false, skillId: 'lesson-1' }],
      mode: 'lesson-check',
      sessionId: 'lesson-check-session',
      ts: 12000,
      log,
      outbox: new MemoryReviewOutbox(),
    });
    assert.equal(result.status, 'persisted');
    const [event] = await log.getAll();
    assert.equal(event?.mode, 'lesson-check');
    assert.equal(event?.confidence, undefined);
    assert.equal(event?.latencyMs, undefined);
    assert.equal(event?.skillId, 'lesson-1');
  });

  it('keeps an outbox record if primary persistence succeeds but cleanup fails', async () => {
    const primary = new MemoryReviewLog();
    const outbox = new MemoryReviewOutbox();
    const failingCleanup = {
      enqueueMany: (events: ReviewEvent[]) => outbox.enqueueMany(events),
      getAll: () => outbox.getAll(),
      async removeMany() { throw new Error('temporary cleanup failure'); },
    };
    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'q-1', correct: true }],
      mode: 'quick',
      ts: 9000,
      log: primary,
      outbox: failingCleanup,
    });
    assert.equal(result.status, 'pending');
    assert.equal(await primary.count(), 1);
    assert.equal((await outbox.getAll()).length, 1);

    const recovered = await recoverPendingReviewEvents(primary, outbox);
    assert.equal(recovered.status, 'recovered');
    assert.equal(await primary.count(), 1);
    assert.deepEqual(await outbox.getAll(), []);
  });
});
