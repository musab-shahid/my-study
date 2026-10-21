import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { deriveAccuracy, deriveStatus, computeMasteryScore, getEffectiveQuizStats } from '../constants.ts';

describe('mastery helpers', () => {
  it('deriveAccuracy uses exact ratio and rounds', () => {
    assert.equal(deriveAccuracy(1, 3), 33);
    assert.equal(deriveAccuracy(0, 0), 0);
    assert.equal(deriveAccuracy(8, 10), 80);
  });

  it('deriveStatus: mastered only with enough attempts and accuracy', () => {
    assert.equal(deriveStatus(false, 0, 0), 'not_started');
    assert.equal(deriveStatus(true, 0, 0), 'studied');
    assert.equal(deriveStatus(true, 1, 80), 'studied'); // need MASTERY_MIN_QUIZ_ATTEMPTS
    assert.equal(deriveStatus(true, 3, 80), 'mastered');
    assert.equal(deriveStatus(false, 5, 90), 'mastered');
    assert.equal(deriveStatus(true, 5, 70), 'studied');
  });

  it('getEffectiveQuizStats prefers recent window over lifetime', () => {
    const lifetimeHeavy = {
      quizCorrect: 90,
      quizTotal: 100,
      recentSessions: [
        { correct: 1, total: 5 },
        { correct: 2, total: 5 },
      ],
    };
    const eff = getEffectiveQuizStats(lifetimeHeavy);
    assert.equal(eff.fromWindow, true);
    assert.equal(eff.total, 10);
    assert.equal(eff.correct, 3);
    assert.equal(eff.accuracy, 30);
    const lifetimeOnly = getEffectiveQuizStats({ quizCorrect: 8, quizTotal: 10 });
    assert.equal(lifetimeOnly.fromWindow, false);
    assert.equal(lifetimeOnly.accuracy, 80);
  });

  it('computeMasteryScore clamps 0-100', () => {
    assert.equal(computeMasteryScore(0, 0, 50), 0);
    assert.equal(computeMasteryScore(10, 10, 100), 100);
    assert.equal(computeMasteryScore(5, 10, 100), 75);
  });
});
