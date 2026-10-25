import { expect, test } from '@playwright/test';

test('mobile More control references its dialog and restores focus after Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  const more = page.getByRole('button', { name: /^More(?:,|$)/ });
  const dialog = page.locator('#mobile-tools-tray');

  await expect(more).toBeVisible();
  await expect(more).toHaveAttribute('aria-expanded', 'false');
  await expect(more).toHaveAttribute('aria-controls', 'mobile-tools-tray');
  await expect(dialog).toHaveCount(1);
  await expect(dialog).toBeHidden();

  await more.click();
  await expect(more).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('dialog', { name: 'More' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(more).toHaveAttribute('aria-expanded', 'false');
  await expect(more).toBeFocused();
});
