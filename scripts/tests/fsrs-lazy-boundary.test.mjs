import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

test('FSRS comparison compatibility exports load the evaluator only on demand', () => {
  const wrapper = readFileSync('src/lib/fsrs-shadow-compare.ts', 'utf8');
  assert.match(wrapper, /await import\(['"]\.\/fsrs-evaluation\.ts['"]\)/);
  assert.doesNotMatch(wrapper, /export\s*\{[\s\S]*?\}\s*from\s*['"]\.\/fsrs-evaluation\.ts['"]/);
  assert.doesNotMatch(wrapper, /import\s*\{[^}]+\}\s*from\s*['"]\.\/fsrs-evaluation\.ts['"]/);
});

test('application source never statically imports the FSRS evaluator or ts-fsrs package', () => {
  const files = sourceFiles('src').filter((path) => !path.includes('/__tests__/') && !path.endsWith('.test.ts'));
  const staticEvaluatorImport = /(?:import|export)\s+(?!type\b)(?:[^;]*?\s+from\s*)['"][^'"]*fsrs-evaluation(?:\.ts)?['"]/s;
  const staticFsrsPackage = /from\s*['"]ts-fsrs['"]/;
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    if (file.endsWith('/fsrs-evaluation.ts')) continue;
    assert.doesNotMatch(source, staticEvaluatorImport, `static FSRS evaluator import in ${relative('src', file)}`);
    assert.doesNotMatch(source, staticFsrsPackage, `static ts-fsrs import in ${relative('src', file)}`);
  }
});

test('production bundle check requires evaluator and dependency chunks outside the initial JS graph', () => {
  const bundleCheck = readFileSync('scripts/check-bundle-budget.mjs', 'utf8');
  assert.match(bundleCheck, /fsrs-evaluation/);
  assert.match(bundleCheck, /initialFiles\.includes/);
});

test('Vite keeps the evaluator and ts-fsrs dependency in separate lazy chunks', () => {
  const viteConfig = readFileSync('vite.config.ts', 'utf8');
  assert.ok(viteConfig.includes("id.includes('/node_modules/ts-fsrs/')"));
  assert.ok(viteConfig.includes("return 'vendor-fsrs'"));
  assert.ok(viteConfig.includes("id.endsWith('/src/lib/fsrs-evaluation.ts')"));
});
