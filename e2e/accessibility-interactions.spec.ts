import { expect, test } from '@playwright/test';

test.describe('mobile tools dialog keyboard behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
  });

  test('Escape closes the tools dialog and restores focus to its trigger', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await expect(trigger).toBeVisible();
    await trigger.focus();
    await page.keyboard.press('Enter');

    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Study tools');
    await expect(dialog).toContainText('Search');
    await expect(dialog).toContainText('Settings');
    await expect(dialog).toContainText('More');

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('programmatic focus changes cannot escape the open dialog', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();

    // The primary navigation is outside the modal. Even an explicit focus()
    // call from another component must not leave focus behind the open sheet.
    await page.getByRole('button', { name: 'Home', exact: true }).focus();
    await expect.poll(async () =>
      dialog.evaluate((node) => node.contains(document.activeElement)),
    ).toBe(true);
  });

  test('Tab and Shift+Tab keep sequential focus inside the open dialog', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();

    // The tray's close button is the first focusable control. Shift+Tab should
    // wrap to the final focusable item rather than escaping to page navigation.
    await page.getByRole('button', { name: 'Close' }).focus();
    await page.keyboard.press('Shift+Tab');
    await expect.poll(async () => dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);

    // Move to the final item and verify forward Tab wraps to the first control.
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect.poll(async () => dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  });
});
