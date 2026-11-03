import { expect, test } from '@playwright/test';

test('announces local progress write failures and clears the warning after a successful save', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });

  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('my-study-storage-warning', {
      detail: { message: 'Could not save progress (browser storage may be full).' },
    }));
  });
  const warning = page.getByRole('alert').filter({ hasText: 'Could not save progress' });
  await expect(warning).toBeVisible();

  await page.evaluate(() => window.dispatchEvent(new Event('my-study-storage-saved')));
  await expect(warning).toHaveCount(0);
});
