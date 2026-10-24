import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { expect, test } from '@playwright/test';

const routes = [
  { slug: 'home', path: '/' },
  { slug: 'learn', path: '/learn/meteo-climatology' },
  { slug: 'section', path: '/section/METEO-01' },
  { slug: 'topic', path: '/topic/meteo-origin-evolution' },
  { slug: 'formulas', path: '/formulas' },
  { slug: 'flashcards', path: '/flashcards/meteo-origin-evolution' },
  { slug: 'cloud-atlas', path: '/cloud-atlas' },
  { slug: 'practice', path: '/practice' },
  { slug: 'review', path: '/review' },
  { slug: 'progress', path: '/progress' },
  { slug: 'search', path: '/search' },
  { slug: 'settings', path: '/settings' },
  { slug: 'hat-landing', path: '/hat' },
  { slug: 'fpsc-landing', path: '/fpsc' },
  { slug: 'cgei-track', path: '/track/cgei' },
  { slug: 'curriculum-unit', path: '/curriculum/unit/cgei-ds-unit-5-8' },
  { slug: 'curriculum-lesson', path: '/curriculum/lesson/cgei-ds-lesson-5-1-1' },
] as const;

const viewports = [
  { width: 390, height: 844 },
  { width: 1280, height: 900 },
] as const;

test('captures visual references for every routable screen at mobile and desktop widths', async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const route of routes) {
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      const main = page.locator('main');
      await expect(main, route.slug + ' should render a main region').toBeVisible({ timeout: 20_000 });
      const headings = main.locator('h1');
      await expect(headings, route.slug + ' should expose exactly one page heading').toHaveCount(1);
      await expect(headings.first()).toBeVisible();
      await page.evaluate(() => document.fonts.ready.then(() => true));

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(
        hasHorizontalOverflow,
        route.slug + ' should not overflow horizontally at ' + viewport.width + 'px',
      ).toBe(false);

      const output = testInfo.outputPath('visual-reference', route.slug + '-' + viewport.width + '.png');
      mkdirSync(dirname(output), { recursive: true });
      await page.screenshot({ path: output, fullPage: true, animations: 'disabled' });
      await testInfo.attach(route.slug + '-' + viewport.width, {
        path: output,
        contentType: 'image/png',
      });
    }
  }
});
