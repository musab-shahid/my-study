import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { buildReviewEvent } from '../review-event.ts';
import { compareSchedulersOnLog, finalFsrsStates } from '../fsrs-shadow-compare.ts';

const DAY = 86_400_000;

describe('scheduler evaluation event eligibility', () => {
  it('uses only submitted final quiz outcomes and excludes non-quiz evidence', () => {
    const events = [
      buildReviewEvent({
        itemId: 'quiz-q1', skillId: 'quiz-skill', correct: false,
        mode: 'topic', aggregateEligible: false, ts: 1,
      }),
      buildReviewEvent({
        itemId: 'quiz-q1', skillId: 'quiz-skill', correct: true,
        mode: 'topic', aggregateEligible: true, ts: 1 + 3 * DAY,
      }),
      buildReviewEvent({
        itemId: 'flashcard-1', skillId: 'cards', correct: true,
        mode: 'flashcard', grade: 'again', aggregateEligible: false, ts: 1,
      }),
      buildReviewEvent({
        itemId: 'flashcard-1', skillId: 'cards', correct: false,
        mode: 'flashcard', grade: 'good', aggregateEligible: false, ts: 1 + 2 * DAY,
      }),
      buildReviewEvent({
        itemId: 'lesson-check-1', skillId: 'lesson-a', correct: true,
        mode: 'lesson-check', aggregateEligible: false, ts: 1,
      }),
      buildReviewEvent({
        itemId: 'lesson-check-1', skillId: 'lesson-a', correct: false,
        mode: 'lesson-check', aggregateEligible: false, ts: 1 + 2 * DAY,
      }),
      buildReviewEvent({
        itemId: 'timeout-q2', skillId: 'quiz-skill', correct: false,
        mode: 'quick', responseStatus: 'unanswered',
        aggregateEligible: false, ts: 1,
      }),
      buildReviewEvent({
        itemId: 'timeout-q2', skillId: 'quiz-skill', correct: true,
        mode: 'quick', aggregateEligible: true, ts: 1 + 2 * DAY,
      }),
    ];

    const result = compareSchedulersOnLog(events);
    assert.equal(result.predictionCount, 1);
    assert.deepEqual(Object.keys(finalFsrsStates(events)), ['quiz-q1']);
  });

  it('does not treat a legacy unanswered quiz slot as a recall failure', () => {
    const events = [
      buildReviewEvent({
        itemId: 'q-timeout', skillId: 's', correct: false,
        mode: 'mock', responseStatus: 'unanswered', ts: 1,
      }),
      buildReviewEvent({
        itemId: 'q-timeout', skillId: 's', correct: true,
        mode: 'mock', ts: 1 + DAY,
      }),
    ];

    const result = compareSchedulersOnLog(events);
    assert.equal(result.predictionCount, 0);
    assert.deepEqual(Object.keys(finalFsrsStates(events)), []);
  });
});
