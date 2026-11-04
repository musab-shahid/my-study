export const DEFAULT_LIGHTHOUSE_FLOORS = Object.freeze({ performance: 0.5, accessibility: 0.95 });

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
