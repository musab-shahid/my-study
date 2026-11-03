#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { findUnaccountedScripts } from './lib/gate-script-coverage.mjs';

const root = process.cwd();
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const workflow = readFileSync(join(root, '.github/workflows/ci.yml'), 'utf8');
const checkCgei = readFileSync(join(root, 'scripts/check-cgei.mjs'), 'utf8');
const allowlist = JSON.parse(readFileSync(join(root, 'scripts/ci-gate-allowlist.json'), 'utf8'));

if (!workflow.includes('node scripts/check-ci-gate-coverage.mjs')) {
  console.error('CI workflow does not run the gate-coverage guard.');
  process.exit(1);
}

const violations = findUnaccountedScripts({
  scripts: packageJson.scripts ?? {},
  workflow,
  checkCgei,
  allowlist,
});

if (violations.length) {
  console.error('CI gate-script coverage drift detected:');
  for (const violation of violations) console.error('- ' + violation);
  process.exit(1);
}

const count = Object.keys(packageJson.scripts ?? {}).filter((name) =>
  /^(?:check(?::.*)?|audit:.*|lint:.*|validate:.*)$/.test(name)).length;
console.log('CI gate-script coverage passed (' + count + ' scripts accounted for).');
