import fs from 'node:fs';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const outDir = path.resolve('dist');
const manifestPath = path.join(outDir, '.vite', 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('[bundle-budget] Vite manifest missing; cannot verify the production bundle.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const sizeCache = new Map();
function fileSize(file) {
  if (!sizeCache.has(file)) {
    const absolutePath = path.join(outDir, file);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Manifest asset missing: ${file}`);
    }
    const bytes = fs.readFileSync(absolutePath);
    sizeCache.set(file, {
      raw: bytes.byteLength,
      gzip: gzipSync(bytes, { level: 9 }).byteLength,
    });
  }
  return sizeCache.get(file);
}

function collectInitialJs(entryKey, seen = new Set()) {
  if (seen.has(entryKey)) return seen;
  seen.add(entryKey);
  const item = manifest[entryKey];
  if (!item) throw new Error(`Manifest import missing: ${entryKey}`);
  for (const importedKey of item.imports ?? []) {
    collectInitialJs(importedKey, seen);
  }
  return seen;
}

const entryPoints = Object.entries(manifest).filter(([, item]) => item.isEntry);
if (entryPoints.length === 0) {
  console.error('[bundle-budget] No JavaScript entrypoint found in Vite manifest.');
  process.exit(1);
}

let failed = false;
const jsAssets = Object.entries(manifest).filter(([, item]) => item.file?.endsWith('.js'));
const curriculumMarker = 'cgei-ds-q-51-001';
const curriculumAssets = jsAssets.filter(([, item]) => {
  const absolutePath = path.join(outDir, item.file);
  return fs.existsSync(absolutePath) && fs.readFileSync(absolutePath, 'utf8').includes(curriculumMarker);
});
if (curriculumAssets.length === 0) {
  console.error('[bundle-budget] Canonical CGEI curriculum marker is missing from all production JS assets.');
  process.exit(1);
}
for (const [entryKey, entry] of entryPoints) {
  const initialKeys = collectInitialJs(entryKey);
  const initialFiles = [...initialKeys]
    .map((key) => manifest[key]?.file)
    .filter((file) => file?.endsWith('.js'));
  const initialContainsCurriculum = initialFiles.some((file) => {
    const absolutePath = path.join(outDir, file);
    return fs.existsSync(absolutePath) && fs.readFileSync(absolutePath, 'utf8').includes(curriculumMarker);
  });
  if (initialContainsCurriculum) {
    console.error(
      `[bundle-budget] Canonical CGEI curriculum content is in the initial JS graph for ${entry.file ?? entryKey}; it must remain behind a lazy screen boundary.`,
    );
    failed = true;
  }
}

const largest = jsAssets
  .map(([key, item]) => ({ key, file: item.file, ...fileSize(item.file) }))
  .sort((a, b) => b.gzip - a.gzip)[0];

for (const [entryKey, entry] of entryPoints) {
  const files = [...collectInitialJs(entryKey)]
    .map((key) => manifest[key]?.file)
    .filter((file) => file?.endsWith('.js'));
  const uniqueFiles = [...new Set(files)];
  const totals = uniqueFiles.reduce((sum, file) => {
    const size = fileSize(file);
    sum.raw += size.raw;
    sum.gzip += size.gzip;
    return sum;
  }, { raw: 0, gzip: 0 });
  console.log(
    `[bundle-budget] Initial JS for ${entry.file ?? entryKey}: ${(totals.raw / 1024).toFixed(1)} KiB raw / ${(totals.gzip / 1024).toFixed(1)} KiB gzip`,
  );
  // Baseline on 2026-10-24 is approximately 500 KiB gzip across the initial JS graph.
  if (totals.gzip > 600 * 1024) {
    console.error('[bundle-budget] Initial JavaScript exceeds the 600 KiB gzip budget.');
    failed = true;
  }
}

if (largest) {
  console.log(
    `[bundle-budget] Largest JS chunk ${largest.file}: ${(largest.raw / 1024).toFixed(1)} KiB raw / ${(largest.gzip / 1024).toFixed(1)} KiB gzip`,
  );
  if (largest.gzip > 300 * 1024) {
    console.error('[bundle-budget] A single JavaScript chunk exceeds the 300 KiB gzip budget.');
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('[bundle-budget] Production JavaScript budgets passed.');
