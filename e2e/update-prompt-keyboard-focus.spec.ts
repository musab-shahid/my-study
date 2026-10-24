import { expect, test } from '@playwright/test';

test('update prompt Restart action is keyboard-visible and meets touch target height', async ({ page }) => {
  await page.addInitScript(() => {
    const serviceWorker = navigator.serviceWorker;
    if (!serviceWorker) return;

    const waitingWorker = { postMessage: () => undefined };
    const registration = {
      waiting: waitingWorker,
      installing: null,
      addEventListener: () => undefined,
      update: async () => undefined,
    };

    Object.defineProperty(serviceWorker, 'getRegistration', {
      configurable: true,
      value: async () => registration,
    });
    Object.defineProperty(serviceWorker, 'ready', {
      configurable: true,
      value: Promise.resolve(registration),
    });
    Object.defineProperty(serviceWorker, 'controller', {
      configurable: true,
      value: { state: 'activated' },
    });
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('main')).toBeVisible();

  const restart = page.getByRole('button', { name: 'Restart', exact: true });
  await expect(restart).toBeVisible();

  const height = await restart.evaluate((element) => element.getBoundingClientRect().height);
  expect(height, 'Restart should provide a comfortable touch target').toBeGreaterThanOrEqual(44);

  let focused = false;
  for (let i = 0; i < 120; i += 1) {
    await page.keyboard.press('Tab');
    if (await restart.evaluate((element) => element === document.activeElement)) {
      focused = true;
      break;
    }
  }

  expect(focused, 'Restart should be reachable by keyboard').toBe(true);
  const boxShadow = await restart.evaluate((element) => getComputedStyle(element).boxShadow);
  expect(boxShadow, 'keyboard focus should render a visible ring').not.toBe('none');
});
