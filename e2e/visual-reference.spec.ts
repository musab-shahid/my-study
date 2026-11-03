import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { expect, test } from '@playwright/test';

const routes = [
  { slug: 'home', path: '/' },
  { slug: 'learn', path: '/learn/meteo-climatology' },
  { slug: 'learn-index', path: '/learn' },
  { slug: 'learn-maths', path: '/learn/maths' },
  { slug: 'section', path: '/section/METEO-01' },
  { slug: 'topic', path: '/topic/meteo-origin-evolution' },
  { slug: 'formulas', path: '/formulas' },
  { slug: 'flashcards', path: '/flashcards/meteo-origin-evolution' },
  { slug: 'cloud-atlas', path: '/cloud-atlas' },
  { slug: 'practice', path: '/practice' },
  { slug: 'practice-mock', path: '/practice/mock' },
  { slug: 'review', path: '/review' },
  { slug: 'progress', path: '/progress' },
  { slug: 'search', path: '/search' },
  { slug: 'settings', path: '/settings' },
  { slug: 'hat-landing', path: '/hat' },
  { slug: 'fpsc-landing', path: '/fpsc' },
  { slug: 'fpsc-track', path: '/track/fpsc' },
  { slug: 'hat-track', path: '/track/hat' },
  { slug: 'cgei-track', path: '/track/cgei' },
  { slug: 'curriculum-unit', path: '/curriculum/unit/cgei-ds-unit-5-8' },
  { slug: 'curriculum-lesson', path: '/curriculum/lesson/cgei-ds-lesson-5-1-1' },
] as const;

const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 900 },
] as const;

test('captures visual references for representative routes at mobile and desktop widths', async ({ page }, testInfo) => {
  test.setTimeout(300_000);
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

      const outputDir = testInfo.outputPath('visual-reference');
      mkdirSync(outputDir, { recursive: true });
      const viewportOutput = testInfo.outputPath('visual-reference', route.slug + '-' + viewport.width + '-viewport.png');
      const fullPageOutput = testInfo.outputPath('visual-reference', route.slug + '-' + viewport.width + '-full.png');
      await page.screenshot({ path: viewportOutput, fullPage: false, animations: 'disabled' });
      await page.screenshot({ path: fullPageOutput, fullPage: true, animations: 'disabled' });
      await testInfo.attach(route.slug + '-' + viewport.width + '-viewport', {
        path: viewportOutput,
        contentType: 'image/png',
      });
      await testInfo.attach(route.slug + '-' + viewport.width + '-full', {
        path: fullPageOutput,
        contentType: 'image/png',
      });
    }
  }
});



const APP_DATA_KEY = 'examprep-data';
const QUIZ_PROGRESS_KEY = 'examprep-quiz-progress';
const SUBJECT_SELECTION_KEY = 'examprep-subject-selection';

function enrolledFpscAppData() {
  const now = new Date().toISOString();
  return {
    studiedTopics: [],
    topicProgress: {},
    questionResults: {},
    quizHistory: [],
    revisionDates: {},
    lastOpenedTopic: '',
    trackMembership: {
      schemaVersion: 1,
      enrollments: {
        fpsc: {
          enrolledAt: now,
          source: 'explicit',
          lastOpenedAt: now,
          activeExamId: null,
        },
      },
      activeTrackId: 'fpsc',
    },
  };
}

/** Seed enrolled FPSC workspace with English practice scope. */
async function seedEnrolledWorkspace(page: import('@playwright/test').Page) {
  await page.goto('/');
  await page.evaluate(
    ({ appKey, quizKey, subjectKey, data }) => {
      localStorage.removeItem(quizKey);
      localStorage.setItem(appKey, JSON.stringify(data));
      localStorage.setItem(
        subjectKey,
        JSON.stringify({
          activeTrack: 'fpsc',
          byTrack: {
            fpsc: {
              perScreen: { practice: 'english' },
              lastSelected: 'english',
              prefersAll: false,
            },
          },
        }),
      );
    },
    {
      appKey: APP_DATA_KEY,
      quizKey: QUIZ_PROGRESS_KEY,
      subjectKey: SUBJECT_SELECTION_KEY,
      data: enrolledFpscAppData(),
    },
  );
  await page.reload();
  await expect(page.locator('main')).toBeVisible({ timeout: 15_000 });
}

test('captures enrolled dashboard at mobile, tablet, and desktop widths', async ({ page }, testInfo) => {
  test.setTimeout(180_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await seedEnrolledWorkspace(page);

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });
    const path = testInfo.outputPath('visual-reference-seeded', `enrolled-dashboard-${viewport.width}.png`);
    mkdirSync(testInfo.outputPath('visual-reference-seeded'), { recursive: true });
    await page.screenshot({ path, fullPage: true, animations: 'disabled' });
    await testInfo.attach(`enrolled-dashboard-${viewport.width}`, { path, contentType: 'image/png' });
  }
});

test('captures active quiz focus chrome after starting quick practice', async ({ page }, testInfo) => {
  test.setTimeout(240_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await seedEnrolledWorkspace(page);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByText('Practice', { exact: true }).first().click();
  await expect(page.getByText('Quick Practice', { exact: true }).first()).toBeVisible({ timeout: 20_000 });

  await expect
    .poll(
      async () => {
        const el = page.getByText(/\d+ questions? available/i).first();
        if (!(await el.isVisible().catch(() => false))) return 0;
        const text = (await el.textContent()) || '';
        const m = text.match(/(\d+)/);
        return m ? parseInt(m[1], 10) : 0;
      },
      { timeout: 90_000, message: 'question bank did not load for practice scope' },
    )
    .toBeGreaterThan(0);

  await page.getByRole('button', { name: /Quick Practice/i }).first().click();
  const startNew = page.getByRole('button', { name: /Start New/i });
  if (await startNew.isVisible().catch(() => false)) {
    await startNew.click();
  }

  const check = page.getByRole('button', { name: /^Check Answer$/i });
  await expect(check).toBeVisible({ timeout: 90_000 });

  mkdirSync(testInfo.outputPath('visual-reference-seeded'), { recursive: true });
  const path = testInfo.outputPath('visual-reference-seeded', 'active-quiz-390.png');
  await page.screenshot({ path, fullPage: false, animations: 'disabled' });
  await testInfo.attach('active-quiz-390', { path, contentType: 'image/png' });
});
