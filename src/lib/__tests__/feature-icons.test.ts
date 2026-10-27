import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { FEATURE_ICONS, featureIcon } from '../feature-icons.ts';

describe('feature icons', () => {
  it('returns stable component references', () => {
    assert.equal(featureIcon('formulas'), FEATURE_ICONS.formulas);
    assert.equal(featureIcon('practice'), FEATURE_ICONS.practice);
    assert.equal(featureIcon('practice'), featureIcon('practice'));
  });

  it('exposes the full primary nav set', () => {
    for (const id of ['home', 'tracks', 'learn', 'practice', 'review', 'formulas', 'progress', 'search', 'settings'] as const) {
      assert.equal(typeof FEATURE_ICONS[id], 'function');
    }
  });
});
