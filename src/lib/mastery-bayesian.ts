/**
 * Bayesian mastery (Beta–Binomial) — separates coverage from competence (L-03).
 *
 * Prior: Beta(1, 1) uniform.
 * Mastery: P(true accuracy ≥ threshold | data) ≥ confidence.
 */

export interface MasteryPosterior {
  alpha: number;
  beta: number;
  mean: number;
  /** P(p >= accuracyThreshold) under the posterior. */
  probAboveThreshold: number;
  attempts: number;
  correct: number;
  mastered: boolean;
}

const DEFAULT_THRESHOLD = 0.8;
const DEFAULT_CONFIDENCE = 0.9;

/** Log-gamma (Lanczos). */
function logGamma(z: number): number {
  const g = 7;
  const p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.984369705103e-6,
    1.5056327351493116e-7,
  ];
  if (z < 0.5) {
    return Math.log(Math.PI / Math.sin(Math.PI * z)) - logGamma(1 - z);
  }
  z -= 1;
  let x = p[0];
  for (let i = 1; i < g + 2; i++) x += p[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}

/** Continued-fraction regularized incomplete beta (Lentz). */
function incompleteBeta(a: number, b: number, x: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  // Symmetry for better convergence
  if (x > (a + 1) / (a + b + 2)) {
    return 1 - incompleteBeta(b, a, 1 - x);
  }
  const lnFront =
    a * Math.log(x) + b * Math.log(1 - x) - Math.log(a) - logGamma(a) - logGamma(b) + logGamma(a + b);
  const front = Math.exp(lnFront);

  // Lentz continued fraction for the incomplete beta
  const maxIt = 200;
  const eps = 1e-12;
  let c = 1;
  let d = 1 - ((a + b) * x) / (a + 1);
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= maxIt; m++) {
    const m2 = 2 * m;
    // even step
    let numerator = (m * (b - m) * x) / ((a + m2 - 1) * (a + m2));
    d = 1 + numerator * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + numerator / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    h *= d * c;
    // odd step
    numerator = (-(a + m) * (a + b + m) * x) / ((a + m2) * (a + m2 + 1));
    d = 1 + numerator * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + numerator / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < eps) break;
  }
  return Math.min(1, Math.max(0, front * h));
}

/**
 * Survival function P(p >= threshold) for p ~ Beta(alpha, beta).
 * = 1 - F(threshold)
 */
export function betaProbAbove(
  alpha: number,
  beta: number,
  threshold: number,
): number {
  if (!Number.isFinite(alpha) || alpha <= 0) {
    throw new RangeError(`alpha must be a finite positive number, got ${alpha}`);
  }
  if (!Number.isFinite(beta) || beta <= 0) {
    throw new RangeError(`beta must be a finite positive number, got ${beta}`);
  }
  if (!Number.isFinite(threshold) || threshold <= 0 || threshold >= 1) {
    throw new RangeError(
      `threshold must be strictly between 0 and 1, got ${threshold}`,
    );
  }
  const cdf = incompleteBeta(alpha, beta, threshold);
  const result = 1 - cdf;
  if (!Number.isFinite(result)) {
    throw new RangeError(
      `betaProbAbove produced non-finite result for alpha=${alpha}, beta=${beta}, threshold=${threshold}`,
    );
  }
  return Math.min(1, Math.max(0, result));
}

export function computeBayesianMastery(
  correct: number,
  attempts: number,
  options?: {
    accuracyThreshold?: number;
    confidence?: number;
    priorAlpha?: number;
    priorBeta?: number;
  },
): MasteryPosterior {
  if (!Number.isFinite(correct) || correct < 0 || !Number.isSafeInteger(correct)) {
    throw new RangeError(`correct must be a non-negative safe integer, got ${correct}`);
  }
  if (!Number.isFinite(attempts) || attempts < 0 || !Number.isSafeInteger(attempts)) {
    throw new RangeError(`attempts must be a non-negative safe integer, got ${attempts}`);
  }
  if (correct > attempts) {
    throw new RangeError(`correct (${correct}) must not exceed attempts (${attempts})`);
  }

  const accuracyThreshold = options?.accuracyThreshold ?? DEFAULT_THRESHOLD;
  const confidence = options?.confidence ?? DEFAULT_CONFIDENCE;
  const priorAlpha = options?.priorAlpha ?? 1;
  const priorBeta = options?.priorBeta ?? 1;

  if (!Number.isFinite(accuracyThreshold) || accuracyThreshold <= 0 || accuracyThreshold >= 1) {
    throw new RangeError(
      `accuracyThreshold must be strictly between 0 and 1, got ${accuracyThreshold}`,
    );
  }
  if (!Number.isFinite(confidence) || confidence <= 0 || confidence >= 1) {
    throw new RangeError(
      `confidence must be strictly between 0 and 1, got ${confidence}`,
    );
  }
  if (!Number.isFinite(priorAlpha) || priorAlpha <= 0) {
    throw new RangeError(`priorAlpha must be a finite positive number, got ${priorAlpha}`);
  }
  if (!Number.isFinite(priorBeta) || priorBeta <= 0) {
    throw new RangeError(`priorBeta must be a finite positive number, got ${priorBeta}`);
  }

  const c = correct;
  const n = attempts;
  const alpha = priorAlpha + c;
  const beta = priorBeta + (n - c);
  const mean = alpha / (alpha + beta);
  if (!Number.isFinite(mean)) {
    throw new RangeError(
      `mastery mean is non-finite for correct=${correct}, attempts=${attempts}`,
    );
  }
  const probAboveThreshold = betaProbAbove(alpha, beta, accuracyThreshold);
  const mastered = n > 0 && probAboveThreshold >= confidence;

  return {
    alpha,
    beta,
    mean,
    probAboveThreshold,
    attempts: n,
    correct: c,
    mastered,
  };
}

/**
 * Coverage share is intentionally separate from mastery (do not blend 50/50).
 * Readiness-style composite can weight them explicitly when a blueprint exists.
 */
export function compositeReadiness(args: {
  coverageShare: number; // 0–1 topics/lessons with any evidence
  meanRecallProbability: number; // 0–1 predicted recall
  coverageWeight?: number;
}): { score: number; coverageShare: number; meanRecallProbability: number } {
  const w = args.coverageWeight ?? 0.25; // coverage is a lesser signal than recall
  const cov = Math.min(1, Math.max(0, args.coverageShare));
  const rec = Math.min(1, Math.max(0, args.meanRecallProbability));
  return {
    score: 100 * (w * cov + (1 - w) * rec),
    coverageShare: cov,
    meanRecallProbability: rec,
  };
}
