export const DEFAULT_LIGHTHOUSE_FLOORS = Object.freeze({ performance: 0.5, accessibility: 0.95 });

/**
 * Lab metric ceilings (worse = higher for LCP/TBT; CLS is unitless).
 * Floors sit above typical CI lab noise while still catching large regressions.
 * Values are milliseconds for LCP/TBT and the CLS score for cumulative-layout-shift.
 */
export const DEFAULT_LIGHTHOUSE_METRIC_FLOORS = Object.freeze({
  lcp: 4000,
  cls: 0.1,
  tbt: 600,
});

/**
 * Enforce the CI Lighthouse score floors.
 *
 * Missing or malformed reports are failures: the browser smoke test is not a
 * substitute for Lighthouse performance and accessibility measurements.
 */
export function enforceLighthouseFloors(scores, thresholds) {
  if (!scores || typeof scores !== 'object') {
    throw new Error('Lighthouse is required: no score report was produced');
  }

  const { performance, accessibility } = scores;
  if (!Number.isFinite(performance) || !Number.isFinite(accessibility)) {
    throw new Error('Lighthouse is required: performance and accessibility scores must both be finite numbers');
  }

  const { minPerformance, minAccessibility } = thresholds ?? {};
  if (
    !Number.isFinite(minPerformance) ||
    !Number.isFinite(minAccessibility) ||
    minPerformance < 0 || minPerformance > 1 ||
    minAccessibility < 0 || minAccessibility > 1
  ) {
    throw new Error('Invalid Lighthouse score thresholds');
  }

  if (performance < minPerformance || accessibility < minAccessibility) {
    throw new Error(
      `Lighthouse score below threshold: performance=${performance} (min ${minPerformance}), accessibility=${accessibility} (min ${minAccessibility})`,
    );
  }

  return { performance, accessibility };
}

/**
 * Enforce required lab metric ceilings (LCP, CLS, TBT).
 * Missing required metrics fail closed.
 */
export function enforceLighthouseMetricFloors(metrics, ceilings = DEFAULT_LIGHTHOUSE_METRIC_FLOORS) {
  if (!metrics || typeof metrics !== 'object') {
    throw new Error('Lighthouse is required: no lab metrics were produced');
  }

  const required = ['lcp', 'cls', 'tbt'];
  for (const key of required) {
    const ceiling = ceilings[key];
    if (!Number.isFinite(ceiling) || ceiling < 0) {
      throw new Error(`Invalid Lighthouse metric ceiling for ${key}`);
    }
    const metric = metrics[key];
    if (!metric || !Number.isFinite(metric.numericValue)) {
      throw new Error(`Lighthouse required metric ${key} is missing or non-finite`);
    }
    if (metric.numericValue > ceiling) {
      throw new Error(
        `Lighthouse metric ${key}=${metric.numericValue} exceeds ceiling ${ceiling}`,
      );
    }
  }

  return {
    lcp: metrics.lcp.numericValue,
    cls: metrics.cls.numericValue,
    tbt: metrics.tbt.numericValue,
  };
}
