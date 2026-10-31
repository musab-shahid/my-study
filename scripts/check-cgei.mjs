#!/usr/bin/env node
/**
 * Unified CGEI gate — local and CI must call the same script so they cannot drift.
 *
 * Includes data validation, question quality, source evidence, permanent question
 * IDs, and the generated curriculum navigation index.
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const steps = [
  ['npm', ['run', 'check:cgei-sync']],
  ['npm', ['run', 'report:cgei-unit', '--', '--unit', 'cgei-cl-unit-2-4', '--check-structure']],
  ['npm', ['run', 'check:cgei-readiness-transitions']],
  ['npm', ['run', 'validate:data']],
  ['npm', ['run', 'audit:core-leaf-evidence']],
  ['npm', ['run', 'check:cgei-question-ids']],
  ['npm', ['run', 'check:cgei-index']],
];

for (const [cmd, args] of steps) {
  console.log('\n▶ check:cgei — ' + cmd + ' ' + args.join(' '));
  const result = spawnSync(cmd, args, {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: process.env,
  });
  if (result.status !== 0) {
    const code = result.status || 1;
    console.error('✖ step failed: ' + cmd + ' ' + args.join(' ') + ' (exit ' + code + ')');
    process.exit(code);
  }
}

console.log('\n✅ check:cgei passed');
