import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { extractLighthouseMetrics } from '../lighthouse-metrics.mjs';

const report = {
  categories: { performance: { score: 0.82 }, accessibility: { score: 1 } },
  audits: {
    'largest-contentful-paint': { numericValue: 2450, numericUnit: 'millisecond', displayValue: '2.5 s', score: 0.9 },
    'cumulative-layout-shift': { numericValue: 0.04, numericUnit: 'unitless', displayValue: '0.04', score: 0.98 },
    'total-blocking-time': { numericValue: 180, numericUnit: 'millisecond', displayValue: '180 ms', score: 0.8 },
    'first-contentful-paint': { numericValue: 1200, numericUnit: 'millisecond', displayValue: '1.2 s', score: 0.95 },
    'speed-index': { numericValue: 2100, numericUnit: 'millisecond', displayValue: '2.1 s', score: 0.9 },
    interactive: { numericValue: 3100, numericUnit: 'millisecond', displayValue: '3.1 s', score: 0.85 },
    'server-response-time': { numericValue: 120, numericUnit: 'millisecond', displayValue: '120 ms', score: 0.9 },
  },
};

describe('Lighthouse lab metric extraction', () => {
  it('returns category scores and core web-vital / responsiveness measurements', () => {
    const result = extractLighthouseMetrics(report);
    assert.equal(result.scores.performance, 0.82);
    assert.equal(result.scores.accessibility, 1);
    assert.deepEqual(Object.fromEntries(['lcp', 'cls', 'tbt'].map((key) => [key, result.metrics[key].numericValue])), { lcp: 2450, cls: 0.04, tbt: 180 });
  });
  it('retains additional lab metrics with raw values, units, display values and scores', () => {
    const { metrics } = extractLighthouseMetrics(report);
    assert.equal(metrics.fcp.displayValue, '1.2 s');
    assert.equal(metrics.speedIndex.numericValue, 2100);
    assert.equal(metrics.interactive.numericUnit, 'millisecond');
    assert.equal(metrics.serverResponseTime.score, 0.9);
  });
  it('fails closed when a required lab metric is absent or non-finite', () => {
    const missing = structuredClone(report);
    delete missing.audits['total-blocking-time'];
    assert.throws(() => extractLighthouseMetrics(missing), /total-blocking-time/);
    const invalid = structuredClone(report);
    invalid.audits['largest-contentful-paint'].numericValue = Number.NaN;
    assert.throws(() => extractLighthouseMetrics(invalid), /largest-contentful-paint/);
  });
});
