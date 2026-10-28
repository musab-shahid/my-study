/**
 * Empirical item difficulty from the review log (L-04 partial).
 * Author labels remain the default until enough attempts accumulate.
 * Counts-only, local: no pooled multi-user stats in this module.
 */

import type { Difficulty } from '../types.ts';
import type { ReviewEvent } from './review-event.ts';
import { DIFFICULTY_DELTA } from './adaptive-select.ts';

export interface ItemDifficultyEstimate {
  itemId: string;
  attempts: number;
  correct: number;
  /** Empirical error rate 0–1 (higher = harder). */
  errorRate: number;
  /** Mapped label when attempts ≥ minAttempts; else null. */
  calibratedLabel: Difficulty | null;
  /** Elo-style delta to use: calibrated or author fallback. */
  delta: number;
  source: 'calibrated' | 'author' | 'default';
}

const DEFAULT_MIN_ATTEMPTS = 8;

/** Map error rate to easy/medium/hard using fixed cut points. */
export function errorRateToLabel(errorRate: number): Difficulty {
  if (errorRate < 0.25) return 'easy';
  if (errorRate < 0.55) return 'medium';
  return 'hard';
}

export function estimateItemDifficulty(
  events: ReviewEvent[],
  itemId: string,
  authorDifficulty?: Difficulty,
  minAttempts = DEFAULT_MIN_ATTEMPTS,
): ItemDifficultyEstimate {
  let attempts = 0;
  let correct = 0;
  for (const e of events) {
    if (e.itemId !== itemId) continue;
    attempts += 1;
    if (e.correct) correct += 1;
  }
  const errorRate = attempts > 0 ? 1 - correct / attempts : 0.5;
  if (attempts >= minAttempts) {
    const calibratedLabel = errorRateToLabel(errorRate);
    return {
      itemId,
      attempts,
      correct,
      errorRate,
      calibratedLabel,
      delta: DIFFICULTY_DELTA[calibratedLabel],
      source: 'calibrated',
    };
  }
  if (authorDifficulty) {
    return {
      itemId,
      attempts,
      correct,
      errorRate,
      calibratedLabel: null,
      delta: DIFFICULTY_DELTA[authorDifficulty],
      source: 'author',
    };
  }
  return {
    itemId,
    attempts,
    correct,
    errorRate,
    calibratedLabel: null,
    delta: DIFFICULTY_DELTA.medium,
    source: 'default',
  };
}

/** Build a map for all items that appear in the log (and optional author map). */
export function buildDifficultyMap(
  events: ReviewEvent[],
  authorByItem: Record<string, Difficulty | undefined> = {},
  minAttempts = DEFAULT_MIN_ATTEMPTS,
): Map<string, ItemDifficultyEstimate> {
  const ids = new Set<string>();
  for (const e of events) ids.add(e.itemId);
  for (const id of Object.keys(authorByItem)) ids.add(id);
  const map = new Map<string, ItemDifficultyEstimate>();
  for (const id of ids) {
    map.set(id, estimateItemDifficulty(events, id, authorByItem[id], minAttempts));
  }
  return map;
}
