import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * Page-level axe scans for primary learner routes.
 * Complements targeted keyboard/focus tests; does not claim full WCAG certification.
 */
const routes = [
  { name: 'home', path: '/' },
  { name: 'learn', path: '/learn' },
  { name: 'practice', path: '/practice' },
  { name: 'review', path: '/review' },
  { name: 'progress', path: '/progress' },
  { name: 'settings', path: '/settings' },
  { name: 'cgei-track', path: '/track/cgei' },
] as const;

test.describe('Axe accessibility scans', () => {
  for (const route of routes) {
    test(`${route.name} has no serious or critical axe violations`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      // Avoid sampling transient entrance-animation opacity rather than the settled UI.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();

      const serious = results.violations.filter((v) =>
        v.impact === 'serious' || v.impact === 'critical',
      );

      expect(
        serious,
        serious.map((v) => `${v.id}: ${v.help}`).join('\n') || 'no serious/critical violations',
      ).toEqual([]);
    });
  }
});
