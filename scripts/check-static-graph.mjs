/**
 * Guard: the production Rollup graph must not reintroduce a blanket app-lib
 * chunk rule that forces every /src/lib module into one eager payload.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const viteConfig = readFileSync(join(root, 'vite.config.ts'), 'utf8');

if (/['"]app-lib['"]\s*:/.test(viteConfig) || /manualChunks\s*:\s*\{[^}]*app-lib/s.test(viteConfig)) {
  console.error('Static-graph guard failed: vite.config.ts still forces an app-lib manual chunk.');
  process.exit(1);
}

if (/id\.includes\(['"]\/src\/lib\/['"]\)/.test(viteConfig) || /id\.includes\(["']\/src\/lib\/["']\)/.test(viteConfig)) {
  console.error('Static-graph guard failed: vite.config.ts still maps all /src/lib modules into one chunk.');
  process.exit(1);
}

console.log('Static-graph guard passed: no blanket app-lib chunk rule.');
