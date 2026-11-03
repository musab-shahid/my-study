import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type ModerateBaseline = Record<string, Record<string, number>>;
const baseline = JSON.parse(
  readFileSync(new URL('./axe-moderate-baseline.json', import.meta.url), 'utf8'),
) as ModerateBaseline;

const viewports = [
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'desktop-1280x800', width: 1280, height: 800 },
] as const;

const routes = [
  { name: 'home', path: '/' },
  { name: 'learn', path: '/learn' },
  { name: 'practice', path: '/practice' },
  { name: 'review', path: '/review' },
  { name: 'progress', path: '/progress' },
  { name: 'settings', path: '/settings' },
  { name: 'cgei-track', path: '/track/cgei' },
] as const;

const APP_DATA_KEY = 'examprep-data';
const QUIZ_PROGRESS_KEY = 'examprep-quiz-progress';
const SUBJECT_SELECTION_KEY = 'examprep-subject-selection';
const CGEI_LESSON_ID = 'cgei-ds-lesson-5-8-1';

async function scanAxe(page: Page, scenario: string) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();

  const blocking = results.violations.filter((violation) =>
    violation.impact === 'serious' || violation.impact === 'critical',
  );
  const moderate = results.violations.filter((violation) => violation.impact === 'moderate');
  const allowed = baseline[scenario] ?? {};
  const actual = Object.fromEntries(moderate.map((violation) => [violation.id, violation.nodes.length]));
  const increases = Object.entries(actual).filter(([id, count]) => count > (allowed[id] ?? 0));
  const moderateDetails = moderate.map((violation) =>
    `${violation.id} (${violation.nodes.length}): ${violation.help}\n${violation.nodes.map((node) => node.target.join(' ')).join('\n')}`,
  ).join('\n');

  expect(
    blocking,
    blocking.map((violation) => `${violation.id}: ${violation.help}`).join('\n') || 'no serious/critical violations',
  ).toEqual([]);
  expect(
    increases,
    `New or increased moderate WCAG violations in ${scenario}:\n${moderateDetails || 'none'}`,
  ).toEqual([]);
}

async function seedCgeiWorkspace(page: Page) {
  const now = new Date().toISOString();
  await page.goto('/');
  await page.evaluate(
    ({ appKey, subjectKey, enrolledAt }) => {
      localStorage.setItem(appKey, JSON.stringify({
        studiedTopics: [],
        topicProgress: {},
        questionResults: {},
        quizHistory: [],
        revisionDates: {},
        lastOpenedTopic: '',
        trackMembership: {
          schemaVersion: 1,
          enrollments: {
            cgei: {
              enrolledAt,
              source: 'explicit',
              lastOpenedAt: enrolledAt,
              activeExamId: null,
            },
          },
          activeTrackId: 'cgei',
        },
      }));
      localStorage.setItem(subjectKey, JSON.stringify({
        activeTrack: 'cgei',
        byTrack: { cgei: { perScreen: {}, lastSelected: '', prefersAll: true } },
      }));
    },
    { appKey: APP_DATA_KEY, subjectKey: SUBJECT_SELECTION_KEY, enrolledAt: now },
  );
  await page.reload();
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible({ timeout: 30_000 });
}

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

async function seedFpscWorkspace(page: Page) {
  await page.goto('/');
  await page.evaluate(
    ({ appKey, quizKey, subjectKey, data }) => {
      localStorage.removeItem(quizKey);
      localStorage.setItem(appKey, JSON.stringify(data));
      localStorage.setItem(subjectKey, JSON.stringify({
        activeTrack: 'fpsc',
        byTrack: {
          fpsc: {
            perScreen: { practice: 'english' },
            lastSelected: 'english',
            prefersAll: false,
          },
        },
      }));
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

async function seedMeteorologyWorkspace(page: Page) {
  await page.goto('/');
  await page.evaluate(
    ({ appKey, quizKey, subjectKey, data }) => {
      localStorage.removeItem(quizKey);
      localStorage.setItem(appKey, JSON.stringify(data));
      localStorage.setItem(subjectKey, JSON.stringify({
        activeTrack: 'fpsc',
        byTrack: {
          fpsc: {
            perScreen: { learn: 'meteo-climatology' },
            lastSelected: 'meteo-climatology',
            prefersAll: false,
          },
        },
      }));
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

async function answerCurrentQuestion(page: Page) {
  const check = page.getByRole('button', { name: /^Check Answer$/i });
  await expect(check).toBeVisible({ timeout: 20_000 });

  const option = page.locator('[aria-label^="Option 1:"]').first();
  if (await option.isVisible().catch(() => false)) {
    await option.click();
  } else {
    const radiogroup = page.getByRole('radiogroup', { name: /Answer options/i });
    const group = page.getByRole('group', { name: /Answer options/i });
    const optionsRoot = (await radiogroup.count()) > 0 ? radiogroup : group;
    await optionsRoot.locator('[role="radio"], [role="checkbox"], button').first().click();
  }

  await expect(check).toBeEnabled({ timeout: 5_000 });
  await check.click();
  const thinkSo = page.getByRole('button', { name: /Think so/i });
  if (await thinkSo.isVisible().catch(() => false)) await thinkSo.click();

  const next = page.getByRole('button', { name: /^(Next Question|View Results)$/i });
  const continueRegion = page.getByLabel(/tap or press enter to continue/i);
  if (await next.isVisible().catch(() => false)) await next.click();
  else if (await continueRegion.isVisible().catch(() => false)) await continueRegion.click();
  else {
    const feedback = page.locator('main').getByText(/correct|incorrect/i).first();
    if (await feedback.isVisible().catch(() => false)) await feedback.click();
  }
}

test.describe('Axe WCAG 2.2 AA route matrix', () => {
  for (const route of routes) {
    for (const viewport of viewports) {
      test(`${route.name} at ${viewport.name} stays within the accessibility baseline`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.goto(route.path, { waitUntil: 'domcontentloaded' });
        await expect(page.locator('main')).toBeVisible({ timeout: 20_000 });
        await scanAxe(page, `${route.name}@${viewport.name}`);
      });
    }
  }
});

test('More dialog stays within the accessibility baseline at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('button', { name: /^More/ }).click();
  await expect(page.getByRole('dialog', { name: 'More' })).toBeVisible();
  await scanAxe(page, 'more-dialog@mobile-390x844');
});

test.describe('CGEI lesson reader accessibility', () => {
  for (const viewport of viewports) {
    test(`lesson reader at ${viewport.name} stays within the accessibility baseline`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await seedCgeiWorkspace(page);
      await page.goto(`/curriculum/lesson/${CGEI_LESSON_ID}`);
      await expect(page.getByRole('heading', { name: 'Build a defensible multivariate data matrix', exact: true })).toBeVisible({ timeout: 20_000 });
      await scanAxe(page, `lesson-reader@${viewport.name}`);
    });
  }
});

test('quiz progress and results stay within the desktop accessibility baseline', async ({ page }) => {
  test.setTimeout(240_000);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await seedFpscWorkspace(page);

  await page.getByRole('navigation', { name: 'Primary' }).getByRole('button', { name: 'Practice', exact: true }).click();
  await expect(page.getByText('Quick Practice', { exact: true }).first()).toBeVisible({ timeout: 20_000 });
  await expect.poll(async () => {
    const label = page.getByText(/\d+ questions? available/i).first();
    if (!(await label.isVisible().catch(() => false))) return 0;
    const match = (await label.textContent())?.match(/(\d+)/);
    return match ? Number(match[1]) : 0;
  }, { timeout: 90_000 }).toBeGreaterThan(0);

  await page.getByRole('button', { name: /Quick Practice/i }).first().click();
  const startNew = page.getByRole('button', { name: /Start New/i });
  if (await startNew.isVisible().catch(() => false)) await startNew.click();
  await expect(page.getByRole('button', { name: /^Check Answer$/i })).toBeVisible({ timeout: 90_000 });
  await scanAxe(page, 'quiz-progress@desktop-1280x800');

  const resultsHeading = page.getByText(/% correct · (?:Quiz|Mock Exam) complete/i);
  for (let index = 0; index < 20; index += 1) {
    if (await resultsHeading.isVisible().catch(() => false)) break;
    await answerCurrentQuestion(page);
  }
  await expect(resultsHeading).toBeVisible({ timeout: 30_000 });
  await scanAxe(page, 'quiz-results@desktop-1280x800');
});

test('AI tutor dialog stays within the desktop accessibility baseline', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await seedMeteorologyWorkspace(page);
  await page.goto('/topic/meteo-origin-evolution?axe-tutor=1');

  await expect(page.getByRole('heading', { name: 'Origin & Chemical Evolution of the Atmosphere', exact: true })).toBeVisible({ timeout: 20_000 });
  await page.getByRole('button', { name: 'Ask AI Tutor', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'AI tutor for Origin & Chemical Evolution of the Atmosphere' });
  await expect(dialog).toBeVisible();
  await scanAxe(page, 'ai-tutor-dialog@desktop-1280x800');
});
