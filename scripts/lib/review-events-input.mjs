/** Normalize review-event JSON for offline evaluation tools. */
export function normalizeReviewEventsInput(parsed) {
  if (Array.isArray(parsed)) return parsed;
  if (parsed && typeof parsed === 'object' && Array.isArray(parsed.events)) return parsed.events;
  throw new TypeError('Input must be a JSON array of ReviewEvent records, or a review-log export with an events array.');
}
