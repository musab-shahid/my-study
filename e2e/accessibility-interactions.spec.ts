import { expect, test } from '@playwright/test';

test.describe('mobile tools dialog keyboard behavior', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
  });

  test('Escape closes the tools dialog and restores focus to its trigger', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await expect(trigger).toBeVisible();
    await trigger.focus();
    await page.keyboard.press('Enter');

    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Study');
    await expect(dialog).toContainText('Search');
    await expect(dialog).toContainText('Settings');
    await expect(dialog).toContainText('More');

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('programmatic focus changes cannot escape the open dialog', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();

    // The primary navigation is outside the modal. Even an explicit focus()
    // call from another component must not leave focus behind the open sheet.
    await page.getByRole('button', { name: 'Home', exact: true }).focus();
    await expect.poll(async () =>
      dialog.evaluate((node) => node.contains(document.activeElement)),
    ).toBe(true);
  });

  test('Tab and Shift+Tab keep sequential focus inside the open dialog', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();

    // The tray's close button is the first focusable control. Shift+Tab should
    // wrap to the final focusable item rather than escaping to page navigation.
    await page.getByRole('button', { name: 'Close' }).focus();
    await page.keyboard.press('Shift+Tab');
    await expect.poll(async () => dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);

    // Move to the final item and verify forward Tab wraps to the first control.
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Close' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect.poll(async () => dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  });
  
  test('the tools sheet remains usable at a narrow, short viewport', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    await trigger.focus();
    await page.keyboard.press('Enter');

    const dialog = page.getByRole('dialog', { name: 'More' });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();

    const bounds = await dialog.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
    await expect.poll(() => page.evaluate(() =>
      document.documentElement.scrollWidth <= window.innerWidth,
    )).toBe(true);
  });

  test('keyboard focus has a visible outline and core text tokens meet contrast targets', async ({ page }) => {
    const trigger = page.getByRole('button', { name: /^More(?:,.*)?$/ });
    // Start on the preceding mobile-nav item so Tab lands on More (the final
    // nav control) instead of leaving the document and focusing the browser chrome.
    await page.evaluate(() => {
      const more = Array.from(document.querySelectorAll('button')).find((button) =>
        button.getAttribute('aria-label') === 'More',
      );
      const previous = more?.previousElementSibling;
      if (!(previous instanceof HTMLButtonElement)) throw new Error('Expected a preceding mobile navigation button');
      previous.focus();
    });
    await page.keyboard.press('Tab');
    await expect(trigger).toBeFocused();

    const focusStyle = await page.evaluate(() => {
      const active = document.activeElement as HTMLElement;
      const style = window.getComputedStyle(active);
      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: parseFloat(style.outlineWidth),
        boxShadow: style.boxShadow,
      };
    });
    // Focus indicators may be implemented as an outline or as a CSS ring
    // (box-shadow); assert the rendered indicator rather than one CSS technique.
    const hasOutline = focusStyle.outlineStyle !== 'none' && focusStyle.outlineWidth >= 2;
    const hasRing = focusStyle.boxShadow !== 'none' && focusStyle.boxShadow !== '';
    expect(hasOutline || hasRing).toBe(true);

    const contrast = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const toRgb = (value: string): [number, number, number] => {
        const hex = value.trim();
        if (hex.startsWith('#')) {
          const expanded = hex.length === 4
            ? hex.slice(1).split('').map((part) => part + part).join('')
            : hex.slice(1);
          return [0, 2, 4].map((index) => parseInt(expanded.slice(index, index + 2), 16)) as [number, number, number];
        }
        const parts = hex.match(/[\d.]+/g);
        if (!parts || parts.length < 3) throw new Error(`Unparseable color: ${value}`);
        return parts.slice(0, 3).map(Number) as [number, number, number];
      };
      const luminance = (color: [number, number, number]) => {
        const channels = color.map((channel) => channel / 255).map((channel) =>
          channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
        );
        return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
      };
      const ratio = (foreground: string, background: string) => {
        const a = luminance(toRgb(foreground));
        const b = luminance(toRgb(background));
        return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      };
      const primary = root.getPropertyValue('--text-primary');
      const muted = root.getPropertyValue('--text-muted');
      const page = root.getPropertyValue('--surface-page');
      const raised = root.getPropertyValue('--surface-raised');
      const focus = root.getPropertyValue('--focus-ring');
      return {
        primaryOnPage: ratio(primary, page),
        primaryOnRaised: ratio(primary, raised),
        mutedOnPage: ratio(muted, page),
        mutedOnRaised: ratio(muted, raised),
        focusOnPage: ratio(focus, page),
        focusOnRaised: ratio(focus, raised),
      };
    });

    expect(contrast.primaryOnPage).toBeGreaterThanOrEqual(4.5);
    expect(contrast.primaryOnRaised).toBeGreaterThanOrEqual(4.5);
    expect(contrast.mutedOnPage).toBeGreaterThanOrEqual(4.5);
    expect(contrast.mutedOnRaised).toBeGreaterThanOrEqual(4.5);
    expect(contrast.focusOnPage).toBeGreaterThanOrEqual(3);
    expect(contrast.focusOnRaised).toBeGreaterThanOrEqual(3);
  });
});
