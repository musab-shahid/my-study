import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    return /\\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

test('FSRS comparison compatibility exports load the evaluator only on demand', () => {
  const wrapper = readFileSync('src/lib/fsrs-shadow-compare.ts', 'utf8');
  assert.match(wrapper, /await import\\(['"]\\.\\/fsrs-evaluation\\.ts['"]\\)/);
  assert.doesNotMatch(wrapper, /export\\s*\\{[\\s\\S]*?\\}\\s*from\\s*['"]\\.\\/fsrs-evaluation\\.ts['"]/);
  assert.doesNotMatch(wrapper, /import\\s*\\{[^}]+\\}\\s*from\\s*['"]\\.\\/fsrs-evaluation\\.ts['"]/);
});

test('application source never statically imports the FSRS evaluator or ts-fsrs package', () => {
  const files = sourceFiles('src').filter((path) => !path.includes('/__tests__/') && !path.endsWith('.test.ts'));
  const staticEvaluatorImport = /(?:import|export)\\s+(?:type\\s+)?(?:[^;]*?\\s+from\\s*)['"][^'"]*fsrs-evaluation(?:\\.ts)?['"]/s;
  const staticFsrsPackage = /from\\s*['"]ts-fsrs['"]/;
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    if (file.endsWith('/fsrs-evaluation.ts')) continue;
    assert.doesNotMatch(source, staticEvaluatorImport, `static FSRS evaluator import in ${relative('src', file)}`);
    assert.doesNotMatch(source, staticFsrsPackage, `static ts-fsrs import in ${relative('src', file)}`);
  }
});
