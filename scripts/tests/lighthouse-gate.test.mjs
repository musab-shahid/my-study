import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_LIGHTHOUSE_FLOORS,
  DEFAULT_LIGHTHOUSE_METRIC_CEILINGS,
  enforceLighthouseFloors,
  enforceLighthouseMetricCeilings,
} from '../lighthouse-gate.mjs';

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
      /performance=0\.39/,
    );
    assert.throws(
      () => enforceLighthouseFloors(
        { performance: 0.9, accessibility: 0.8 },
        { minPerformance: 0.4, minAccessibility: 0.85 },
      ),
      /accessibility=0\.8/,
    );
  });

  it('passes when both scores meet their floors', () => {
    assert.deepEqual(
      enforceLighthouseFloors(
        { performance: 0.4, accessibility: 0.85 },
        { minPerformance: 0.4, minAccessibility: 0.85 },
      ),
      { performance: 0.4, accessibility: 0.85 },
    );
  });
});

describe('mandatory Lighthouse lab metric ceilings (B2b)', () => {
  it('documents conservative CI ceilings for LCP, CLS, and TBT', () => {
    assert.deepEqual(DEFAULT_LIGHTHOUSE_METRIC_CEILINGS, {
      maxLcpMs: 4000,
      maxCls: 0.1,
      maxTbtMs: 600,
    });
  });

  it('fails when metrics object is missing', () => {
    assert.throws(() => enforceLighthouseMetricCeilings(null), /no lab metrics/);
  });

  it('fails when a required metric is missing or non-finite', () => {
    assert.throws(
      () => enforceLighthouseMetricCeilings({
        lcp: { numericValue: 2000 },
        cls: { numericValue: 0.02 },
      }),
      /TBT/,
    );
    assert.throws(
      () => enforceLighthouseMetricCeilings({
        lcp: { numericValue: Number.NaN },
        cls: { numericValue: 0.02 },
        tbt: { numericValue: 100 },
      }),
      /LCP/,
    );
  });

  it('fails when LCP, CLS, or TBT exceeds its ceiling', () => {
    assert.throws(
      () => enforceLighthouseMetricCeilings({
        lcp: { numericValue: 4001 },
        cls: { numericValue: 0.02 },
        tbt: { numericValue: 100 },
      }),
      /LCP above ceiling/,
    );
    assert.throws(
      () => enforceLighthouseMetricCeilings({
        lcp: { numericValue: 2000 },
        cls: { numericValue: 0.11 },
        tbt: { numericValue: 100 },
      }),
      /CLS above ceiling/,
    );
    assert.throws(
      () => enforceLighthouseMetricCeilings({
        lcp: { numericValue: 2000 },
        cls: { numericValue: 0.02 },
        tbt: { numericValue: 601 },
      }),
      /TBT above ceiling/,
    );
  });

  it('passes when LCP, CLS, and TBT are within ceilings', () => {
    assert.deepEqual(
      enforceLighthouseMetricCeilings({
        lcp: { numericValue: 4000 },
        cls: { numericValue: 0.1 },
        tbt: { numericValue: 600 },
      }),
      { lcp: 4000, cls: 0.1, tbt: 600 },
    );
  });
});
