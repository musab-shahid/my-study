/**
 * Distractor-level analytics from review events (L-11 signal).
 * Uses chosenOption when present (option indices or labels from dual-write).
 */

import type { ReviewEvent } from './review-event.ts';

export interface DistractorStat {
  itemId: string;
  chosenOption: string;
  wrongCount: number;
  totalAttempts: number;
  /** wrongCount / totalAttempts for this option on this item */
  shareOfItemAttempts: number;
}

export interface StickyDistractor extends DistractorStat {
  /** wrongCount among wrong attempts only */
  shareOfWrong: number;
}

/**
 * Aggregate wrong selections per (itemId, chosenOption).
 */
export function computeDistractorStats(events: ReviewEvent[]): DistractorStat[] {
  const totals = new Map<string, number>();
  const wrong = new Map<string, number>(); // key = itemId\0option

  for (const e of events) {
    totals.set(e.itemId, (totals.get(e.itemId) ?? 0) + 1);
    if (!e.correct && e.chosenOption != null && e.chosenOption !== '') {
      const key = `${e.itemId}\0${e.chosenOption}`;
      wrong.set(key, (wrong.get(key) ?? 0) + 1);
    }
  }

  const out: DistractorStat[] = [];
  for (const [key, wrongCount] of wrong) {
    const [itemId, chosenOption] = key.split('\0');
    const totalAttempts = totals.get(itemId) ?? wrongCount;
    out.push({
      itemId,
      chosenOption,
      wrongCount,
      totalAttempts,
      shareOfItemAttempts: wrongCount / Math.max(1, totalAttempts),
    });
  }

  out.sort((a, b) => b.wrongCount - a.wrongCount);
  return out;
}

/**
 * Sticky distractors: wrong options chosen at least minWrong times
 * and accounting for >= minShare of that item's attempts.
 */
export function stickyDistractors(
  events: ReviewEvent[],
  opts?: { minWrong?: number; minShare?: number; limit?: number },
): StickyDistractor[] {
  const minWrong = opts?.minWrong ?? 2;
  const minShare = opts?.minShare ?? 0.3;
  const limit = opts?.limit ?? 20;

  // wrong attempts per item
  const wrongTotals = new Map<string, number>();
  for (const e of events) {
    if (!e.correct) wrongTotals.set(e.itemId, (wrongTotals.get(e.itemId) ?? 0) + 1);
  }

  const stats = computeDistractorStats(events);
  const sticky: StickyDistractor[] = [];
  for (const s of stats) {
    if (s.wrongCount < minWrong) continue;
    if (s.shareOfItemAttempts < minShare) continue;
    const wTot = wrongTotals.get(s.itemId) ?? s.wrongCount;
    sticky.push({
      ...s,
      shareOfWrong: s.wrongCount / Math.max(1, wTot),
    });
  }
  return sticky.slice(0, limit);
}

/** Human-readable summary lines for Progress / diagnostics. */
export function formatStickyDistractorLines(
  sticky: StickyDistractor[],
  resolveItemTitle?: (itemId: string) => string,
): string[] {
  return sticky.map((s) => {
    const title = resolveItemTitle?.(s.itemId) ?? s.itemId;
    return `${title}: option “${s.chosenOption}” chosen wrong ${s.wrongCount}× (${Math.round(s.shareOfItemAttempts * 100)}% of attempts)`;
  });
}
