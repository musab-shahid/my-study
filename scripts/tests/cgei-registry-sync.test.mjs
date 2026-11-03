import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const sync = readFileSync('scripts/cgei-sync.ts', 'utf8');
const idempotence = readFileSync('scripts/check-cgei-sync-idempotence.mjs', 'utf8');

test('cgei:sync refreshes the generated registry manifest', () => {
  assert.match(sync, /run\(\['run', 'snapshot:cgei-registry'\]\);/);
});

test('CGEI sync idempotence gate verifies the registry manifest after regeneration', () => {
  assert.match(idempotence, /npm',\s*\['run', 'check:cgei-registry'\]/);
});
