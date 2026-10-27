import { test, expect } from '@playwright/test';

/**
 * Requires vite preview headers (CSP) from vite.config.ts.
 * Records securitypolicyviolation events on core routes.
 */
test('core routes raise no CSP violations', async ({ page }) => {
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) => {
      const w = window as unknown as { __csp?: string[] };
      w.__csp = (w.__csp ?? []).concat(`${e.violatedDirective} ${e.blockedURI}`);
    });
  });

  const seen: string[] = [];
  for (const path of ['/', '/settings', '/practice', '/track/fpsc']) {
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    // Allow fonts/network settle briefly
    await page.waitForTimeout(300);
    const batch = await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? []);
    seen.push(...batch);
    await page.evaluate(() => {
      (window as unknown as { __csp?: string[] }).__csp = [];
    });
  }
  expect(seen, `CSP violations: ${seen.join('; ')}`).toEqual([]);
});
