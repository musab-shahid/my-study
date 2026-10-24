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

const curriculumModuleKey = Object.keys(manifest).find((key) => key.replace(/\\/g, '/').endsWith('src/data/cgei/curriculum.ts'));
if (!curriculumModuleKey) {
  console.error('[bundle-budget] CGEI curriculum module is missing from the Vite manifest.');
  process.exit(1);
}
const initialModuleKeys = new Set(entryPoints.flatMap(([entryKey]) => [...collectInitialJs(entryKey)]));
if (initialModuleKeys.has(curriculumModuleKey) || !manifest[curriculumModuleKey].isDynamicEntry) {
  console.error('[bundle-budget] CGEI curriculum must remain a dynamic entry, outside the initial JavaScript graph.');
  process.exit(1);
}
console.log('[bundle-budget] CGEI curriculum is excluded from the initial JavaScript graph.');

const jsAssets = Object.entries(manifest).filter(([, item]) => item.file?.endsWith('.js'));
const largest = jsAssets
  .map(([key, item]) => ({ key, file: item.file, ...fileSize(item.file) }))
  .sort((a, b) => b.gzip - a.gzip)[0];

let failed = false;
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
