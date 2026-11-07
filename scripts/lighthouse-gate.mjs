export const DEFAULT_LIGHTHOUSE_FLOORS = Object.freeze({ performance: 0.5, accessibility: 0.95 });

/**
 * Lab metric ceilings for Core Web Vitals / responsiveness.
 * Values are intentional CI floors (not field targets): local static serve +
 * shared runners are noisy. Tighten only after repeated green lab runs.
 *
 * Units: LCP/TBT in milliseconds, CLS unitless.
 */
export const DEFAULT_LIGHTHOUSE_METRIC_CEILINGS = Object.freeze({
  maxLcpMs: 4000,
  maxCls: 0.1,
  maxTbtMs: 600,
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
 * Enforce numeric lab metric ceilings for LCP, CLS, and TBT.
 * Missing required metrics fail closed (caller should extract via extractLighthouseMetrics first).
 */
export function enforceLighthouseMetricCeilings(metrics, ceilings = DEFAULT_LIGHTHOUSE_METRIC_CEILINGS) {
  if (!metrics || typeof metrics !== 'object') {
    throw new Error('Lighthouse is required: no lab metrics were produced');
  }

  const { maxLcpMs, maxCls, maxTbtMs } = ceilings ?? {};
  if (
    !Number.isFinite(maxLcpMs) || maxLcpMs <= 0 ||
    !Number.isFinite(maxCls) || maxCls < 0 ||
    !Number.isFinite(maxTbtMs) || maxTbtMs <= 0
  ) {
    throw new Error('Invalid Lighthouse metric ceilings');
  }

  const required = [
    { key: 'lcp', label: 'LCP', max: maxLcpMs, unit: 'ms' },
    { key: 'cls', label: 'CLS', max: maxCls, unit: '' },
    { key: 'tbt', label: 'TBT', max: maxTbtMs, unit: 'ms' },
  ];

  const accepted = {};
  for (const { key, label, max, unit } of required) {
    const metric = metrics[key];
    const value = metric?.numericValue;
    if (!Number.isFinite(value)) {
      throw new Error(`Lighthouse is required: ${label} metric is missing or non-finite`);
    }
    if (value > max) {
      const shown = unit ? `${value}${unit}` : String(value);
      const limit = unit ? `${max}${unit}` : String(max);
      throw new Error(
        `Lighthouse ${label} above ceiling: ${shown} (max ${limit})`,
      );
    }
    accepted[key] = value;
  }

  return accepted;
}
