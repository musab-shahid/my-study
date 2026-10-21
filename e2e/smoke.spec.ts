import { test, expect } from '@playwright/test';

test.describe('App shell & navigation', () => {
  test('loads home and shows primary navigation labels', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Home', { exact: true }).first()).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible();
  });

  test('opens Settings and exposes local backup export', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Settings', { exact: true }).first().click();
    await expect(page.getByText(/Download a JSON backup|Download backup|Export/i).first()).toBeVisible({
      timeout: 15_000,
    });
    const cloudHint = page.getByText(/No session token found|Sign in required|Cloud backup/i);
    if (await cloudHint.count()) {
      await expect(cloudHint.first()).toBeVisible();
    }
  });
});

test.describe('Track enrollment surface', () => {
  test('FPSC landing shows Begin or enrolled workspace actions', async ({ page }) => {
    await page.goto('/');
    const fpsc = page.getByRole('button', { name: /FPSC/i }).first();
    if (await fpsc.isVisible().catch(() => false)) {
      await fpsc.click();
    } else {
      const explore = page.getByText(/Explore.*FPSC|FPSC Exam/i).first();
      if (await explore.isVisible().catch(() => false)) {
        await explore.click();
      }
    }
    const begin = page.getByRole('button', { name: /Begin/i });
    const enrolledCue = page.getByText(/My Tracks|Continue learning|Subjects in this track/i);
    const sawBegin = await begin.first().isVisible().catch(() => false);
    const sawEnrolled = await enrolledCue.first().isVisible().catch(() => false);
    expect(sawBegin || sawEnrolled, 'expected Begin CTA or enrolled workspace cues').toBeTruthy();
  });
});

test.describe('Practice gate', () => {
  test('Practice screen loads without crashing', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Practice', { exact: true }).first().click();
    await expect(
      page.getByText(/Practice|Begin|enroll|locked|Quick|Mock|Review/i).first(),
    ).toBeVisible({ timeout: 15_000 });
  });
});

