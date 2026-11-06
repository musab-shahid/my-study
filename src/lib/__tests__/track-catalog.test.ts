import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatQuestionCountLabel,
} from '../track-catalog.ts';
import { resolveSubjectsForScope } from '../track-scope.ts';
import type { Question } from '../../types.ts';

describe('track-catalog helpers', () => {
  it('formats question counts', () => {
    assert.equal(formatQuestionCountLabel(0), '0 questions');
    assert.equal(formatQuestionCountLabel(1), '1 question');
    assert.equal(formatQuestionCountLabel(12), '12 questions');
  });

  it('resolveSubjectsForScope returns arrays', () => {
    const all = resolveSubjectsForScope('all');
    assert.ok(Array.isArray(all));
  });
});
