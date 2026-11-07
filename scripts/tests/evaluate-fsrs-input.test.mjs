import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeReviewEventsInput } from '../lib/review-events-input.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

test('accepts raw event arrays', () => {
  const events = normalizeReviewEventsInput([{ id: '1' }]);
  assert.equal(events.length, 1);
});

test('accepts Settings review-log export schema', () => {
  const exportPayload = JSON.parse(
    readFileSync(resolve(root, 'fixtures/sample-review-log-export.json'), 'utf8'),
  );
  const events = normalizeReviewEventsInput(exportPayload);
  assert.equal(events.length, 3);
  assert.equal(events[0].id, 'e1');
});

test('rejects unknown shapes', () => {
  assert.throws(() => normalizeReviewEventsInput({ schemaVersion: 1 }), /events array/);
});
