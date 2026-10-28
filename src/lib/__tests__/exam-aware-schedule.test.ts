import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { applyExamAwareInterval, daysUntilIsoDate } from '../exam-aware-schedule.ts';
import { detectAnswerLeak, runTutorLeakEval, ATTEMPT_FIRST_SYSTEM_PROMPT } from '../ai-tutor-safeguards.ts';

describe('exam-aware schedule', () => {
  it('caps long intervals when exam is soon', () => {
    const r = applyExamAwareInterval({ intervalDays: 30, daysUntilExam: 10 });
    assert.ok(r.intervalDays < 30);
    assert.ok(r.intervalDays >= 1);
    assert.equal(r.reason, 'capped_to_exam');
  });

  it('uses 1-day interval in final review window', () => {
    const r = applyExamAwareInterval({ intervalDays: 14, daysUntilExam: 2 });
    assert.equal(r.intervalDays, 1);
    assert.equal(r.requestRetention, 0.95);
  });

  it('does not expand intervals', () => {
    const r = applyExamAwareInterval({ intervalDays: 3, daysUntilExam: 60 });
    assert.equal(r.intervalDays, 3);
  });

  it('daysUntilIsoDate computes whole days', () => {
    const now = Date.parse('2026-10-01T12:00:00Z');
    const d = daysUntilIsoDate('2026-10-11T00:00:00Z', now);
    assert.ok(d >= 9 && d <= 10);
  });
});

describe('AI tutor safeguards', () => {
  it('attempt-first prompt forbids same-message answer keys', () => {
    assert.match(ATTEMPT_FIRST_SYSTEM_PROMPT, /do NOT reveal correct options/i);
    assert.match(ATTEMPT_FIRST_SYSTEM_PROMPT, /hint ladder/i);
  });

  it('detects answer leaks', () => {
    assert.equal(detectAnswerLeak('Correct answer: B').leaked, true);
    assert.equal(detectAnswerLeak('What drives SUHI? Consider materials.').leaked, false);
  });

  it('golden eval set passes', () => {
    const r = runTutorLeakEval();
    assert.equal(r.passed, true, r.failures.join('; '));
  });
});
