import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { routeToPath, pathToRoute, breadcrumbForRoute, shouldUseBrowserHistoryBack } from '../paths.ts';

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

  it('round-trips subject-aware Learn routes and rejects unknown subjects', () => {
    const route = { screen: 'learn' as const, subjectId: 'cgei-data-science' };
    assert.equal(routeToPath(route), '/learn/cgei-data-science');
    assert.deepEqual(pathToRoute('/learn/cgei-data-science'), route);
    assert.deepEqual(pathToRoute('/learn/not-a-real-subject'), { screen: 'learn' });
    assert.deepEqual(pathToRoute('/learn'), { screen: 'learn' });
  });

  it('builds structural CGEI breadcrumbs through the subject overview', () => {
    const unit = breadcrumbForRoute({ screen: 'curriculum-unit', unitId: 'cgei-ds-unit-5-3' });
    assert.deepEqual(unit.map((item) => item.label), [
      'Home',
      'CGEI',
      'Scientific Computing & Data Science',
      unit[3].label,
    ]);
    const lesson = breadcrumbForRoute({ screen: 'curriculum-lesson', lessonId: 'cgei-ds-lesson-5-3-1' });
    assert.deepEqual(lesson.map((item) => item.label), [
      'Home',
      'CGEI',
      'Scientific Computing & Data Science',
      'Exploratory data analysis and visualisation',
      lesson[4].label,
    ]);
  });

  it('builds track and subject breadcrumbs for a subject deep link', () => {
    const crumbs = breadcrumbForRoute({ screen: 'learn', subjectId: 'cgei-data-science' });
    assert.deepEqual(crumbs.map((item) => item.label), [
      'Home',
      'CGEI',
      'Scientific Computing & Data Science',
    ]);
    assert.deepEqual(crumbs[2].route, { screen: 'learn', subjectId: 'cgei-data-science' });
  });

  it('round-trips canonical curriculum unit and lesson routes', () => {
    const unitRoute = { screen: 'curriculum-unit' as const, unitId: 'cgei-ds-unit-5-3' };
    const lessonRoute = { screen: 'curriculum-lesson' as const, lessonId: 'cgei-ds-lesson-5-3-1' };
    assert.deepEqual(pathToRoute(routeToPath(unitRoute)), unitRoute);
    assert.deepEqual(pathToRoute(routeToPath(lessonRoute)), lessonRoute);
  });

  it('resolves only registered curriculum unit and lesson IDs', () => {
    assert.equal(pathToRoute('/curriculum/unit/not-real').screen, 'learn');
    assert.equal(pathToRoute('/curriculum/lesson/not-real').screen, 'learn');
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
