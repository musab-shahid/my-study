/**
 * Map the two canonical data modules for a CGEI subject into one Rollup chunk.
 * The curriculum assembler and shared registry remain in their own chunks.
 */
export function getCgeiSubjectChunkName(moduleId) {
  const normalized = String(moduleId).replaceAll('\\', '/').split('?')[0];
  const match = normalized.match(/(?:^|\/)src\/data\/cgei\/([^/]+)\/(?:topics|questions)-[^/]+\.ts$/);
  return match ? `cgei-${match[1]}` : null;
}
