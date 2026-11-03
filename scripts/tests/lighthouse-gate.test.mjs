import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { enforceLighthouseFloors } from '../lighthouse-gate.mjs';

describe('mandatory Lighthouse performance gate', () => {
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

  it('accepts scores meeting both floors', () => {
    assert.doesNotThrow(() => enforceLighthouseFloors(
      { performance: 0.4, accessibility: 0.85 },
      { minPerformance: 0.4, minAccessibility: 0.85 },
    ));
  });
});
