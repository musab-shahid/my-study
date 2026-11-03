import test from 'node:test';
import assert from 'node:assert/strict';
import { allowedModerateCounts, findModerateIncreases } from '../lib/axe-moderate-baseline.mjs';

test('reads per-scenario allowances from the committed moderate envelope', () => {
  const baseline = {
    version: 1,
    moderate: {
      'learn@mobile-390x844': { 'color-contrast': 2 },
    },
  };

  assert.deepEqual(
    allowedModerateCounts(baseline, 'learn@mobile-390x844'),
    { 'color-contrast': 2 },
  );
});

test('treats an unlisted scenario as having no allowances', () => {
  assert.deepEqual(allowedModerateCounts({ version: 1, moderate: {} }, 'practice@desktop'), {});
});

test('rejects new and increased moderate violation counts but allows shrinkage', () => {
  assert.deepEqual(
    findModerateIncreases(
      { 'color-contrast': 3, 'link-name': 1 },
      { 'color-contrast': 2, 'target-size': 4 },
    ),
    [['color-contrast', 3], ['link-name', 1]],
  );
});
