/**
 * Reads the per-scenario allowance map from axe-moderate-baseline.json.
 * The file intentionally wraps scenario entries in a top-level "moderate" key.
 */
export function allowedModerateCounts(baseline, scenario) {
  return baseline.moderate?.[scenario] ?? {};
}

/** Return only violation counts that exceed the committed allowance. */
export function findModerateIncreases(actual, allowed) {
  return Object.entries(actual).filter(([id, count]) => count > (allowed[id] ?? 0));
}
