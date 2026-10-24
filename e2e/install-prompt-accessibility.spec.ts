import { expect, test } from '@playwright/test';

test('install prompt announces guidance while keeping actions separately navigable', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main')).toBeVisible();

  // Allow React effects to attach the beforeinstallprompt listener before
  // simulating the browser event.
  await page.evaluate(() => new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  }));

  await page.evaluate(() => {
    const event = new Event('beforeinstallprompt', { cancelable: true }) as Event & {
      prompt: () => Promise<void>;
      userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
    };
    event.prompt = async () => {};
    event.userChoice = Promise.resolve({ outcome: 'dismissed' });
    window.dispatchEvent(event);
  });

  const banner = page.getByRole('region', { name: 'Install App' });
  await expect(banner).toBeVisible();
  const announcement = banner.locator('[role="status"][aria-live="polite"][aria-atomic="true"]');
  await expect(announcement).toBeVisible();
  await expect(announcement.getByRole('button')).toHaveCount(0);
  await expect(banner.getByRole('button', { name: 'Install' })).toBeVisible();
  await expect(banner.getByRole('button', { name: 'Not now' })).toBeVisible();

  await banner.getByRole('button', { name: 'Not now' }).click();
  await expect(announcement).toHaveCount(0);
});
