import { defineConfig, devices } from '@playwright/test';

/**
 * Prefer system Chrome locally. CI / PLAYWRIGHT_FORCE_BUNDLED=1 → bundled Chromium.
 * CI runs the desktop Chromium project only (faster, avoids mobile layout flakes).
 */
const useSystemChrome =
  process.env.PLAYWRIGHT_FORCE_BUNDLED !== '1' && process.env.CI !== 'true';

const chromiumProject = {
  name: 'chromium',
  use: {
    ...devices['Desktop Chrome'],
    browserName: 'chromium' as const,
    ...(useSystemChrome ? { channel: 'chrome' as const } : {}),
  },
};

const mobileProject = {
  name: 'mobile',
  use: {
    browserName: 'chromium' as const,
    ...devices['Desktop Chrome'],
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    ...(useSystemChrome ? { channel: 'chrome' as const } : {}),
  },
};

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    ...(useSystemChrome ? { channel: 'chrome' as const } : {}),
  },
  projects: process.env.CI ? [chromiumProject] : [chromiumProject, mobileProject],
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
