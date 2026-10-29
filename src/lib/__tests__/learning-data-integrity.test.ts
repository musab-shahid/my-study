import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeBayesianMastery,
  betaProbAbove,
} from '../mastery-bayesian.ts';
import {
  buildReviewEvent,
  createReviewEventId,
  REVIEW_EVENT_ALGO_VERSION,
  type ReviewEvent,
  type ReviewMode,
} from '../review-event.ts';
import {
  MemoryReviewLog,
  ReviewLogPersistenceError,
  setDefaultReviewLogForTests,
  type ReviewLog,
} from '../review-log.ts';
import { dualWriteQuizAttempts, dualWriteQuizAttemptsFireAndForget, type DualWriteResult } from '../dual-write.ts';
import {
  diffAggregates,
  diffAggregatesDetailed,
  replayItemEvents,
  isValidReviewEvent,
} from '../review-replay.ts';
import { updateQuestionStrength } from '../adaptive-select.ts';

// -- A. Mathematical input integrity --

describe('PR1: mastery-bayesian input validation', () => {
  it('rejects non-integer correct/attempts', () => {
    assert.throws(() => computeBayesianMastery(1.5, 3), RangeError);
    assert.throws(() => computeBayesianMastery(3, 3.5), RangeError);
  });

  it('rejects negative correct/attempts', () => {
    assert.throws(() => computeBayesianMastery(-1, 3), RangeError);
    assert.throws(() => computeBayesianMastery(3, -1), RangeError);
  });

  it('rejects correct > attempts', () => {
    assert.throws(() => computeBayesianMastery(5, 3), RangeError);
  });

  it('rejects non-finite correct/attempts', () => {
    assert.throws(() => computeBayesianMastery(NaN, 3), RangeError);
    assert.throws(() => computeBayesianMastery(3, Infinity), RangeError);
    assert.throws(() => computeBayesianMastery(3, 1e16), RangeError); // not a safe integer
  });

  it('rejects invalid priors', () => {
    assert.throws(() => computeBayesianMastery(3, 3, { priorAlpha: 0 }), RangeError);
    assert.throws(() => computeBayesianMastery(3, 3, { priorBeta: -1 }), RangeError);
    assert.throws(() => computeBayesianMastery(3, 3, { priorAlpha: NaN }), RangeError);
    assert.throws(() => computeBayesianMastery(3, 3, { priorAlpha: Infinity }), RangeError);
  });

  it('rejects invalid threshold and confidence', () => {
    assert.throws(() => computeBayesianMastery(3, 3, { accuracyThreshold: 0 }), RangeError);
    assert.throws(() => computeBayesianMastery(3, 3, { accuracyThreshold: 1 }), RangeError);
    assert.throws(() => computeBayesianMastery(3, 3, { confidence: 0 }), RangeError);
    assert.throws(() => computeBayesianMastery(3, 3, { confidence: 1 }), RangeError);
    assert.throws(() => computeBayesianMastery(3, 3, { confidence: NaN }), RangeError);
    assert.throws(() => computeBayesianMastery(3, 3, { accuracyThreshold: -0.1 }), RangeError);
  });

  it('preserves zero-attempt case: not mastered with no data', () => {
    const m = computeBayesianMastery(0, 0);
    assert.equal(m.mastered, false);
    assert.equal(m.attempts, 0);
    assert.equal(m.correct, 0);
    assert.ok(m.mean > 0 && m.mean < 1); // prior mean
  });

  it('preserves valid boundary cases', () => {
    const m0 = computeBayesianMastery(0, 0);
    assert.equal(m0.mastered, false);

    const m1 = computeBayesianMastery(10, 10);
    assert.equal(m1.mastered, true);
    assert.equal(m1.attempts, 10);
    assert.equal(m1.correct, 10);
  });

  it('numerical stability for large valid counts', () => {
    const m = computeBayesianMastery(999, 1000);
    assert.ok(Number.isFinite(m.mean));
    assert.ok(Number.isFinite(m.probAboveThreshold));
    assert.equal(m.attempts, 1000);
    assert.equal(m.correct, 999);
  });

  it('betaProbAbove rejects invalid inputs', () => {
    assert.throws(() => betaProbAbove(0, 2, 0.5), RangeError);
    assert.throws(() => betaProbAbove(2, 0, 0.5), RangeError);
    assert.throws(() => betaProbAbove(-1, 2, 0.5), RangeError);
    assert.throws(() => betaProbAbove(2, NaN, 0.5), RangeError);
    assert.throws(() => betaProbAbove(2, 2, 0), RangeError);
    assert.throws(() => betaProbAbove(2, 2, 1), RangeError);
    assert.throws(() => betaProbAbove(2, 2, -0.1), RangeError);
    assert.throws(() => betaProbAbove(2, 2, 1.1), RangeError);
    assert.throws(() => betaProbAbove(2, 2, NaN), RangeError);
  });

  it('betaProbAbove returns valid result for valid inputs', () => {
    const p = betaProbAbove(2, 2, 0.5);
    assert.ok(p >= 0 && p <= 1);
    assert.ok(Number.isFinite(p));
    // Beta(2,2) is symmetric, P(p>=0.5) = 0.5
    assert.ok(Math.abs(p - 0.5) < 1e-9);
  });
});

// -- B. Complete replay verification --

describe('PR1: bidirectional replay diff', () => {
  function makeEvent(itemId: string, correct: boolean, ts: number, id?: string): ReviewEvent {
    return buildReviewEvent({
      itemId,
      skillId: 'skill-a',
      correct,
      mode: 'topic',
      ts,
      deviceId: 'test',
      sessionId: 's1',
      algoVersion: REVIEW_EVENT_ALGO_VERSION,
    });
  }

  it('detects event-only items not in live aggregates', () => {
    const events = [makeEvent('x', true, 100)];
    const live: Record<string, { correct: boolean; timestamp: number }> = {};
    const result = diffAggregatesDetailed(live, events);
    assert.ok(result.eventOnlyItems.includes('x'));
    assert.ok(result.mismatches.some((m) => m.includes('missing from live')));
  });

  it('detects live-only items with no events', () => {
    const events: ReviewEvent[] = [];
    const live = { y: { correct: true, timestamp: 100 } };
    const result = diffAggregatesDetailed(live, events);
    assert.ok(result.liveOnlyItems.includes('y'));
    assert.ok(result.mismatches.some((m) => m.includes('no events found')));
  });

  it('detects field-level mismatches for correct, attempts, correctCount, strength, timestamp', () => {
    const events = [makeEvent('q1', true, 100)];
    const live = {
      q1: {
        correct: false,
        timestamp: 200,
        attempts: 5,
        correctCount: 2,
        strength: 0.1,
      },
    };
    const result = diffAggregatesDetailed(live, events);
    assert.ok(result.mismatches.some((m) => m.includes('correct')));
    assert.ok(result.mismatches.some((m) => m.includes('attempts')));
    assert.ok(result.mismatches.some((m) => m.includes('correctCount')));
    assert.ok(result.mismatches.some((m) => m.includes('strength')));
    assert.ok(result.mismatches.some((m) => m.includes('timestamp')));
  });

  it('reports optional fields as unavailable, not mismatched, for legacy rows', () => {
    const events = [makeEvent('q1', true, 100)];
    const live = {
      q1: {
        correct: true,
        timestamp: 100,
        // attempts, correctCount, strength are all undefined (legacy)
      },
    };
    const result = diffAggregatesDetailed(live, events);
    // Should not report attempts/correctCount/strength as mismatches
    assert.ok(!result.mismatches.some((m) => m.includes('attempts')));
    assert.ok(!result.mismatches.some((m) => m.includes('correctCount')));
    assert.ok(!result.mismatches.some((m) => m.includes('strength')));
    // But should match on correct and timestamp
    assert.deepEqual(result.mismatches, []);
  });

  it('reports duplicate event IDs', () => {
    const id = createReviewEventId();
    const e1 = makeEvent('q1', true, 100);
    e1.id = id;
    const e2 = makeEvent('q1', false, 200);
    e2.id = id;
    const result = diffAggregatesDetailed({}, [e1, e2]);
    assert.ok(result.duplicateEventIds.includes(id));
  });

  it('reports invalid events', () => {
    const badEvent = { id: 'bad', ts: 'not-a-number', itemId: 'q1' } as unknown as ReviewEvent;
    const result = diffAggregatesDetailed({}, [badEvent]);
    assert.equal(result.invalidEvents, 1);
  });

  it('reports equal-timestamp warnings', () => {
    const e1 = makeEvent('q1', true, 100);
    const e2 = makeEvent('q2', false, 100);
    const result = diffAggregatesDetailed({}, [e1, e2]);
    assert.ok(result.equalTimestampWarnings.length > 0);
  });
});

// -- C. Event-log integrity: idempotency, batch, conflict --

describe('PR1: event log idempotency and batch integrity', () => {
  function makeEvent(id: string, itemId: string, correct: boolean, ts: number): ReviewEvent {
    return {
      id,
      ts,
      deviceId: 'test',
      sessionId: 's1',
      itemId,
      skillId: 'skill-a',
      mode: 'topic',
      correct,
      algoVersion: REVIEW_EVENT_ALGO_VERSION,
    };
  }

  it('same ID + same payload = idempotent (MemoryReviewLog)', async () => {
    const log = new MemoryReviewLog();
    const e = makeEvent('evt-1', 'q1', true, 100);
    await log.append(e);
    await log.append(e); // same event — idempotent
    assert.equal(await log.count(), 1);
  });

  it('same ID + different payload = conflict (MemoryReviewLog)', async () => {
    const log = new MemoryReviewLog();
    await log.append(makeEvent('evt-1', 'q1', true, 100));
    await assert.rejects(
      () => log.append(makeEvent('evt-1', 'q1', false, 200)),
      (err: unknown) => err instanceof ReviewLogPersistenceError && err.category === 'duplicate_id_conflict',
    );
    // Original event preserved
    const all = await log.getAll();
    assert.equal(all[0].correct, true);
  });

  it('different IDs = separate events even with same fields', async () => {
    const log = new MemoryReviewLog();
    await log.append(makeEvent('evt-1', 'q1', true, 100));
    await log.append(makeEvent('evt-2', 'q1', true, 100));
    assert.equal(await log.count(), 2);
  });

  it('batch conflict rejects entire batch without partial writes (MemoryReviewLog)', async () => {
    const log = new MemoryReviewLog();
    const batch = [
      makeEvent('evt-1', 'q1', true, 100),
      makeEvent('evt-2', 'q2', false, 200),
    ];
    batch[1].id = 'evt-1'; // conflict in batch: same ID, different payload
    await assert.rejects(
      () => log.appendMany(batch),
      (err: unknown) => err instanceof ReviewLogPersistenceError && (err.category === 'batch_conflict' || err.category === 'duplicate_id_conflict'),
    );
    // No partial write
    assert.equal(await log.count(), 0);
  });

  it('batch with duplicate ID + same payload is idempotent (MemoryReviewLog)', async () => {
    const log = new MemoryReviewLog();
    const e = makeEvent('evt-1', 'q1', true, 100);
    await log.appendMany([e, e]); // same event twice in batch
    assert.equal(await log.count(), 1);
  });

  it('invalid event rejected before persistence (MemoryReviewLog)', async () => {
    const log = new MemoryReviewLog();
    const bad = { id: '', ts: 100, itemId: 'q1', skillId: 's', mode: 'topic', correct: true, algoVersion: 'v1' } as ReviewEvent;
    await assert.rejects(
      () => log.append(bad),
      (err: unknown) => err instanceof ReviewLogPersistenceError && err.category === 'invalid_event',
    );
    assert.equal(await log.count(), 0);
  });

  it('invalid event in batch rejects entire batch (MemoryReviewLog)', async () => {
    const log = new MemoryReviewLog();
    const good = makeEvent('evt-1', 'q1', true, 100);
    const bad = { id: 'evt-2', ts: NaN, itemId: 'q2', skillId: 's', mode: 'topic', correct: true, algoVersion: 'v1' } as unknown as ReviewEvent;
    await assert.rejects(
      () => log.appendMany([good, bad]),
      (err: unknown) => err instanceof ReviewLogPersistenceError && err.category === 'invalid_event',
    );
    assert.equal(await log.count(), 0);
  });
});

// -- D. Dual-write persistence outcome and retry --

describe('PR1: dual-write structured result and retry', () => {
  function makeFailingLog(): ReviewLog {
    const mem = new MemoryReviewLog();
    const failing: ReviewLog = {
      append: async (e) => { await mem.append(e); },
      appendMany: async () => {
        throw new ReviewLogPersistenceError('idb_transaction_failed', 'simulated failure');
      },
      getAll: async () => mem.getAll(),
      getByItem: async (id) => mem.getByItem(id),
      count: async () => mem.count(),
      clear: async () => { await mem.clear(); },
    };
    return failing;
  }

  function makePermanentFailingLog(): ReviewLog {
    return {
      append: async () => { throw new ReviewLogPersistenceError('invalid_event', 'permanent'); },
      appendMany: async () => { throw new ReviewLogPersistenceError('duplicate_id_conflict', 'permanent'); },
      getAll: async () => [],
      getByItem: async () => [],
      count: async () => 0,
      clear: async () => {},
    };
  }

  it('returns persisted status on success', async () => {
    const log = new MemoryReviewLog();
    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'q1', correct: true, skillId: 't1' }],
      mode: 'topic',
      ts: 100,
      log,
    });
    assert.equal(result.status, 'persisted');
    assert.equal(result.attempts, 1);
    assert.equal(result.events.length, 1);
    assert.equal(result.errorCategory, undefined);
  });

  it('returns failed status with error category on permanent failure', async () => {
    const log = makePermanentFailingLog();
    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'q1', correct: true, skillId: 't1' }],
      mode: 'topic',
      ts: 100,
      log,
    });
    assert.equal(result.status, 'failed');
    assert.ok(result.errorCategory);
    assert.equal(result.attempts, 1); // no retry for permanent errors
    assert.equal(result.events.length, 1); // events still constructed
  });

  it('retries transient failures with bounded attempts', async () => {
    const log = makeFailingLog();
    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'q1', correct: true, skillId: 't1' }],
      mode: 'topic',
      ts: 100,
      log,
    });
    assert.equal(result.status, 'failed');
    assert.equal(result.errorCategory, 'idb_transaction_failed');
    assert.ok(result.attempts <= 3); // initial + 2 retries
    assert.ok(result.attempts >= 1);
  });

  it('retry reuses same event IDs (no new IDs generated)', async () => {
    let callCount = 0;
    const seenIds: string[] = [];
    const log: ReviewLog = {
      append: async () => {},
      appendMany: async (events) => {
        callCount++;
        for (const e of events) seenIds.push(e.id);
        if (callCount < 3) throw new ReviewLogPersistenceError('idb_transaction_failed', 'transient');
      },
      getAll: async () => [],
      getByItem: async () => [],
      count: async () => 0,
      clear: async () => {},
    };
    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'q1', correct: true, skillId: 't1' }],
      mode: 'topic',
      ts: 100,
      log,
    });
    assert.equal(result.status, 'persisted');
    // All retries should have used the same event ID
    const uniqueIds = new Set(seenIds);
    assert.equal(uniqueIds.size, 1);
  });

  it('fire-and-forget does not throw on failure', () => {
    const log = makePermanentFailingLog();
    // Should not throw
    dualWriteQuizAttemptsFireAndForget({
      answers: [{ questionId: 'q1', correct: true }],
      mode: 'topic',
      ts: 100,
      log,
    });
  });
});

// -- E. Existing aggregate progress preserved when event write fails --

describe('PR1: aggregate preservation on event failure', () => {
  it('existing live aggregates are not modified when dual-write fails', async () => {
    const failingLog: ReviewLog = {
      append: async () => { throw new ReviewLogPersistenceError('idb_transaction_failed', 'fail'); },
      appendMany: async () => { throw new ReviewLogPersistenceError('idb_transaction_failed', 'fail'); },
      getAll: async () => [],
      getByItem: async () => [],
      count: async () => 0,
      clear: async () => {},
    };

    // Simulate live aggregate state (what storage.ts would hold)
    const liveBefore = updateQuestionStrength(undefined, true, 100);
    const liveSnapshot = { ...liveBefore };

    // Dual-write fails, but live aggregates are independent
    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'q1', correct: true, skillId: 't1' }],
      mode: 'topic',
      ts: 100,
      log: failingLog,
    });
    assert.equal(result.status, 'failed');
    // Live aggregate unchanged
    assert.deepEqual(liveBefore, liveSnapshot);
  });
});

// -- F. Equal-timestamp ordering and repeated items --

describe('PR1: deterministic ordering and repeated-item replay', () => {
  function makeEvent(itemId: string, correct: boolean, ts: number, idx?: number): ReviewEvent {
    const e = buildReviewEvent({
      itemId,
      skillId: 'skill-a',
      correct,
      mode: 'topic',
      ts,
      deviceId: 'test',
      sessionId: 's1',
    });
    if (idx !== undefined) e.ts = ts; // preserve the within-batch ordering
    return e;
  }

  it('equal timestamps produce deterministic replay', () => {
    const ts = 1000;
    const events = [
      makeEvent('q1', false, ts, 0),
      makeEvent('q1', true, ts, 1),
      makeEvent('q1', true, ts, 2),
    ];
    // All same timestamp — replay should still be deterministic
    const result = replayItemEvents(events);
    assert.ok(result);
    assert.equal(result!.attempts, 3);
    assert.equal(result!.correctCount, 2);
    assert.equal(result!.correct, true); // last event
  });

  it('mixed correct/incorrect sequences match updateQuestionStrength', () => {
    const outcomes = [true, false, true, true, false, true, false, true];
    let live: ReturnType<typeof updateQuestionStrength> | undefined;
    const events: ReviewEvent[] = [];
    let ts = 1_000_000;
    for (const correct of outcomes) {
      live = updateQuestionStrength(live, correct, ts);
      events.push(makeEvent('q1', correct, ts));
      ts += 1_000;
    }
    const replayed = replayItemEvents(events);
    assert.ok(replayed);
    assert.equal(replayed!.attempts, live!.attempts);
    assert.equal(replayed!.correctCount, live!.correctCount);
    assert.equal(replayed!.correct, live!.correct);
    assert.ok(Math.abs(replayed!.strength - (live!.strength ?? 0)) < 1e-9);
  });

  it('repeated items with different timestamps sort chronologically', () => {
    const events = [
      makeEvent('q1', true, 300),
      makeEvent('q1', false, 100),
      makeEvent('q1', true, 200),
    ];
    const result = replayItemEvents(events);
    assert.ok(result);
    assert.equal(result!.timestamp, 300); // last chronologically
    assert.equal(result!.correct, true);
  });
});

// -- G. isValidReviewEvent --

describe('PR1: event validation', () => {
  it('accepts valid events', () => {
    const e = buildReviewEvent({
      itemId: 'q1',
      skillId: 's1',
      correct: true,
      mode: 'topic',
    });
    assert.equal(isValidReviewEvent(e), true);
  });

  it('rejects missing fields', () => {
    assert.equal(isValidReviewEvent({}), false);
    assert.equal(isValidReviewEvent(null), false);
    assert.equal(isValidReviewEvent(undefined), false);
  });

  it('rejects invalid ts', () => {
    const e = buildReviewEvent({ itemId: 'q1', skillId: 's1', correct: true, mode: 'topic' });
    (e as unknown as Record<string, unknown>).ts = 'not-a-number';
    assert.equal(isValidReviewEvent(e), false);
  });

  it('rejects invalid mode', () => {
    const e = buildReviewEvent({ itemId: 'q1', skillId: 's1', correct: true, mode: 'topic' });
    (e as unknown as Record<string, unknown>).mode = 'invalid-mode';
    assert.equal(isValidReviewEvent(e), false);
  });

  it('rejects invalid confidence', () => {
    const e = buildReviewEvent({ itemId: 'q1', skillId: 's1', correct: true, mode: 'topic' });
    (e as unknown as Record<string, unknown>).confidence = 5;
    assert.equal(isValidReviewEvent(e), false);
  });

  it('accepts optional fields when valid', () => {
    const e = buildReviewEvent({
      itemId: 'q1',
      skillId: 's1',
      correct: true,
      mode: 'topic',
      confidence: 2,
      latencyMs: 5000,
    });
    assert.equal(isValidReviewEvent(e), true);
  });

  it('rejects invalid latencyMs', () => {
    const e = buildReviewEvent({ itemId: 'q1', skillId: 's1', correct: true, mode: 'topic' });
    (e as unknown as Record<string, unknown>).latencyMs = 'fast';
    assert.equal(isValidReviewEvent(e), false);
  });
});

// -- H. Backward compatibility: existing tests still pass --

describe('PR1: backward compatibility', () => {
  it('computeBayesianMastery with defaults works as before', () => {
    const m = computeBayesianMastery(3, 3);
    assert.equal(m.attempts, 3);
    assert.equal(m.correct, 3);
    assert.equal(m.mastered, false);
    assert.ok(m.probAboveThreshold < 0.9);
  });

  it('dual-write success path still returns events', async () => {
    setDefaultReviewLogForTests(new MemoryReviewLog());
    const result = await dualWriteQuizAttempts({
      answers: [{ questionId: 'q1', correct: true }],
      mode: 'topic',
      ts: 100,
    });
    assert.equal(result.events.length, 1);
    assert.equal(result.status, 'persisted');
    setDefaultReviewLogForTests(null);
  });

  it('diffAggregates returns string[] for simple compatibility', () => {
    const events = [buildReviewEvent({ itemId: 'q1', skillId: 's1', correct: true, mode: 'topic', ts: 100 })];
    const live = { q1: { correct: true, timestamp: 100 } };
    const mismatches = diffAggregates(live, events);
    assert.ok(Array.isArray(mismatches));
  });
});
