#!/usr/bin/env node
/**
 * Unified CGEI gate — local and CI must call the same script so they cannot drift.
 * Order matches Phase A local gate (curriculum / data subset).
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const steps = [
  ['npm', ['run', 'validate:data']],
  ['npm', ['run', 'audit:core-leaf-evidence']],
  ['npm', ['run', 'check:cgei-index']],
  ['npm', ['run', 'check:topic-metadata']],
];

let failed = 0;
for (const [cmd, args] of steps) {
  console.log(`\n▶ check:cgei — ${cmd} ${args.join(' ')}`);
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });
  if (result.status !== 0) {
    failed = result.status || 1;
    console.error(`✖ step failed: ${cmd} ${args.join(' ')} (exit ${failed})`);
    process.exit(failed);
  }
}

console.log('\n✅ check:cgei passed');
process.exit(0);
