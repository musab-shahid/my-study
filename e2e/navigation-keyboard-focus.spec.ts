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
