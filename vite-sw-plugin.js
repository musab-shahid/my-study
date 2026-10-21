import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
import { createHash } from 'node:crypto';

const PRECACHE_EXTENSIONS = new Set(['.js', '.css', '.woff2', '.woff', '.ttf']);

/**
 * Lazy subject banks are huge and should load on demand, not at install.
 * Vite names those chunks from the source path (questions-*, topics-*).
 */
function isLazyContentChunk(relPath) {
  const name = basename(relPath).toLowerCase();
  return (
    name.includes('questions-') ||
    name.includes('topics-') ||
    // Rollup sometimes prefixes with parent folder hash paths
    relPath.includes('/questions-') ||
    relPath.includes('/topics-')
  );
}

/** Precache app shell + vendors; exclude lazy subject packs. */
function isShellAsset(relPath) {
  return !isLazyContentChunk(relPath);
}

async function collectAssets(dir, base = '') {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...await collectAssets(fullPath, relPath));
    } else if (PRECACHE_EXTENSIONS.has(extname(entry.name))) {
      results.push(relPath);
    }
  }
  return results;
}

export function swPrecachePlugin() {
  let outDir = 'dist';
  return {
    name: 'sw-precache',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    async writeBundle() {
      const distDir = join(process.cwd(), outDir);

      const assetsDir = join(distDir, 'assets');
      let assetFiles = [];
      try {
        assetFiles = await collectAssets(assetsDir, 'assets');
      } catch {
        /* assets dir may not exist */
      }

      const shellAssets = assetFiles.filter(isShellAsset);
      const skipped = assetFiles.length - shellAssets.length;

      // Static shell + icons (not under /assets/)
      const precacheUrls = [
        '/',
        '/index.html',
        '/manifest.json',
        '/favicon.svg',
        '/icon-192.png',
        '/icon-512.png',
        '/apple-touch-icon.png',
      ];
      for (const f of shellAssets) {
        precacheUrls.push(`/${f}`);
      }

      // Version from full asset list so any content change still busts cache name
      const hashInput = [...assetFiles].sort().join('|');
      const cacheHash = createHash('md5').update(hashInput).digest('hex').slice(0, 8);
      const cacheName = `examprep-${cacheHash}`;

      const swTemplatePath = join(process.cwd(), 'public', 'sw.js');
      let swContent = await readFile(swTemplatePath, 'utf-8');

      swContent = swContent.replace(/^const CACHE = .*$/m, `const CACHE = '${cacheName}';`);
      swContent = swContent.replace(
        /^const PRECACHE = .*$/m,
        `const PRECACHE = ${JSON.stringify(precacheUrls)};`,
      );

      await mkdir(distDir, { recursive: true });
      await writeFile(join(distDir, 'sw.js'), swContent, 'utf-8');

      console.log(
        `[sw-precache] Cache: ${cacheName}, precaching ${precacheUrls.length} URLs` +
          (skipped ? ` (skipped ${skipped} lazy content chunks)` : ''),
      );
    },
  };
}
