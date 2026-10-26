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
  test('shows the grouped 14-domain pathway and its implementation stages', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/track/cgei');

    await expect(page.getByText('14 connected domains', { exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByRole('heading', { name: 'Explore the pathway', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Foundations & Earth systems' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Applied environmental intelligence' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Research & professional practice' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Advanced pathways & capstone' })).toBeVisible();
    await expect(page.getByRole('button', { name: /Explore/ })).toHaveCount(14);
    await expect(page.getByText(/Canonical curriculum · subject readiness:/).first()).toBeVisible();
    await expect(page.getByText('Orientation only', { exact: true }).first()).toBeVisible();
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
      // The orientation's ordered unit list is intentionally inside collapsed <details>.
      // Assert the actual, always-visible learning-path unit controls rather than the
      // duplicate codes in that hidden orientation list.
      await expect(page.getByRole('button').filter({ hasText: subject.firstUnit }).last()).toBeVisible();
      await expect(page.getByRole('button').filter({ hasText: subject.lastUnit }).last()).toBeVisible();
    }

    await page.goto('/learn/cgei-data-science');
    await expect(page.getByText(/0 of \d+ lessons marked studied/)).toBeVisible();
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
    await expect(page.getByText(/1 of \d+ lessons marked studied/)).toBeVisible();
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
});
