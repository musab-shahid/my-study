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
  const install = banner.getByRole('button', { name: 'Install' });
  const notNow = banner.getByRole('button', { name: 'Not now' });
  const dismiss = banner.getByRole('button', { name: 'Dismiss' });
  await expect(install).toBeVisible();
  await expect(notNow).toBeVisible();
  await expect(dismiss).toBeVisible();

  for (const action of [install, notNow, dismiss]) {
    const height = await action.evaluate((element) => element.getBoundingClientRect().height);
    expect(height, `${await action.getAttribute('aria-label') ?? await action.textContent()} should have a comfortable touch target`).toBeGreaterThanOrEqual(44);
  }

  let focused = false;
  for (let i = 0; i < 120; i += 1) {
    await page.keyboard.press('Tab');
    if (await notNow.evaluate((element) => element === document.activeElement)) {
      focused = true;
      break;
    }
  }
  expect(focused, 'Not now should be reachable by keyboard').toBe(true);
  const boxShadow = await notNow.evaluate((element) => getComputedStyle(element).boxShadow);
  expect(boxShadow, 'keyboard focus should render a visible ring').not.toBe('none');

  await notNow.click();
  await expect(announcement).toHaveCount(0);
});
