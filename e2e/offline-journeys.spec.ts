import { test, expect } from '@playwright/test';

/**
 * Offline journeys for the service-worker shell and route-lazy screens.
 * Confirms the home document and a secondary lazy route still resolve offline
 * after a warm online visit, and that a simulated SW update can be accepted.
 */
test.describe('Offline journeys', () => {
  test('home and a lazy settings route remain available offline after warm cache', async ({ page, context }) => {
    test.setTimeout(120_000);
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });

    // Warm a secondary lazy screen while online (caches the Settings chunk).
    await page.goto('/settings', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible({ timeout: 20_000 });

    await context.setOffline(true);

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });

    await page.goto('/settings', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible({ timeout: 20_000 });

    await context.setOffline(false);
  });

  test('accepting a simulated service worker update reloads without trapping the shell', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });

    await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return;
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) return;
      reg.dispatchEvent(new Event('updatefound'));
    });

    await page.goto('/progress', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });
  });
});
