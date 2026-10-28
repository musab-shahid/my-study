import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  computeCoverageCompetence,
  aggregateQuestionResults,
} from '../progress-insights.ts';
import { gradeToAttempt, lintFlashcardPrompt } from '../flashcard-grades.ts';

describe('progress insights', () => {
  it('separates full coverage from weak competence', () => {
    const r = computeCoverageCompetence({
      studiedTopics: 10,
      totalTopics: 10,
      correct: 1,
      attempts: 5,
    });
    assert.equal(r.coveragePct, 100);
    assert.ok(r.competence.mean < 0.5);
    assert.equal(r.competence.mastered, false);
    // Readiness should not be ~100 just because every topic was opened
    assert.ok(r.readinessScore < 50);
  });

  it('aggregates question results', () => {
    const a = aggregateQuestionResults({
      q1: { correct: true, timestamp: 1, attempts: 3, correctCount: 2 },
      q2: { correct: false, timestamp: 2, attempts: 1, correctCount: 0 },
    });
    assert.equal(a.attempts, 4);
    assert.equal(a.correct, 2);
  });
});

describe('flashcard grades', () => {
  it('maps again to incorrect', () => {
    assert.equal(gradeToAttempt('again').correct, false);
    assert.equal(gradeToAttempt('easy').correct, true);
    assert.equal(gradeToAttempt('hard').confidence, 1);
  });

  it('lints long prompts', () => {
    assert.ok(lintFlashcardPrompt('x'.repeat(130)).includes('prompt_long'));
    assert.deepEqual(lintFlashcardPrompt('Short fact'), []);
  });
});
