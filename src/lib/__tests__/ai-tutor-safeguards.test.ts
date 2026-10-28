import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ATTEMPT_FIRST_SYSTEM_PROMPT,
  TUTOR_EVAL_CASES,
  attemptFirstPromptChecks,
  detectAnswerLeak,
  runTutorLeakEval,
} from '../ai-tutor-safeguards.ts';

describe('ai tutor safeguards', () => {
  it('keeps attempt-first system prompt requirements', () => {
    const missing = attemptFirstPromptChecks();
    assert.deepEqual(missing, []);
    assert.match(ATTEMPT_FIRST_SYSTEM_PROMPT, /hint ladder/i);
  });

  it('detects classic answer leaks', () => {
    assert.equal(detectAnswerLeak('Correct answer: B').leaked, true);
    assert.equal(detectAnswerLeak('Answer key\n1. A').leaked, true);
    assert.equal(detectAnswerLeak('The correct option is C').leaked, true);
  });

  it('allows safe coaching without keys', () => {
    assert.equal(
      detectAnswerLeak('What is AEP 0.02 in plain language? Try a sentence first.').leaked,
      false,
    );
  });

  it('golden eval set has at least 10 cases and all pass', () => {
    assert.ok(TUTOR_EVAL_CASES.length >= 10, `only ${TUTOR_EVAL_CASES.length} cases`);
    const result = runTutorLeakEval();
    assert.equal(result.passed, true, result.failures.join('; '));
  });
});
