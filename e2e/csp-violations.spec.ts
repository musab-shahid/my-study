import { test, expect } from '@playwright/test';

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
    await page.waitForLoadState('networkidle');
    seen.push(...(await page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? [])));
  }
  expect(seen).toEqual([]);
});
