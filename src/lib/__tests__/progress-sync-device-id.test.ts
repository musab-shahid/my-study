import { afterEach, describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getDeviceId } from '../device-id.ts';

const originalLocalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');

afterEach(() => {
  if (originalLocalStorage) {
    Object.defineProperty(globalThis, 'localStorage', originalLocalStorage);
  } else {
    delete (globalThis as { localStorage?: Storage }).localStorage;
  }
});

describe('cloud sync device identity', () => {
  it('refuses to invent a shared device ID when storage is unavailable', () => {
    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      value: {
        getItem() { throw new Error('storage blocked'); },
        setItem() { throw new Error('storage blocked'); },
      },
    });

    assert.equal(getDeviceId(), null);
  });
});
