import { test, expect } from '@playwright/test';

/**
 * Offline + lazy-route journeys.
 * Lazy content chunks are runtime-cached (not precached). Offline coverage is
 * the app shell (home) via service-worker cache. Playwright's context offline
 * mode blocks a fresh page.goto, so we reload a controlled document instead.
 */
test.describe('Offline journeys', () => {
  test('home shell remains available offline after warm visit', async ({ page, context }) => {
    test.setTimeout(120_000);
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });

    // Ensure a controlling service worker is active before cutting the network.
    await page.waitForFunction(
      () => Boolean(navigator.serviceWorker?.controller),
      undefined,
      { timeout: 30_000 },
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
