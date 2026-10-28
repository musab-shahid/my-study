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
  if (threshold <= 0) return 1;
  if (threshold >= 1) return 0;
  const cdf = incompleteBeta(alpha, beta, threshold);
  return Math.min(1, Math.max(0, 1 - cdf));
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
  const accuracyThreshold = options?.accuracyThreshold ?? DEFAULT_THRESHOLD;
  const confidence = options?.confidence ?? DEFAULT_CONFIDENCE;
  const priorAlpha = options?.priorAlpha ?? 1;
  const priorBeta = options?.priorBeta ?? 1;

  const c = Math.max(0, Math.floor(correct));
  const n = Math.max(0, Math.floor(attempts));
  const alpha = priorAlpha + c;
  const beta = priorBeta + (n - c);
  const mean = alpha / (alpha + beta);
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
