import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { hasSubstantiveQuestionText, normalizeAnswerOption } from '../../data/question-quality.ts';

describe('whole-app question content quality primitives', () => {
  it('rejects empty text and obvious drafting placeholders', () => {
    for (const value of ['', '   ', 'TODO', 'TODO: write a question', 'TBD', 'FIXME later', 'PLACEHOLDER text', '- TODO: fill in']) {
      assert.equal(hasSubstantiveQuestionText(value), false, JSON.stringify(value));
    }
  });

  it('accepts authored instructional text that mentions a placeholder term in context', () => {
    assert.equal(hasSubstantiveQuestionText('Explain why TODO markers should be removed before release.'), true);
  });

  it('normalizes Unicode, case, and whitespace for duplicate-option detection', () => {
    assert.equal(normalizeAnswerOption('  Ｃonvection   transfers heat '), normalizeAnswerOption('convection transfers heat'));
  });
});
