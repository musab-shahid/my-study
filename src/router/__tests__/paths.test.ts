import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { routeToPath, pathToRoute, breadcrumbForRoute, shouldUseBrowserHistoryBack } from '../paths.ts';

describe('Phase A path mapping', () => {
  it('round-trips static screens', () => {
    const screens = [
      { screen: 'home' as const },
      { screen: 'learn' as const },
      { screen: 'learn' as const, subjectId: 'meteo-climatology' },
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

  it('round-trips a selected subject in the learning URL', () => {
    const path = routeToPath({ screen: 'learn', subjectId: 'meteo-climatology' });
    assert.equal(path, '/learn/meteo-climatology');
    assert.deepEqual(pathToRoute(path), { screen: 'learn', subjectId: 'meteo-climatology' });
  });

  it('builds section breadcrumbs with track and subject context', () => {
    const crumbs = breadcrumbForRoute({ screen: 'section', sectionId: 'METEO-01' });
    assert.deepEqual(crumbs.map((crumb) => crumb.label), [
      'Home',
      'FPSC',
      'Meteorology & Climatology',
      'Atmosphere & Climate Foundations',
    ]);
    assert.deepEqual(crumbs[2].route, { screen: 'learn', subjectId: 'meteo-climatology' });
  });

  it('builds topic breadcrumbs through its subject and section', () => {
    const crumbs = breadcrumbForRoute({ screen: 'topic', topicId: 'meteo-origin-evolution' });
    assert.equal(crumbs[0].label, 'Home');
    assert.equal(crumbs[1].label, 'FPSC');
    assert.equal(crumbs[2].label, 'Meteorology & Climatology');
    assert.equal(crumbs[crumbs.length - 2].label, 'Atmosphere & Climate Foundations');
  });

  it('uses the real track title in track breadcrumbs', () => {
    const crumbs = breadcrumbForRoute({ screen: 'track', trackId: 'fpsc' });
    assert.deepEqual(crumbs.map((crumb) => crumb.label), ['Home', 'FPSC']);
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
