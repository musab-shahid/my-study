import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) walk(path, files);
    else if (/\.(tsx|jsx)$/.test(name)) files.push(path);
  }
  return files;
}

// Catch direct JSX interpolation of internal readiness values. Comparisons
// used to derive the presentation model remain allowed.
const directReadinessOutput = /\{\s*[\w$.?]+\.readiness\s*\}/g;
const violations = [];

for (const path of walk(SRC)) {
  const content = readFileSync(path, 'utf8');
  for (const match of content.matchAll(directReadinessOutput)) {
    const line = content.slice(0, match.index).split('\n').length;
    violations.push(`${relative(ROOT, path)}:${line}: ${match[0]}`);
  }
}

if (violations.length) {
  console.error('Learner-facing screens must translate internal readiness states before rendering:');
  for (const violation of violations) console.error('-', violation);
  process.exit(1);
}

console.log('Learner-readiness presentation guard passed: no direct readiness enum interpolation found.');
