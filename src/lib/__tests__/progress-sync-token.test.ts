import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isAccessTokenExpired } from '../progress-sync.ts';

function fakeJwt(payload: Record<string, unknown>): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `hdr.${body}.sig`;
}

describe('isAccessTokenExpired', () => {
  it('returns false when exp is in the future', () => {
    const token = fakeJwt({ sub: 'u1', exp: Math.floor(Date.now() / 1000) + 3600 });
    assert.equal(isAccessTokenExpired(token), false);
  });

  it('returns true when exp is in the past', () => {
    const token = fakeJwt({ sub: 'u1', exp: Math.floor(Date.now() / 1000) - 120 });
    assert.equal(isAccessTokenExpired(token), true);
  });

  it('returns false when exp claim is missing', () => {
    const token = fakeJwt({ sub: 'u1' });
    assert.equal(isAccessTokenExpired(token), false);
  });
});
