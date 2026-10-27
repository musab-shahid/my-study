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
        JSON.stringify({ activeTrack: track, byTrack: {} }),
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

  const secondaryRoutes: { path: string; label: string; urlFragment: RegExp }[] = [
    { path: '/search', label: 'Search', urlFragment: /\/search/ },
    { path: '/progress', label: 'Progress', urlFragment: /\/progress/ },
    { path: '/flashcards', label: 'Flashcards', urlFragment: /\/flashcards/ },
    { path: '/formulas', label: 'Formulas', urlFragment: /\/formulas/ },
    { path: '/review', label: 'Review', urlFragment: /\/review/ },
  ];

  for (const route of secondaryRoutes) {
    test(`direct load "${route.label}" marks it current on desktop and mobile`, async ({ page }) => {
      await page.setViewportSize(VIEWPORT);
      await seedWorkspace(page);

      await page.goto(route.path);
      await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });
      await expect(page).toHaveURL(route.urlFragment);

      // Desktop sidebar marks the destination aria-current (sidebar is md+).
      await page.setViewportSize({ width: 1280, height: 900 });
      const desktopNav = page.locator('aside');
      await expect(desktopNav).toBeVisible();
      const desktopBtn = desktopNav.getByRole('button', { name: route.label, exact: true });
      await expect(desktopBtn).toBeVisible();
      await expect(desktopBtn).toHaveAttribute('aria-current', 'page');

      // Mobile More: destinations that live only in the tray should also mark current.
      await page.setViewportSize(VIEWPORT);
      const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
      await trigger.click();
      const dialog = page.getByRole('dialog', { name: 'More' });
      await expect(dialog).toBeVisible();
      const moreBtn = dialog.getByRole('button', { name: route.label, exact: true });
      if (await moreBtn.count()) {
        await expect(moreBtn).toHaveAttribute('aria-current', 'page');
      }
      await page.keyboard.press('Escape');
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

  test('track landing route keeps the Tracks item active on mobile', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await seedWorkspace(page, 'fpsc');

    await page.goto('/track/fpsc');
    await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });

    const bar = page.getByRole('navigation', { name: 'Primary' });
    const tracksBtn = bar.getByRole('button', { name: 'Tracks', exact: true });
    await expect(tracksBtn).toHaveAttribute('aria-current', 'page');
  });

  test('quiz route lands on Practice (not a bare quiz shell)', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await seedWorkspace(page);

    await page.goto('/quiz');
    await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });
    // The quiz route should resolve to practice, showing practice affordances.
    await expect(page.getByText(/Practice|Begin|Quick|Mock|locked|enroll/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });
});
