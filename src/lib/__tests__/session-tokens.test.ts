import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  getAccessToken,
  getRefreshToken,
  setSessionTokens,
  setAccessToken,
} from '../session-tokens.ts';

const mem = new Map<string, string>();

beforeEach(() => {
  mem.clear();
  (globalThis as unknown as { localStorage: Storage }).localStorage = {
    getItem: (k: string) => mem.get(k) ?? null,
    setItem: (k: string, v: string) => {
      mem.set(k, v);
    },
    removeItem: (k: string) => {
      mem.delete(k);
    },
    clear: () => mem.clear(),
    key: () => null,
    length: 0,
  };
});

describe('session-tokens', () => {
  it('stores access and refresh together', () => {
    setSessionTokens({ accessToken: 'a1', refreshToken: 'r1' });
    assert.equal(getAccessToken(), 'a1');
    assert.equal(getRefreshToken(), 'r1');
  });

  it('clears both on null session', () => {
    setSessionTokens({ accessToken: 'a1', refreshToken: 'r1' });
    setSessionTokens(null);
    assert.equal(getAccessToken(), null);
    assert.equal(getRefreshToken(), null);
  });

  it('can update access alone without wiping refresh when using setAccessToken', () => {
    setSessionTokens({ accessToken: 'a1', refreshToken: 'r1' });
    setAccessToken('a2');
    assert.equal(getAccessToken(), 'a2');
    assert.equal(getRefreshToken(), 'r1');
  });
});
