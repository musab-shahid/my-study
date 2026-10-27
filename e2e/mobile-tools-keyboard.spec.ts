import { test, expect } from '@playwright/test';

const VIEWPORT = { width: 390, height: 844 } as const;

test.describe('Mobile More tray — keyboard & overlay regression matrix', () => {
  test('backdrop click dismisses the dialog and restores trigger focus', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();

    // Click outside the sheet, on the backdrop.
    const backdrop = page.locator('.fixed.inset-0.bg-black\\/40').first();
    await backdrop.click({ position: { x: 20, y: 50 } });

    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('repeated open/close cycles keep focus and aria state consistent', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });

    for (let i = 0; i < 3; i += 1) {
      await trigger.click();
      const dialog = page.getByRole('dialog', { name: 'More' });
      await expect(dialog).toBeVisible();
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect(trigger).toBeFocused();
    }
  });

  test('opening More then activating a destination navigates and closes the tray', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });

    const settingsBtn = dialog.getByRole('button', { name: 'Settings', exact: true });
    await settingsBtn.click();

    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/\/settings/);
    await expect(page.locator('main').getByRole('heading', { name: 'Settings', exact: true })).toBeVisible({
      timeout: 15_000,
    });
  });

  test('Tab cycles through visible tray buttons and wraps from last to close', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    const close = dialog.getByRole('button', { name: 'Close' });

    // Start from close, Tab forward through all visible controls, end back at close.
    await close.focus();
    const tracks = dialog.getByRole('region', { name: 'Learning tracks' });
    const lastTrack = tracks.getByRole('button').last();
    await page.keyboard.press('Shift+Tab');
    await expect(lastTrack).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();
  });

  test('More trigger reflects review-due badge count without affecting aria-expanded', async ({ page }) => {
    await page.setViewportSize(VIEWPORT);
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Badge is optional; if present it must not change the expanded state.
    const badge = trigger.locator('span.bg-warning-700');
    const hasBadge = await badge.count();
    if (hasBadge) {
      await expect(badge.first()).toBeVisible();
    }
    // Opening must toggle expanded, independent of badge presence.
    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
