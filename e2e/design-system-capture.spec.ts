import { test, expect } from '@playwright/test';

const routes = [
  { name: 'home', path: '/' },
  { name: 'fpsc', path: '/fpsc' },
  { name: 'hat', path: '/hat' },
  { name: 'cgei-track', path: '/track/cgei' },
  { name: 'learn', path: '/learn/maths' },
  { name: 'practice', path: '/practice' },
  { name: 'progress', path: '/progress' },
  { name: 'search', path: '/search' },
  { name: 'settings', path: '/settings' },
  { name: 'formulas', path: '/formulas' },
  { name: 'flashcards', path: '/flashcards' },
  { name: 'cloud-atlas', path: '/cloud-atlas' },
];

test('capture design-system reference screenshots at mobile and desktop widths', async ({ page }, testInfo) => {
  test.setTimeout(240_000);
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1280, height: 900 },
  ]) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route.path);
      await expect(page.locator('#root').locator(':scope > *').first()).toBeVisible({ timeout: 20_000 });
      const filename = viewport.width + '-' + route.name + '.png';
      await page.screenshot({
        path: testInfo.outputPath(filename),
        fullPage: true,
        animations: 'disabled',
      });
    }
  }
});
