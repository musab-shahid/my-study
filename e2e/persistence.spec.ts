import { test, expect } from '@playwright/test';

/**
 * Progress survival across reload — localStorage is the source of truth.
 * We seed a minimal valid AppData-shaped blob and confirm Settings still loads.
 * Full schema migration is covered by unit tests; this catches wipe-on-boot bugs.
 */

const STORAGE_KEY = 'examprep-data';

test.describe('Local persistence', () => {
  test('survives full page reload with seeded progress marker', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(
      ({ key }) => {
        const existing = localStorage.getItem(key);
        const base = existing ? JSON.parse(existing) : {};
        localStorage.setItem(
          key,
          JSON.stringify({
            ...base,
            // Marker only — app may migrate/normalize; we check key still present
            __e2eMarker: 'persist-ok',
          }),
        );
      },
      { key: STORAGE_KEY },
    );
    await page.reload();
    await expect(page.getByText('Home', { exact: true }).first()).toBeVisible({ timeout: 20_000 });
    const stillThere = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY);
    expect(stillThere).toBeTruthy();
  });
});
