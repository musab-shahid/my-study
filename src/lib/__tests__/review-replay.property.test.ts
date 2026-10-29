import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildReviewEvent } from '../review-event.ts';
import { MemoryReviewLog } from '../review-log.ts';
import { dualWriteQuizAttempts } from '../dual-write.ts';
import { diffAggregates, diffAggregatesDetailed, replayItemEvents } from '../review-replay.ts';
import { updateQuestionStrength } from '../adaptive-select.ts';

describe('review replay property', () => {
  it('replay matches updateQuestionStrength for a single item sequence', () => {
    const outcomes = [true, false, true, true];
    let live: ReturnType<typeof updateQuestionStrength> | undefined;
    const events = [];
    let ts = 1_000_000;
    for (const correct of outcomes) {
      live = updateQuestionStrength(live, correct, ts);
      events.push(
        buildReviewEvent({
          itemId: 'q1',
          skillId: 'skill-a',
          correct,
          mode: 'topic',
          ts,
          deviceId: 'test',
          sessionId: 's1',
        }),
      );
      ts += 1_000;
    }
    const replayed = replayItemEvents(events);
    assert.ok(replayed);
    assert.equal(replayed!.attempts, live!.attempts);
    assert.equal(replayed!.correctCount, live!.correctCount);
    assert.equal(replayed!.correct, live!.correct);
    assert.ok(Math.abs((replayed!.strength) - (live!.strength ?? 0)) < 1e-9);
  });

  it('dual-write + diffAggregates is empty for matching live state', async () => {
    const log = new MemoryReviewLog();
    // Simulate live aggregates
    let ra = updateQuestionStrength(undefined, true, 100);
    const rb = updateQuestionStrength(undefined, false, 101);
    ra = updateQuestionStrength(ra, true, 102);
    const live = { a: ra, b: rb };

    const result = await dualWriteQuizAttempts({
      answers: [
        { questionId: 'a', correct: true, skillId: 't1' },
        { questionId: 'b', correct: false, skillId: 't1' },
        { questionId: 'a', correct: true, skillId: 't1' },
      ],
      mode: 'topic',
      ts: 100,
      log,
    });
    assert.equal(result.status, 'persisted');
    const events = await log.getAll();
    const mismatches = diffAggregates(live, events);
    assert.deepEqual(mismatches, []);
  });

  it('MemoryReviewLog preserves append order by ts', async () => {
    const log = new MemoryReviewLog();
    await log.append(buildReviewEvent({ itemId: 'x', skillId: 's', correct: true, mode: 'quick', ts: 2 }));
    await log.append(buildReviewEvent({ itemId: 'x', skillId: 's', correct: false, mode: 'quick', ts: 1 }));
    const all = await log.getAll();
    assert.equal(all[0].ts, 1);
    assert.equal(all[1].ts, 2);
  });

  it('grade mapping: confident wrong is again', async () => {
    const { gradeFromAttempt } = await import('../review-event.ts');
    assert.equal(gradeFromAttempt(false, 3), 'again');
    assert.equal(gradeFromAttempt(true, 1), 'hard');
    assert.equal(gradeFromAttempt(true, 3), 'easy');
    assert.equal(gradeFromAttempt(true, 2), 'good');
  });
});
