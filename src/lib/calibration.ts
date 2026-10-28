/**
 * Confidence calibration from review events (L-05 / L-10).
 */

import type { ReviewConfidence, ReviewEvent } from './review-event.ts';

export interface CalibrationBin {
  confidence: ReviewConfidence;
  label: string;
  n: number;
  accuracy: number; // 0–1
  /** accuracy - expected (guess≈0.33, think≈0.55, sure≈0.8) for a rough bias signal */
  bias: number;
}

const EXPECTED: Record<ReviewConfidence, number> = {
  1: 0.33,
  2: 0.55,
  3: 0.8,
};

const LABELS: Record<ReviewConfidence, string> = {
  1: 'Guess',
  2: 'Think so',
  3: 'Sure',
};

export function computeCalibration(events: ReviewEvent[]): CalibrationBin[] {
  const buckets: Record<ReviewConfidence, { n: number; correct: number }> = {
    1: { n: 0, correct: 0 },
    2: { n: 0, correct: 0 },
    3: { n: 0, correct: 0 },
  };
  for (const e of events) {
    if (e.confidence !== 1 && e.confidence !== 2 && e.confidence !== 3) continue;
    buckets[e.confidence].n += 1;
    if (e.correct) buckets[e.confidence].correct += 1;
  }
  return ([1, 2, 3] as ReviewConfidence[]).map((c) => {
    const { n, correct } = buckets[c];
    const accuracy = n > 0 ? correct / n : 0;
    return {
      confidence: c,
      label: LABELS[c],
      n,
      accuracy,
      bias: n > 0 ? accuracy - EXPECTED[c] : 0,
    };
  });
}

/** High-confidence errors — strongest teaching targets (hypercorrection). */
export function confidentErrors(events: ReviewEvent[]): ReviewEvent[] {
  return events.filter((e) => e.correct === false && e.confidence === 3);
}
