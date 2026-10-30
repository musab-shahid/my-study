#!/usr/bin/env node
/**
 * Unified CGEI gate — local and CI must call the same script so they cannot drift.
 *
 * Core gate (matches pre-A3 CI curriculum steps):
 *   validate:data + audit:core-leaf-evidence
 *
 * Optional index/metadata --check scripts remain available as
 *   npm run check:cgei-index / check:topic-metadata
 * and should be added here once generate:* output is committed in parity.
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const steps = [
  ['npm', ['run', 'validate:data']],
  ['npm', ['run', 'lint:cgei-questions']],
  ['npm', ['run', 'audit:core-leaf-evidence']],
];

for (const [cmd, args] of steps) {
  console.log(`\n▶ check:cgei — ${cmd} ${args.join(' ')}`);
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });
  if (result.status !== 0) {
    const code = result.status || 1;
    console.error(`✖ step failed: ${cmd} ${args.join(' ')} (exit ${code})`);
    process.exit(code);
  }
}

console.log('\n✅ check:cgei passed');
process.exit(0);
