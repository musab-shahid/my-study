import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isLocalNewerThanCloud } from '../progress-sync.ts';

describe('isLocalNewerThanCloud', () => {
  it('returns false when either timestamp is missing', () => {
    assert.equal(isLocalNewerThanCloud(null, '2026-01-01T00:00:00.000Z'), false);
    assert.equal(isLocalNewerThanCloud('2026-01-01T00:00:00.000Z', null), false);
  });

  it('detects local newer than cloud', () => {
    assert.equal(
      isLocalNewerThanCloud('2026-06-02T12:00:00.000Z', '2026-06-01T12:00:00.000Z'),
      true,
    );
  });

  it('returns false when cloud is newer or equal', () => {
    assert.equal(
      isLocalNewerThanCloud('2026-06-01T12:00:00.000Z', '2026-06-02T12:00:00.000Z'),
      false,
    );
    assert.equal(
      isLocalNewerThanCloud('2026-06-01T12:00:00.000Z', '2026-06-01T12:00:00.000Z'),
      false,
    );
  });
});
