import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { recordQuizResult } from '../storage.ts';
import type { AppData, Question } from '@/types';
import { dualWriteQuizAttempts } from '../dual-write.ts';
import { MemoryReviewLog } from '../review-log.ts';
import { MemoryReviewOutbox } from '../review-outbox.ts';
import { deterministicReviewEventId } from '../review-event.ts';
import { loadData } from '../storage.ts';

function makeQuestion(id: string, topicId = 't1'): Question {
  return {
    id,
    topicId,
    type: 'single',
    question: `Q ${id}`,
    options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }],
    correctOptionIndex: 0,
  } as unknown as Question;
}

function baselineData(): AppData {
  const d = loadData();
  d.quizHistory = [];
  d.topicProgress = {};
  return d;
}

describe('duplicate completion idempotency', () => {
  it('recordQuizResult with same sessionId does not create a second history entry', () => {
    const q1 = makeQuestion('q-dedup-1');
    const q2 = makeQuestion('q-dedup-2');
    const questions = [q1, q2];
    const answers = [
      { questionId: 'q-dedup-1', correct: true, selectedIndices: [0] },
      { questionId: 'q-dedup-2', correct: false, selectedIndices: [1] },
    ];
    const sid = 'session-dedup-001';
    let data = recordQuizResult(baselineData(), null, answers, questions, 'topic', undefined, undefined, Date.now(), [], sid);
    assert.equal(data.quizHistory.length, 1);
    assert.equal(data.quizHistory[0].sessionId, sid);

    // Re-finish: should be a no-op for history.
    data = recordQuizResult(data, null, answers, questions, 'topic', undefined, undefined, Date.now(), [], sid);
    assert.equal(data.quizHistory.length, 1);
  });

  it('recordQuizResult without sessionId still records normally', () => {
    const q = makeQuestion('q-no-sid');
    const answers = [{ questionId: 'q-no-sid', correct: true, selectedIndices: [0] }];
    const data1 = recordQuizResult(baselineData(), null, answers, [q], 'topic', undefined, undefined, Date.now(), []);
    assert.equal(data1.quizHistory.length, 1);
    assert.equal(data1.quizHistory[0].sessionId, undefined);

    // Second call without sessionId still appends (no dedup key).
    const data2 = recordQuizResult(data1, null, answers, [q], 'topic', undefined, undefined, Date.now(), []);
    assert.equal(data2.quizHistory.length, 2);
  });

  it('dual-write with deterministic IDs dedupes on re-finish via idempotent append', async () => {
    const log = new MemoryReviewLog();
    const outbox = new MemoryReviewOutbox();
    const params = {
      answers: [
        { questionId: 'q-recv-1', correct: true },
        { questionId: 'q-recv-2', correct: false },
      ],
      mode: 'topic' as const,
      sessionId: 'session-recv-001',
      ts: 5000,
      log,
      outbox,
    };

    const r1 = await dualWriteQuizAttempts(params);
    assert.equal(r1.status, 'persisted');
    assert.equal(await log.count(), 2);

    // Re-finish: same sessionId + same items + same index => same IDs => no-op.
    const r2 = await dualWriteQuizAttempts(params);
    assert.equal(r2.status, 'persisted');
    assert.equal(await log.count(), 2);

    // IDs must be deterministic.
    assert.equal(r1.events[0].id, deterministicReviewEventId('session-recv-001', 'q-recv-1', 0));
    assert.equal(r1.events[1].id, deterministicReviewEventId('session-recv-001', 'q-recv-2', 1));
  });

  it('different sessionIds produce distinct events that both persist', async () => {
    const log = new MemoryReviewLog();
    const outbox = new MemoryReviewOutbox();
    const base = {
      answers: [{ questionId: 'q-multi', correct: true }],
      mode: 'topic' as const,
      ts: 100,
      log,
      outbox,
    };
    await dualWriteQuizAttempts({ ...base, sessionId: 'session-A' });
    await dualWriteQuizAttempts({ ...base, sessionId: 'session-B' });
    assert.equal(await log.count(), 2);
  });
});
