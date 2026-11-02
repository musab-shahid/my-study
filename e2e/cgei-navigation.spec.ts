import { test, expect } from '@playwright/test';

const APP_DATA_KEY = 'examprep-data';
const SUBJECT_SELECTION_KEY = 'examprep-subject-selection';

async function seedCgeiWorkspace(page: import('@playwright/test').Page) {
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
  await expect(page.getByText('Settings', { exact: true }).first()).toBeVisible({ timeout: 30_000 });
}

test.describe('CGEI curriculum navigation and orientation', () => {
  test('shows the grouped 13-domain pathway and its implementation stages', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/track/cgei');

    await expect(page.getByText('13 connected domains', { exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole('heading', { name: 'Explore the pathway', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Foundations & Earth systems' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Applied environmental intelligence' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Research & professional practice' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Advanced pathways & capstone' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Explore/ })).toHaveCount(13);
    await expect(page.getByText(/Canonical curriculum · subject readiness:/).first()).toBeVisible();
    await expect(page.getByText('Orientation only', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Optional Advanced Environmental Branches', { exact: true })).toHaveCount(0);
  });

  test('Learn opens the dedicated CGEI learning home, independent of the saved All Subjects preference', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/learn');

    await expect(page.getByRole('heading', { name: 'CGEI Learning', exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole('heading', { name: 'Your 13 learning domains', exact: true })).toBeVisible();
    await expect(page.getByText('All Subjects', { exact: true })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Open domain' })).toHaveCount(13);
    await expect(page.getByRole('button', { name: 'Track overview', exact: true })).toBeVisible();
  });

  test('domain search filters the grouped catalogue without changing curriculum order', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/learn');
    await page.getByRole('searchbox', { name: 'Search learning domains' }).fill('Climate Science');
    await expect(page.getByRole('heading', { name: 'Climate Science', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open domain' })).toHaveCount(1);
    await expect(page.getByText('No matching domains', { exact: true })).toHaveCount(0);
  });

  test('unenrolled CGEI visitor gets an explicit enrollment route', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.evaluate((key) => {
      const value = JSON.parse(localStorage.getItem(key) ?? '{}');
      value.trackMembership = { schemaVersion: 1, enrollments: {}, activeTrackId: null };
      localStorage.setItem(key, JSON.stringify(value));
    }, APP_DATA_KEY);
    await page.reload();
    await page.goto('/learn');
    await expect(page.getByText('Start the CGEI learning pathway', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Explore and enroll', exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open domain' }).first()).toBeDisabled();
  });

  test('track overview opens the CGEI learning home explicitly', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/track/cgei');
    await page.getByRole('button', { name: 'Open CGEI Learning', exact: true }).click();
    await expect(page).toHaveURL(/\/learn$/);
    await expect(page.getByRole('heading', { name: 'CGEI Learning', exact: true })).toBeVisible();
  });

  test('lesson navigation moves through authored lessons without marking them studied', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/curriculum/lesson/cgei-ds-lesson-5-1-1');

    const next = page.getByRole('button', { name: /Next lesson/ });
    await expect(next).toBeEnabled({ timeout: 20_000 });
    await next.click();
    await expect(page).toHaveURL(/\/curriculum\/lesson\/cgei-ds-lesson-5-1-2$/);
    await expect(page.getByRole('button', { name: /Previous lesson/ })).toBeEnabled();
    await expect(page.getByText('This lesson is marked as studied.', { exact: true })).toHaveCount(0);
  });

  test('all registered canonical subjects expose their unit hierarchy', async ({ page }) => {
    await seedCgeiWorkspace(page);

    const subjects = [
      { id: 'cgei-env-systems', firstUnit: '1.1', lastUnit: '1.10' },
      { id: 'cgei-climate-science', firstUnit: '2.1', lastUnit: '2.8' },
      { id: 'cgei-geospatial', firstUnit: '3.1', lastUnit: '3.4' },
      { id: 'cgei-remote-sensing', firstUnit: '4.1', lastUnit: '4.10' },
      { id: 'cgei-data-science', firstUnit: '5.1', lastUnit: '5.12' },
      { id: 'cgei-ml-geoai', firstUnit: '6.1', lastUnit: '6.6' },
      { id: 'cgei-climate-risk', firstUnit: '7.1', lastUnit: '7.5' },
    ];

    for (const subject of subjects) {
      await page.goto(`/learn/${subject.id}`);
      await expect(page.getByRole('heading', { name: 'Learning path', exact: true })).toBeVisible({ timeout: 20_000 });
      await expect(page.getByText('All Subjects', { exact: true })).toHaveCount(0);
      // The orientation's ordered unit list is intentionally inside collapsed <details>.
      // Assert the actual, always-visible learning-path unit controls rather than the
      // duplicate codes in that hidden orientation list.
      await expect(page.getByRole('button').filter({ hasText: subject.firstUnit }).last()).toBeVisible();
      await expect(page.getByRole('button').filter({ hasText: subject.lastUnit }).last()).toBeVisible();
    }

    await page.goto('/learn/cgei-data-science');
    await expect(page.getByText(/^0 of \d+ authored lessons marked studied$/, { exact: true })).toBeVisible();
    await page.getByRole('button', { name: /Mathematical and physical foundations/ }).click();
    await expect(page).toHaveURL(/curriculum\/unit\/cgei-ds-unit-5-1$/);
    await expect(page.getByRole('heading', { name: 'Mathematical and physical foundations', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Assessments', exact: true })).toBeVisible();

    await page.getByRole('button', { name: /Quantities, units and dimensional analysis/ }).click();
    await expect(page).toHaveURL(/curriculum\/lesson\/cgei-ds-lesson-5-1-1$/);
    await expect(page.getByRole('heading', { name: 'Learning objectives', exact: true })).toBeVisible();
    await expect(page.getByText('Unrecorded knowledge check', { exact: true }).first()).toBeVisible();
    await expect(page.getByText(/does not establish mastery/).first()).toBeVisible();
    await page.getByRole('button', { name: /Mark lesson studied/ }).click();
    await expect(page.getByText('This lesson is marked as studied.', { exact: true })).toBeVisible();
    await page.goto('/learn/cgei-data-science');
    await expect(page.getByText(/^1 of \d+ authored lessons marked studied$/, { exact: true })).toBeVisible();
  });

  test('legacy roadmap deep links open orientation, not a study lesson', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/topic/cgei-env-systems-roadmap');

    await expect(page).toHaveURL(/\/learn\/cgei-env-systems$/);
    const orientation = page.locator('details').filter({ hasText: 'Before you begin' });
    await expect(orientation).toBeVisible({ timeout: 20_000 });
    await expect(orientation.locator('summary')).toContainText('expand for goals');
    await expect(orientation).not.toHaveAttribute('open', '');
    await orientation.locator('summary').click();
    await expect(orientation).toHaveAttribute('open', '');
    await expect(page.getByText(/Orientation is context only/)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Learning path', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sections', exact: true })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Legacy topic groups', exact: true })).toHaveCount(0);
    await expect(page.getByText(/0 \/ 1 topics studied/)).toHaveCount(0);
  });

  test('lesson position and Previous/Next controls use one navigable sequence', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/curriculum/lesson/cgei-cl-lesson-2-4-3');
    const position = page.getByText(/^Lesson \d+ of \d+$/, { exact: true });
    await expect(position).toBeVisible({ timeout: 30_000 });
    const match = (await position.textContent())?.match(/^Lesson (\d+) of (\d+)$/);
    expect(match).not.toBeNull();
    const current = Number(match?.[1]);
    const total = Number(match?.[2]);
    expect(total).toBeGreaterThan(0);
    expect(current).toBeGreaterThanOrEqual(1);
    expect(current).toBeLessThanOrEqual(total);
    const previous = page.getByRole('button', { name: /Previous lesson/ });
    const next = page.getByRole('button', { name: /Next lesson/ });
    if (current === 1) await expect(previous).toBeDisabled();
    else await expect(previous).toBeEnabled();
    if (current === total) await expect(next).toBeDisabled();
    else await expect(next).toBeEnabled();
  });

  test('Settings provides section navigation and explicit full-reset scope', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/settings');
    await expect(page.getByRole('navigation', { name: 'Settings sections' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Workspace' })).toHaveAttribute('href', '#workspace-settings');
    await expect(page.getByRole('heading', { name: 'Account and sync', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Select all', exact: true }).click();
    await page.getByRole('button', { name: 'Reset selected', exact: true }).click();
    await expect(page.getByText('Full reset: all study data will be cleared.', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset all data', exact: true })).toBeVisible();
    await expect(page.getByText(/A recovery backup will be saved before the reset/)).toBeVisible();
    await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  });

  test('lesson checks cap at five, expand fully, and reset when the learner changes lessons', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/curriculum/lesson/cgei-cl-lesson-2-4-3');

    await expect(page.getByText('Showing 5 of 7', { exact: true })).toBeVisible({ timeout: 30_000 });
    await page.getByRole('button', { name: 'Show all 7 questions', exact: true }).click();
    await expect(page.getByText('All 7 checks', { exact: true })).toBeVisible();

    await page.getByRole('button', { name: 'Unit overview', exact: true }).click();
    await expect(page).toHaveURL(/\/curriculum\/unit\/cgei-cl-unit-2-4$/);
    await page.getByRole('button', { name: /Gridded products and reanalysis/ }).click();
    await expect(page).toHaveURL(/\/curriculum\/lesson\/cgei-cl-lesson-2-4-2$/);
    await expect(page.getByText('Showing 3 of 3', { exact: true })).toBeVisible({ timeout: 30_000 });
    await expect(page.getByRole('button', { name: /Show all/ })).toHaveCount(0);
  });

});