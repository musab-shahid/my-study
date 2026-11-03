import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sync = readFileSync('scripts/cgei-sync.ts', 'utf8');
const idempotence = readFileSync('scripts/check-cgei-sync-idempotence.mjs', 'utf8');
const checkCgei = readFileSync('scripts/check-cgei.mjs', 'utf8');

test('cgei:sync refreshes the generated registry manifest', () => {
  assert.match(sync, /run\(\['run', 'snapshot:cgei-registry'\]\);/);
});

test('CGEI sync idempotence gate verifies the registry manifest after regeneration', () => {
  assert.match(idempotence, /npm',\s*\['run', 'check:cgei-registry'\]/);
});

test('fresh-checkout registry validation runs before sync can rewrite the manifest', () => {
  const registryCheck = checkCgei.indexOf("['npm', ['run', 'check:cgei-registry']]");
  const sync = checkCgei.indexOf("['npm', ['run', 'check:cgei-sync']]");
  assert.ok(registryCheck >= 0, 'unified CGEI gate must include the registry check');
  assert.ok(sync >= 0, 'unified CGEI gate must include the sync idempotence check');
  assert.ok(registryCheck < sync, 'the committed manifest must be validated before sync can regenerate it');
});
