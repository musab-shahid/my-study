import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { findUnaccountedScripts } from '../lib/gate-script-coverage.mjs';

const allowlist = {
  check: 'CI expands the aggregate into explicit named steps.',
};

test('accounts for every check, audit, lint, and validate script', () => {
  const scripts = {
    check: 'npm run check:a && npm run validate:data',
    'check:a': 'node scripts/a.mjs',
    'audit:a': 'node scripts/audit-a.mjs',
    'lint:a': 'node scripts/lint-a.mjs',
    'validate:data': 'npm run audit:a',
    'validate:orphan': 'node scripts/orphan.mjs',
  };
  const workflow = 'npm run check:a';
  const checkCgei = "['npm', ['run', 'validate:data']]";
  const result = findUnaccountedScripts({ scripts, workflow, checkCgei, allowlist });
  assert.deepEqual(result, ['lint:a', 'validate:orphan']);
});

test('recognizes recursive npm-script delegation', () => {
  const scripts = {
    'check:root': 'npm run check:child',
    'check:child': 'npm run audit:child',
    'audit:child': 'node scripts/audit-child.mjs',
  };
  const result = findUnaccountedScripts({
    scripts,
    workflow: 'npm run check:root',
    checkCgei: '',
    allowlist: {},
  });
  assert.deepEqual(result, []);
});

test('an unreferenced check script is reported even when other categories are covered', () => {
  const scripts = {
    'check:present': 'node scripts/present.mjs',
    'check:orphan': 'node scripts/orphan.mjs',
  };
  const result = findUnaccountedScripts({
    scripts,
    workflow: 'npm run check:present',
    checkCgei: '',
    allowlist: {},
  });
  assert.deepEqual(result, ['check:orphan']);
});

test('allowlist entries require a non-empty one-line reason and stale entries fail', () => {
  const scripts = { 'audit:present': 'node scripts/audit.mjs' };
  assert.deepEqual(
    findUnaccountedScripts({
      scripts,
      workflow: '',
      checkCgei: '',
      allowlist: { 'audit:present': '  ' },
    }),
    ['audit:present (allowlist reason must be one non-empty line)'],
  );
  assert.deepEqual(
    findUnaccountedScripts({
      scripts,
      workflow: '',
      checkCgei: '',
      allowlist: { 'check:removed': 'obsolete exception' },
    }),
    ['audit:present', 'check:removed (stale allowlist entry)'],
  );
});

test('the real package gate scripts are all reachable from CI/CGEI or reasoned allowlist', () => {
  const root = resolve(import.meta.dirname, '../..');
  const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
  const workflow = readFileSync(resolve(root, '.github/workflows/ci.yml'), 'utf8');
  const checkCgei = readFileSync(resolve(root, 'scripts/check-cgei.mjs'), 'utf8');
  const reasons = JSON.parse(readFileSync(resolve(root, 'scripts/ci-gate-allowlist.json'), 'utf8'));
  assert.deepEqual(
    findUnaccountedScripts({
      scripts: packageJson.scripts ?? {},
      workflow,
      checkCgei,
      allowlist: reasons,
    }),
    [],
  );
});
