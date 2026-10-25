import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { routeToPath, pathToRoute, breadcrumbForRoute, shouldUseBrowserHistoryBack, isAppPath } from '../paths.ts';

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


  it('covers canonical route families, optional segments, and registered track IDs', () => {
    const cases = [
      ['/', { screen: 'home' }],
      ['/learn', { screen: 'learn' }],
      ['/formulas', { screen: 'formulas' }],
      ['/flashcards', { screen: 'flashcards' }],
      ['/flashcards/meteo-origin-evolution', { screen: 'flashcards', topicId: 'meteo-origin-evolution' }],
      ['/cloud-atlas', { screen: 'cloud-atlas' }],
      ['/practice/topic', { screen: 'practice', mode: 'topic' }],
      ['/practice/quick', { screen: 'practice', mode: 'quick' }],
      ['/practice/mock', { screen: 'practice', mode: 'mock' }],
      ['/review', { screen: 'review' }],
      ['/progress', { screen: 'progress' }],
      ['/search', { screen: 'search' }],
      ['/settings', { screen: 'settings' }],
      ['/hat', { screen: 'hat' }],
      ['/fpsc', { screen: 'fpsc' }],
      ['/track/fpsc', { screen: 'track', trackId: 'fpsc' }],
      ['/track/hat', { screen: 'track', trackId: 'hat' }],
      ['/track/cgei', { screen: 'track', trackId: 'cgei' }],
    ] as const;

    for (const [path, expected] of cases) {
      assert.deepEqual(pathToRoute(path), expected, path);
      assert.equal(isAppPath(path), true, path);
    }
  });

  it('treats invalid parameterized paths as fallbacks rather than valid deep links', () => {
    assert.deepEqual(pathToRoute('/track/not-a-track'), { screen: 'home' });
    assert.equal(isAppPath('/track/not-a-track'), false);
    assert.deepEqual(pathToRoute('/curriculum/unit/not-real'), { screen: 'learn' });
    assert.equal(isAppPath('/curriculum/unit/not-real'), false);
    assert.deepEqual(pathToRoute('/section/not-real'), { screen: 'learn' });
    assert.equal(isAppPath('/section/not-real'), false);
  });

  it('falls back safely for malformed percent-encoded route segments', () => {
    for (const path of [
      '/learn/%E0%A4%A',
      '/section/%',
      '/topic/%E0%A4%A',
      '/flashcards/%',
      '/curriculum/unit/%E0%A4%A',
      '/curriculum/lesson/%',
    ]) {
      assert.doesNotThrow(() => pathToRoute(path), path);
      assert.deepEqual(pathToRoute(path), { screen: 'home' }, path);
    }
  });

  it('keeps quiz deep links intentionally routed to practice', () => {
    assert.deepEqual(pathToRoute('/quiz'), { screen: 'practice' });
  });

  it('round-trips subject-aware Learn routes and rejects unknown subjects', () => {
    const route = { screen: 'learn' as const, subjectId: 'cgei-data-science' };
    assert.equal(routeToPath(route), '/learn/cgei-data-science');
    assert.deepEqual(pathToRoute('/learn/cgei-data-science'), route);
    assert.deepEqual(pathToRoute('/learn/not-a-real-subject'), { screen: 'learn' });
    assert.deepEqual(pathToRoute('/learn'), { screen: 'learn' });
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
    assert.deepEqual(crumbs.map((crumb) => crumb.label), ['Home', 'Exam Prep']);
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

  it('routes legacy CGEI roadmap URLs to the subject orientation', () => {
    assert.deepEqual(pathToRoute('/topic/cgei-env-systems-roadmap'), {
      screen: 'learn',
      subjectId: 'cgei-env-systems',
    });
    assert.deepEqual(pathToRoute('/topic/cgei-capstone-roadmap'), {
      screen: 'learn',
      subjectId: 'cgei-capstone',
    });
  });

  it('routes roadmap-only CGEI sections to the subject orientation', () => {
    assert.deepEqual(pathToRoute('/section/CGEI-01'), {
      screen: 'learn',
      subjectId: 'cgei-env-systems',
    });
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
