import { expect, test } from '@playwright/test';

test('desktop sidebar navigation exposes a visible keyboard focus indicator', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  await expect(page.locator('main')).toBeVisible();

  const settingsButton = page.locator('aside').getByRole('button', { name: 'Settings', exact: true });
  await expect(settingsButton).toBeVisible();

  let focused = false;
  for (let i = 0; i < 100; i += 1) {
    await page.keyboard.press('Tab');
    if (await settingsButton.evaluate((element) => element === document.activeElement)) {
      focused = true;
      break;
    }
  }

  expect(focused, 'Settings should be reachable by keyboard Tab navigation').toBe(true);
  await expect(settingsButton).toBeFocused();

  const boxShadow = await settingsButton.evaluate((element) => getComputedStyle(element).boxShadow);
  expect(boxShadow, 'keyboard focus should have a visible ring').not.toBe('none');
});

test('mobile primary navigation has keyboard focus and touch-sized controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('main')).toBeVisible();

  const moreButton = page.getByRole('button', { name: /^More(?:,|$)/ });
  await expect(moreButton).toBeVisible();

  let focused = false;
  for (let i = 0; i < 100; i += 1) {
    await page.keyboard.press('Tab');
    if (await moreButton.evaluate((element) => element === document.activeElement)) {
      focused = true;
      break;
    }
  }

  expect(focused, 'More should be reachable by keyboard Tab navigation').toBe(true);
  await expect(moreButton).toBeFocused();

  const metrics = await moreButton.evaluate((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return { boxShadow: style.boxShadow, width: rect.width, height: rect.height };
  });
  expect(metrics.boxShadow, 'mobile keyboard focus should have a visible ring').not.toBe('none');
  expect(metrics.width, 'mobile navigation target should be at least 48px wide').toBeGreaterThanOrEqual(48);
  expect(metrics.height, 'mobile navigation target should be at least 44px high').toBeGreaterThanOrEqual(44);
});
