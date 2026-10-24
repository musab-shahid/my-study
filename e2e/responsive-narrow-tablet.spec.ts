import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/learn',
  '/settings',
  '/practice',
  '/progress',
  '/search',
  '/track/cgei',
  '/curriculum/lesson/cgei-ds-lesson-5-1-1',
] as const;

const viewports = [
  { width: 320, height: 740, label: 'narrow-mobile' },
  { width: 768, height: 1024, label: 'tablet' },
  { width: 1024, height: 768, label: 'small-desktop' },
] as const;

test('core routes fit narrow mobile, tablet, and small desktop widths', async ({ page }) => {
  test.setTimeout(180_000);

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of routes) {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('main'), `${route} should render at ${viewport.label}`)
        .toBeVisible({ timeout: 20_000 });

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(
        hasHorizontalOverflow,
        `${route} should not overflow horizontally at ${viewport.width}px (${viewport.label})`,
      ).toBe(false);
    }
  }
});
