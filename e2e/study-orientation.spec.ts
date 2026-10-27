import { test, expect } from '@playwright/test';

test('CGEI subject shows Learning path units and collapsible orientation', async ({ page }) => {
  await page.goto('/track/cgei');
  await page.waitForLoadState('domcontentloaded');
  // Open first CGEI subject if linked from track
  const subjectLink = page.getByRole('link').filter({ hasText: /Scientific Computing|Geospatial|Climate/i }).first();
  if (await subjectLink.count()) {
    await subjectLink.click();
    await page.waitForLoadState('domcontentloaded');
  } else {
    // Direct learn route used in app
    await page.goto('/learn');
  }

  // Orientation may be a details/summary "Before you begin"
  const orientation = page.locator('details').filter({ hasText: /Before you begin|Orientation|How this subject/i }).first();
  if (await orientation.count()) {
    const summary = orientation.locator('summary').first();
    await expect(summary).toBeVisible();
    // Expand if closed
    const open = await orientation.getAttribute('open');
    if (open === null) {
      await summary.click();
    }
    await expect(orientation).toHaveAttribute('open', '');
  }

  // Units path should be primary
  const units = page.getByText(/Learning path|Units|Curriculum units/i).first();
  await expect(units).toBeVisible({ timeout: 15000 });
});
