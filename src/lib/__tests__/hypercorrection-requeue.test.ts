import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  shouldRequeueHighConfidenceMiss,
  planRequeueInsert,
  insertQuestionAt,
  scheduleNextDayHcMiss,
  listDueHcMisses,
  clearHcMisses,
} from '../hypercorrection-requeue.ts';

describe('hypercorrection requeue', () => {
  it('only requeues sure + wrong once', () => {
    assert.equal(shouldRequeueHighConfidenceMiss(false, 3, [], 'q1'), true);
    assert.equal(shouldRequeueHighConfidenceMiss(false, 2, [], 'q1'), false);
    assert.equal(shouldRequeueHighConfidenceMiss(true, 3, [], 'q1'), false);
    assert.equal(shouldRequeueHighConfidenceMiss(false, 3, ['q1'], 'q1'), false);
  });

  it('plans insert a few items ahead and clamps to end', () => {
    assert.equal(planRequeueInsert({ currentIdx: 0, questionCount: 10, gap: 2 }).insertAt, 3);
    assert.equal(planRequeueInsert({ currentIdx: 8, questionCount: 10, gap: 2 }).insertAt, 10);
    assert.equal(planRequeueInsert({ currentIdx: 9, questionCount: 10, gap: 2 }).insertAt, 10);
  });

  it('inserts without dropping neighbors', () => {
    assert.deepEqual(insertQuestionAt(['a', 'b', 'c'], 1, 'x'), ['a', 'x', 'b', 'c']);
    assert.deepEqual(insertQuestionAt(['a'], 5, 'x'), ['a', 'x']);
  });

  it('schedules and lists next-day dues', () => {
    // Memory localStorage polyfill for node
    const store: Record<string, string> = {};
    const ls = {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
      removeItem: (k: string) => {
        delete store[k];
      },
    };
    (globalThis as { localStorage?: typeof ls }).localStorage = ls;

    scheduleNextDayHcMiss('q-due', 'topic-1', Date.now() - 1000);
    scheduleNextDayHcMiss('q-future', 'topic-1', Date.now());
    // force future due by writing
    const due = listDueHcMisses(Date.now() + 2 * 86_400_000);
    assert.ok(due.some((d) => d.questionId === 'q-due'));
    clearHcMisses(['q-due']);
    const after = listDueHcMisses(Date.now() + 2 * 86_400_000);
    assert.equal(
      after.some((d) => d.questionId === 'q-due'),
      false,
    );
  });
});
