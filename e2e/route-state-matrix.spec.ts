import { test, expect } from '@playwright/test';

const VIEWPORT = { width: 390, height: 844 } as const;
const APP_DATA_KEY = 'examprep-data';
const SUBJECT_SELECTION_KEY = 'examprep-subject-selection';

function enrolledAppData(track: 'fpsc' | 'hat' = 'fpsc') {
  const now = new Date().toISOString();
  return {
    studiedTopics: [],
    topicProgress: {},
    questionResults: {},
    quizHistory: [],
    revisionDates: {},
    lastOpenedTopic: '',
    trackMembership: {
      schemaVersion: 1,
      enrollments: {
        [track]: { enrolledAt: now, source: 'explicit', lastOpenedAt: now, activeExamId: null },
      },
      activeTrackId: track,
    },
  };
}

async function seedWorkspace(
  page: import('@playwright/test').Page,
  track: 'fpsc' | 'hat' = 'fpsc',
) {
  await page.goto('/');
  await page.evaluate(
    ({ appKey, subjectKey, data, track }) => {
      localStorage.setItem(appKey, JSON.stringify(data));
      localStorage.setItem(
        subjectKey,
        JSON.stringify({
          activeTrack: track,
          byTrack: {
            [track]: {
              perScreen: {
                progress: 'all',
                formulas: 'all',
                review: 'all',
                learn: 'all',
                practice: 'all',
                search: 'all',
              },
              lastSelected: 'meteo-climatology',
              prefersAll: true,
            },
          },
        }),
      );
    },
    {
      appKey: APP_DATA_KEY,
      subjectKey: SUBJECT_SELECTION_KEY,
      data: enrolledAppData(track),
      track,
    },
  );
  await page.reload();
  await expect(page.locator('main')).toBeVisible({ timeout: 30_000 });
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
}


test.describe('Route-state matrix — desktop sidebar & mobile nav', () => {
  test.describe.configure({ mode: 'serial' });

  /** Top-level desktop sidebar utilities with aria-current wiring. */
  const sidebarUtilities: { path: string; label: string; urlFragment: RegExp }[] = [
    { path: '/progress', label: 'Progress', urlFragment: /\/progress/ },
  ];
  /** Stage routes that load but are not always a top-level named sidebar button. */
  const stageRoutes: { path: string; urlFragment: RegExp }[] = [
    { path: '/formulas', urlFragment: /\/formulas/ },
    { path: '/review', urlFragment: /\/review/ },
  ];

  for (const route of sidebarUtilities) {
    test(`direct load "${route.label}" marks it current on desktop sidebar`, async ({ page }) => {
      await page.setViewportSize(VIEWPORT);
      await seedWorkspace(page);

      await page.goto(route.path);
      await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });
      await expect(page).toHaveURL(route.urlFragment);

      await page.setViewportSize({ width: 1280, height: 900 });
      const desktopNav = page.locator('aside');
      await expect(desktopNav).toBeVisible();
      if (route.label === 'Progress') {
        const desktopBtn = desktopNav.getByRole('button', { name: route.label, exact: true });
        await expect(desktopBtn).toBeVisible();
        await expect(desktopBtn).toHaveAttribute('aria-current', 'page');
      }
    });
  }

  for (const route of [
    { path: '/search', label: 'Search' },
    { path: '/flashcards', label: 'Flashcards' },
    { path: '/formulas', label: 'Formulas' },
  ]) {
    test(`desktop More tray exposes ${route.label}`, async ({ page }) => {
      await page.setViewportSize(VIEWPORT);
      await seedWorkspace(page);
      await page.goto(route.path);
      await page.setViewportSize({ width: 1280, height: 900 });
      const aside = page.locator('aside');
      await aside.getByRole('button', { name: 'More', exact: true }).click();
      const dialog = page.getByRole('dialog', { name: 'More' });
      await expect(dialog.getByRole('button', { name: route.label, exact: true })).toBeVisible();
      await expect(dialog.getByRole('button', { name: route.label, exact: true })).toHaveAttribute('aria-current', 'page');
    });
  }

  for (const route of stageRoutes) {
    test(`direct load ${route.path} resolves main content`, async ({ page }) => {
      await page.setViewportSize(VIEWPORT);
      await seedWorkspace(page);
      await page.goto(route.path);
      await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });
      await expect(page).toHaveURL(route.urlFragment);
    });
  }

  test('Mock Exam is current on direct load, not the bare Practice tab', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await seedWorkspace(page);

    await page.goto('/practice/mock');
    await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });

    // On mobile: open More, confirm Mock Exam is marked current.
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog.getByRole('button', { name: /Mock Exam/ })).toHaveAttribute('aria-current', 'page');
  });

  test('bare Practice route loads without Mock Exam being marked current', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await seedWorkspace(page);

    await page.goto('/practice');
    await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    const mockBtn = dialog.getByRole('button', { name: /Mock Exam/ });
    await expect(mockBtn).not.toHaveAttribute('aria-current', 'page');
  });

  test('returning Home from a secondary route restores Home as current', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await seedWorkspace(page);

    await page.goto('/settings');
    await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });

    // Navigate Home via primary bottom nav.
    const bar = page.getByRole('navigation', { name: 'Primary' });
    await bar.getByRole('button', { name: 'Home', exact: true }).click();
    await expect(page).toHaveURL(/\/?$/);

    const homeBtn = bar.getByRole('button', { name: 'Home', exact: true });
    await expect(homeBtn).toHaveAttribute('aria-current', 'page');

    // More secondary destinations should not stay current after leaving them.
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog.getByRole('button', { name: 'Search', exact: true })).not.toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  test('track landing remains reachable from More on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await seedWorkspace(page, 'fpsc');

    await page.goto('/track/fpsc');
    await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog.getByRole('button', { name: /FPSC/ })).toHaveAttribute('aria-current', 'page');
  });

  test('desktop sidebar inactive labels meet WCAG AA contrast', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await seedWorkspace(page);
    await page.setViewportSize({ width: 1280, height: 900 });
    const ratio = await page.locator('aside').getByRole('button', { name: 'Learn', exact: true }).evaluate((el) => {
      const parse = (value: string) => value.match(/[\d.]+/g)?.map(Number) ?? [];
      const foreground = parse(getComputedStyle(el).color);
      const background = parse(getComputedStyle(el.closest('aside')!).backgroundColor);
      const alpha = foreground[3] ?? 1;
      const bg = background.slice(0, 3).map((v) => v / 255);
      const fg = foreground.slice(0, 3).map((v, i) => (v * alpha + background[i] * (1 - alpha)) / 255);
      const linear = (v: number) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      const luminance = (rgb: number[]) => 0.2126 * linear(rgb[0]) + 0.7152 * linear(rgb[1]) + 0.0722 * linear(rgb[2]);
      const foregroundLuminance = luminance(fg);
      const backgroundLuminance = luminance(bg);
      return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
    });
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });

  test('mobile primary navigation exposes the five task destinations once', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await seedWorkspace(page);
    const bar = page.getByRole('navigation', { name: 'Primary' });
    for (const label of ['Home', 'Learn', 'Practice', 'Revision queue', 'Progress']) {
      await expect(bar.getByRole('button', { name: label, exact: true })).toHaveCount(1);
    }
    await expect(bar.getByRole('button', { name: 'Tracks', exact: true })).toHaveCount(0);
  });

  test('quiz route resolves without crashing', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await seedWorkspace(page);

    await page.goto('/quiz');
    await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });
    // App should keep chrome usable after quiz entry.
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();
  });
});
