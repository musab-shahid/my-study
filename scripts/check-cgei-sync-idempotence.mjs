#!/usr/bin/env node
/**
 * Idempotence check for CGEI sync — verifies that re-running the full
 * sync produces no file changes.
 *
 * Uses content comparison so it works in environments without a git repo
 * (e.g. the Bolt sandbox). In a git repo the same check could be done with
 * `git diff --exit-code`, but this keeps CI and local identical.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const files = [
  'docs/cgei/question-id-ledger.json',
  'src/data/sections.ts',
  'src/data/cgei/curriculum-index.ts',
  'src/data/topic-metadata.ts',
];

// Snapshot before
const before = {};
for (const rel of files) {
  before[rel] = readFileSync(resolve(root, rel), 'utf8');
}

// Re-run the full sync
const result = spawnSync(
  'npm',
  ['run', 'cgei:sync', '--', '--reason=CI-idempotence-check'],
  { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' },
);
if (result.status !== 0) {
  console.error('✖ cgei:sync failed');
  process.exit(result.status ?? 1);
}

// Compare after (the registry manifest's generatedAt is intentionally refreshed).
let changed = false;
for (const rel of files) {
  const after = readFileSync(resolve(root, rel), 'utf8');
  if (after !== before[rel]) {
    console.error('✖ file changed after re-sync (not idempotent): ' + rel);
    changed = true;
  }
}

if (changed) {
  console.error('CGEI sync is not idempotent — commit the regenerated files.');
  process.exit(1);
}
const registryCheck = spawnSync('npm', ['run', 'check:cgei-registry'], {
  cwd: root,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});
if (registryCheck.status !== 0) {
  console.error('CGEI registry manifest is stale after sync.');
  process.exit(registryCheck.status ?? 1);
}
console.log('CGEI sync idempotence and registry manifest checks OK.');
