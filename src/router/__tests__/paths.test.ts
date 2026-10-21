import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { routeToPath, pathToRoute, shouldUseBrowserHistoryBack } from '../paths.ts';

describe('Phase A path mapping', () => {
  it('round-trips static screens', () => {
    const screens = [
      { screen: 'home' as const },
      { screen: 'learn' as const },
      { screen: 'formulas' as const },
      { screen: 'cloud-atlas' as const },
      { screen: 'review' as const },
      { screen: 'progress' as const },
      { screen: 'search' as const },
      { screen: 'settings' as const },
      { screen: 'hat' as const },
      { screen: 'fpsc' as const },
      { screen: 'practice' as const },
      { screen: 'practice' as const, mode: 'mock' as const },
    ];
    for (const route of screens) {
      const path = routeToPath(route);
      const parsed = pathToRoute(path);
      assert.equal(parsed.screen, route.screen, path);
      if ('mode' in route && route.mode) {
        assert.equal((parsed as { mode?: string }).mode, route.mode);
      }
    }
  });

  it('maps /quiz deep link to practice (no quiz params in URL)', () => {
    const parsed = pathToRoute('/quiz');
    assert.equal(parsed.screen, 'practice');
  });

  it('unknown paths fall back to home', () => {
    assert.equal(pathToRoute('/not-a-real-page').screen, 'home');
  });
});


describe('SPA history back policy', () => {
  it('uses browser history when SPA depth is positive', () => {
    assert.equal(shouldUseBrowserHistoryBack(1), true);
    assert.equal(shouldUseBrowserHistoryBack(3), true);
  });

  it('falls back to synthetic parent when depth is 0 (deep link)', () => {
    assert.equal(shouldUseBrowserHistoryBack(0), false);
  });
});
