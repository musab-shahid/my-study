// Measured on the 2026-11-04 production CI build: 293.0 KiB initial gzip
// and 176.7 KiB largest chunk gzip. These caps are the measured sizes +10%,
// rounded up to whole KiB; lower them only after measuring a smaller baseline.
export const INITIAL_JS_GZIP_BUDGET_BYTES = 323 * 1024;
export const LARGEST_JS_CHUNK_GZIP_BUDGET_BYTES = 195 * 1024;

export function withinBundleBudgets(initialJsGzipBytes, largestChunkGzipBytes) {
  return Number.isFinite(initialJsGzipBytes) &&
    Number.isFinite(largestChunkGzipBytes) &&
    initialJsGzipBytes <= INITIAL_JS_GZIP_BUDGET_BYTES &&
    largestChunkGzipBytes <= LARGEST_JS_CHUNK_GZIP_BUDGET_BYTES;
}
