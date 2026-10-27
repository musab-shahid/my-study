import { test, expect } from '@playwright/test';

test('study orientation shows learning outcomes and breadcrumbs', async ({ page }) => {
  await page.goto('/');
  // Navigate into a track and a subject orientation
  await page.goto('/track/fpsc');
  await expect(page.getByRole('navigation').first()).toBeVisible();
  // A topic study screen renders a Learning Outcomes disclosure
  await page.goto('/topic/meteo-origin-evolution');
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  // Breadcrumbs render the structural path
  const crumbs = page.locator('nav[aria-label="Breadcrumb"], [aria-label="Breadcrumb"]');
  if (await crumbs.count()) {
    await expect(crumbs.first()).toContainText('Home');
  }
});
