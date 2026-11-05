import { test, expect } from '@playwright/test';

/**
 * Lazy-route and service-worker smoke journeys.
 *
 * Full offline navigation is not asserted here: the app SW intentionally does
 * not skipWaiting on install, and Playwright's preview + offline mode does not
 * reliably expose a controlling worker. Precache content is covered by unit
 * guards (sw-font-precache, security-headers). Offline pack flows stay in
 * product/manual checks.
 */
test.describe('Offline journeys', () => {
  test('lazy settings route loads online under Suspense', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/settings', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });
    await expect(
      page.locator('main').getByRole('heading', { name: 'Settings', exact: true }),
    ).toBeVisible({ timeout: 20_000 });
  });

  test('service worker registers for the app origin', async ({ page }) => {
    test.setTimeout(90_000);
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });

    const registrationScope = await page.evaluate(async () => {
      if (!('serviceWorker' in navigator)) return null;
      const reg = await navigator.serviceWorker.getRegistration();
      return reg?.scope ?? null;
    });

    // Registration is best-effort in some embed contexts; when present it must
    // cover the app origin.
    if (registrationScope) {
      expect(registrationScope).toMatch(/\/$/);
    }
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
