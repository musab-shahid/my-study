import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { claimInstallPrompt } from '../install-prompt.ts';

describe('install prompt ownership', () => {
  it('allows one component to claim a browser prompt event only once', () => {
    const promptEvent = new Event('beforeinstallprompt');
    assert.equal(claimInstallPrompt(promptEvent), true);
    assert.equal(claimInstallPrompt(promptEvent), false);
  });

  it('allows a distinct prompt event to be claimed', () => {
    assert.equal(claimInstallPrompt(new Event('beforeinstallprompt')), true);
    assert.equal(claimInstallPrompt(new Event('beforeinstallprompt')), true);
  });
});
