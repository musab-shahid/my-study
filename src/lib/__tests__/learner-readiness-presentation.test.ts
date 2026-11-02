import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getLearnerReadinessPresentation } from '../learner-readiness-presentation';

describe('getLearnerReadinessPresentation', () => {
  it('labels validated and released substantive material Ready', () => {
    for (const readiness of ['validated', 'released'] as const) {
      assert.equal(getLearnerReadinessPresentation(readiness, true).label, 'Ready');
    }
  });

  it('labels authored but unverified material Preview without exposing workflow states', () => {
    for (const readiness of ['draft', 'review', 'outlined', 'planned'] as const) {
      const result = getLearnerReadinessPresentation(readiness, true);
      assert.equal(result.label, 'Preview');
      assert.equal(result.description, 'This material is still being checked.');
      assert.equal(result.description.includes(readiness), false);
    }
  });

  it('labels outline-only material Coming soon even if its workflow status claims validation', () => {
    for (const readiness of ['planned', 'outlined', 'draft', 'review', 'validated', 'released'] as const) {
      assert.equal(getLearnerReadinessPresentation(readiness, false).label, 'Coming soon');
    }
  });
});
