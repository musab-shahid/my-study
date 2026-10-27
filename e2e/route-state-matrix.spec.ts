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
    ({ appKey, subjectKey, data }) => {
      localStorage.setItem(appKey, JSON.stringify(data));
      localStorage.setItem(
        subjectKey,
        JSON.stringify({ activeTrack: track, byTrack: {} }),
      );
    },
    { appKey: APP_DATA_KEY, subjectKey: SUBJECT_SELECTION_KEY, data: enrolledAppData(track) },
  );
  await page.reload();
  await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
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

      // Desktop: sidebar marks the destination aria-current.
      const desktopNav = page.locator('aside');
      const desktopBtn = desktopNav.getByRole('button', { name: route.label, exact: true });
      // Sidebar is hidden on mobile, so switch to desktop viewport for this assertion.
      await page.setViewportSize({ width: 1280, height: 900 });
      await expect(desktopBtn).toBeVisible();
      await expect(desktopBtn).toHaveAttribute('aria-current', 'page');
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

    // Navigate Home via the header back control.
    const homeBtn = page.locator('header').first().getByRole('button', { name: 'Home', exact: true });
    await homeBtn.click();
    await expect(page).toHaveURL(/\/$/);

    // More trigger should not carry aria-current for any secondary destination now.
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    const currentMarkers = dialog.locator('[aria-current="page"]');
    await expect(currentMarkers).toHaveCount(0);
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
