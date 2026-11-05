import { test, expect } from '@playwright/test';

/**
 * Offline + lazy-route journeys.
 * The service worker does not skipWaiting on install — it only controls pages
 * after a subsequent navigation. Offline coverage uses that claimed controller
 * and reloads (Playwright offline mode blocks a fresh page.goto).
 */
test.describe('Offline journeys', () => {
  test('home shell remains available offline after warm visit', async ({ page, context }) => {
    test.setTimeout(120_000);

    // First load registers the SW; a second navigation lets it claim the client.
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });

    await page.waitForFunction(
      () => Boolean(navigator.serviceWorker?.controller),
      undefined,
      { timeout: 15_000 },
    );

    await context.setOffline(true);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });
    await context.setOffline(false);
  });

  test('lazy settings route loads online under Suspense', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/settings', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });
    await expect(
      page.locator('main').getByRole('heading', { name: 'Settings', exact: true }),
    ).toBeVisible({ timeout: 20_000 });
  });

  test('simulated service worker update signal does not trap the shell', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });

    await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return;
      const reg = await navigator.serviceWorker.getRegistration();
      if (!reg) return;
      reg.dispatchEvent(new Event('updatefound'));
    });

    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });
  });
});
