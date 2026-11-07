/**
 * Learner-facing export of the browser-local review log.
 * Does not upload data or change the production scheduler.
 */
import { getDefaultReviewLog } from './review-log.ts';
import type { ReviewEvent } from './review-event.ts';

export interface ReviewLogExportPayload {
  schemaVersion: 1;
  exportedAt: string;
  source: 'my-study-review-log';
  eventCount: number;
  events: ReviewEvent[];
}

/** Load all review events and package them for download or analysis. */
export async function buildReviewLogExport(): Promise<ReviewLogExportPayload> {
  const log = getDefaultReviewLog();
  const events = await log.getAll();
  // Stable chronological order for offline FSRS harness input.
  const sorted = [...events].sort((a, b) => {
    if (a.ts !== b.ts) return a.ts - b.ts;
    return a.id.localeCompare(b.id);
  });
  return {
    schemaVersion: 1,
    exportedAt: new Date().toISOString(),
    source: 'my-study-review-log',
    eventCount: sorted.length,
    events: sorted,
  };
}

/** Trigger a JSON file download of the review log. Returns event count. */
export async function downloadReviewLogExport(): Promise<number> {
  const payload = await buildReviewLogExport();
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement('a');
    const day = payload.exportedAt.slice(0, 10);
    a.href = url;
    a.download = `my-study-review-log-${day}.json`;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
  return payload.eventCount;
}
