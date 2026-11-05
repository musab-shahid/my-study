// Measured after B1 route-lazy screens + KaTeX CSS defer (2026-11-05):
// initial JS ~144.7 KiB gzip, largest chunk ~176.7 KiB gzip.
// Caps are measured +10%, rounded up; initial also stays under the 230 KiB product target.
export const INITIAL_JS_GZIP_BUDGET_BYTES = 160 * 1024;
export const LARGEST_JS_CHUNK_GZIP_BUDGET_BYTES = 195 * 1024;

export function withinBundleBudgets(initialJsGzipBytes, largestChunkGzipBytes) {
  return Number.isFinite(initialJsGzipBytes) &&
    Number.isFinite(largestChunkGzipBytes) &&
    initialJsGzipBytes <= INITIAL_JS_GZIP_BUDGET_BYTES &&
    largestChunkGzipBytes <= LARGEST_JS_CHUNK_GZIP_BUDGET_BYTES;
}
