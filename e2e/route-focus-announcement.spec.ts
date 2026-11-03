import { expect, test } from '@playwright/test';

const primaryNavigation = (page: import('@playwright/test').Page) =>
  page.getByRole('navigation', { name: 'Primary' });

test.describe('route-change focus and announcements', () => {
  test('does not move focus on initial page load', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.locator('#main-content')).toBeVisible();

    await expect(page.locator('#main-content')).not.toBeFocused();
    await expect(page.locator('#main-content h1').first()).not.toBeFocused();
    await expect(page.locator('#route-announcement')).toHaveText('');
  });

  test('focuses the destination heading and announces its page name', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');

    await primaryNavigation(page).getByRole('button', { name: 'Learn', exact: true }).click();

    const heading = page.locator('#main-content h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toBeFocused();
    const headingText = (await heading.innerText()).trim();
    await expect(page.locator('#route-announcement')).toContainText(headingText);
  });

  test('does not refocus the page for a same-screen navigation update', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    const learn = primaryNavigation(page).getByRole('button', { name: 'Learn', exact: true });

    await learn.click();
    await expect(page.locator('#main-content h1').first()).toBeFocused();

    await learn.click();
    await expect(learn).toBeFocused();
  });

  test('restores heading focus on browser Back and Forward navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await primaryNavigation(page).getByRole('button', { name: 'Learn', exact: true }).click();
    await expect(page.locator('#main-content h1').first()).toBeFocused();

    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('#main-content h1').first()).toBeFocused();
    await expect(page.locator('#route-announcement')).toContainText('Home');

    await page.goForward();
    await expect(page).toHaveURL(/\/learn$/);
    await expect(page.locator('#main-content h1').first()).toBeFocused();
  });

  test('does not steal focus from an open modal when browser history changes the route', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await primaryNavigation(page).getByRole('button', { name: 'Learn', exact: true }).click();
    await expect(page.locator('#main-content h1').first()).toBeFocused();

    await page.locator('aside').getByRole('button', { name: 'More', exact: true }).click();
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();

    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(dialog).toBeVisible();
    await expect.poll(() => dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  });

  test('keeps the skip-to-content link and main landmark usable', async ({ page }) => {
    await page.goto('/');
    const skipLink = page.getByRole('link', { name: 'Skip to content' });
    const main = page.locator('#main-content');

    await expect(skipLink).toHaveAttribute('href', '#main-content');
    await skipLink.focus();
    await page.keyboard.press('Enter');
    await expect(main).toBeFocused();
  });
});
