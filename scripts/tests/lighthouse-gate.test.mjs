import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_LIGHTHOUSE_FLOORS, enforceLighthouseFloors } from '../lighthouse-gate.mjs';

describe('mandatory Lighthouse performance gate', () => {
  it('uses floors just below the measured production scores', () => {
    assert.deepEqual(DEFAULT_LIGHTHOUSE_FLOORS, { performance: 0.5, accessibility: 0.95 });
  });
  it('fails when Lighthouse did not return scores', () => {
    assert.throws(
      () => enforceLighthouseFloors(null, { minPerformance: 0.4, minAccessibility: 0.85 }),
      /Lighthouse is required/,
    );
  });

  it('fails when performance or accessibility is below its floor', () => {
    assert.throws(
      () => enforceLighthouseFloors(
        { performance: 0.39, accessibility: 0.99 },
        { minPerformance: 0.4, minAccessibility: 0.85 },
      ),
      /below threshold/,
    );
    assert.throws(
      () => enforceLighthouseFloors(
        { performance: 0.99, accessibility: 0.84 },
        { minPerformance: 0.4, minAccessibility: 0.85 },
      ),
      /below threshold/,
    );
  });

  it('fails closed for incomplete or non-numeric score reports', () => {
    assert.throws(
      () => enforceLighthouseFloors({ performance: 0.9 }, { minPerformance: 0.4, minAccessibility: 0.85 }),
      /must both be finite numbers/,
    );
    assert.throws(
      () => enforceLighthouseFloors({ performance: Number.NaN, accessibility: 0.9 }, { minPerformance: 0.4, minAccessibility: 0.85 }),
      /must both be finite numbers/,
    );
  });

  it('accepts scores meeting both floors', () => {
    assert.doesNotThrow(() => enforceLighthouseFloors(
      { performance: 0.4, accessibility: 0.85 },
      { minPerformance: 0.4, minAccessibility: 0.85 },
    ));
  });
});
