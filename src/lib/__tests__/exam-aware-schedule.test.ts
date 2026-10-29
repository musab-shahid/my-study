import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { applyExamAwareInterval, daysUntilIsoDate } from '../exam-aware-schedule.ts';
import { detectAnswerLeak, runTutorLeakEval, ATTEMPT_FIRST_SYSTEM_PROMPT } from '../ai-tutor-safeguards.ts';

describe('exam-aware schedule', () => {
  it('caps long intervals when exam is soon', () => {
    const result = applyExamAwareInterval({ intervalDays: 30, daysUntilExam: 10 });
    assert.ok(result.intervalDays != null && result.intervalDays < 30);
    assert.ok(result.intervalDays != null && result.intervalDays >= 1);
    assert.equal(result.reason, 'capped_to_exam');
    assert.equal(result.status, 'scheduled');
  });

  it('uses a one-day interval in the final review window', () => {
    const result = applyExamAwareInterval({ intervalDays: 14, daysUntilExam: 2 });
    assert.equal(result.intervalDays, 1);
    assert.equal(result.requestRetention, 0.95);
  });

  it('does not expand intervals', () => {
    const result = applyExamAwareInterval({ intervalDays: 3, daysUntilExam: 60 });
    assert.equal(result.intervalDays, 3);
  });

  it('returns explicit states for no date and passed exam', () => {
    const noDate = applyExamAwareInterval({ intervalDays: 14, daysUntilExam: null });
    assert.equal(noDate.status, 'no_exam_date');
    assert.equal(noDate.intervalDays, null);
    assert.equal(noDate.requestRetention, null);
    const passed = applyExamAwareInterval({ intervalDays: 14, daysUntilExam: -1 });
    assert.equal(passed.status, 'exam_passed');
    assert.equal(passed.intervalDays, null);
    assert.equal(passed.infeasible, true);
  });

  it('rejects invalid interval and date parameters', () => {
    assert.throws(() => applyExamAwareInterval({ intervalDays: 0, daysUntilExam: 5 }), RangeError);
    assert.throws(() => applyExamAwareInterval({ intervalDays: 5, daysUntilExam: Number.NaN }), RangeError);
    assert.throws(() => applyExamAwareInterval({ intervalDays: 5, daysUntilExam: 5, remainingFraction: 2 }), RangeError);
    assert.throws(() => applyExamAwareInterval({ intervalDays: 5, daysUntilExam: 5, finalReviewDays: -1 }), RangeError);
  });

  it('computes calendar days in the configured time zone', () => {
    const now = Date.parse('2026-10-10T20:00:00Z'); // 11 Oct in Asia/Karachi
    assert.equal(daysUntilIsoDate('2026-10-11T00:30:00+05:00', now, 'Asia/Karachi'), 0);
    assert.equal(daysUntilIsoDate('2026-10-11T00:00:00Z', Date.parse('2026-10-01T12:00:00Z')), 10);
    assert.ok(Number.isNaN(daysUntilIsoDate('not-a-date', now, 'Asia/Karachi')));
    assert.ok(Number.isNaN(daysUntilIsoDate('2026-10-11T00:00:00Z', now, 'Not/AZone')));
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
    const result = runTutorLeakEval();
    assert.equal(result.passed, true, result.failures.join('; '));
  });
});
