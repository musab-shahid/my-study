import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_JS_GZIP_BUDGET_BYTES,
  LARGEST_JS_CHUNK_GZIP_BUDGET_BYTES,
  withinBundleBudgets,
} from '../lib/bundle-budget.mjs';

test('production gzip budgets are a tight ratchet over the measured baseline', () => {
  assert.equal(INITIAL_JS_GZIP_BUDGET_BYTES, 160 * 1024);
  assert.equal(LARGEST_JS_CHUNK_GZIP_BUDGET_BYTES, 195 * 1024);
  // Product target for initial JS after B1.
  assert.ok(INITIAL_JS_GZIP_BUDGET_BYTES <= 230 * 1024);
  assert.ok(INITIAL_JS_GZIP_BUDGET_BYTES <= 144.7 * 1024 * 1.12);
  assert.ok(LARGEST_JS_CHUNK_GZIP_BUDGET_BYTES <= 176.7 * 1024 * 1.12);
});

test('bundle budget helper fails above either measured ceiling', () => {
  assert.equal(withinBundleBudgets(160 * 1024, 195 * 1024), true);
  assert.equal(withinBundleBudgets(160 * 1024 + 1, 195 * 1024), false);
  assert.equal(withinBundleBudgets(160 * 1024, 195 * 1024 + 1), false);
});
