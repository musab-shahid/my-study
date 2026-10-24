import { test, expect } from '@playwright/test';

test.describe('App shell & navigation', () => {
  test('loads home and shows primary navigation labels', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Home', { exact: true }).first()).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible();
  });

  test('opens Settings and exposes local backup export', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Settings', { exact: true }).first().click();
    await expect(page.getByText(/Download a JSON backup|Download backup|Export/i).first()).toBeVisible({
      timeout: 15_000,
    });
    const cloudHint = page.getByText(/No session token found|Sign in required|Cloud backup/i);
    if (await cloudHint.count()) {
      await expect(cloudHint.first()).toBeVisible();
    }
  });
});

test.describe('Mobile More sheet accessibility', () => {
  test('contains keyboard focus, closes on Escape, and restores trigger focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();

    const close = dialog.getByRole('button', { name: 'Close' });
    await expect(close).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await expect(dialog.getByRole('button', { name: 'HAT Prep', exact: true })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('ignores visibility-hidden and disabled-fieldset controls when wrapping focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    const close = dialog.getByRole('button', { name: 'Close' });
    const lastVisible = dialog.getByRole('button', { name: 'HAT Prep', exact: true });

    await dialog.evaluate((node) => {
      const hidden = document.createElement('button');
      hidden.type = 'button';
      hidden.textContent = 'Hidden trap regression control';
      hidden.style.visibility = 'hidden';
      node.append(hidden);

      const fieldset = document.createElement('fieldset');
      fieldset.disabled = true;
      const disabled = document.createElement('button');
      disabled.type = 'button';
      disabled.textContent = 'Disabled trap regression control';
      fieldset.append(disabled);
      node.append(fieldset);
    });

    await lastVisible.focus();
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();
  });
});

test.describe('Mobile More menu consistency', () => {
  test('contains secondary destinations without duplicating primary Learn and Practice tabs', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });

    await expect(dialog.getByRole('button', { name: 'Learn', exact: true })).toHaveCount(0);
    await expect(dialog.getByRole('button', { name: 'Practice', exact: true })).toHaveCount(0);
    await expect(dialog.getByRole('button', { name: 'Progress', exact: true })).toHaveCount(1);
    await expect(dialog.getByRole('region', { name: 'Study tools' })).toBeVisible();
    await expect(dialog.getByRole('region', { name: 'Tools', exact: true })).toBeVisible();
    await expect(dialog.getByRole('region', { name: 'Exam tracks' })).toBeVisible();
  });

  test('marks the current secondary destination and returns focus after closing', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await dialog.getByRole('button', { name: 'Review', exact: true }).click();
    await expect(dialog).toBeHidden();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: /Review/ })).toHaveAttribute('aria-current', 'page');
    await expect(dialog.getByRole('button', { name: /Review/ })).toHaveClass(/bg-brand-50/);
  });

  test('marks Mock Exam current without duplicating the primary Practice destination', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await dialog.getByRole('button', { name: 'Mock Exam', exact: true }).click();
    await expect(dialog).toBeHidden();

    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: /Mock Exam/ })).toHaveAttribute('aria-current', 'page');
    await expect(dialog.getByRole('button', { name: 'Practice', exact: true })).toHaveCount(0);
  });

  test('desktop sidebar exposes Flashcards and Cloud Atlas as global tools', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto('/');

    const sidebar = page.locator('aside').filter({ hasText: 'ExamPrep Hub' });
    await expect(sidebar.getByRole('button', { name: 'Flashcards', exact: true })).toBeVisible();
    await expect(sidebar.getByRole('button', { name: 'Cloud Atlas', exact: true })).toBeVisible();
  });
});
