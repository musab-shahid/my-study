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
    await expect(page.getByText('Canonical curriculum pilot', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Domain orientation', { exact: true }).first()).toBeVisible();
  });

  test('canonical curriculum units are discoverable from every registered subject overview', async ({ page }) => {
    await seedCgeiWorkspace(page);

    await page.goto('/learn/cgei-remote-sensing');
    await expect(page.getByRole('heading', { name: 'Curriculum units', exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('4.1', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('4.10', { exact: true }).first()).toBeVisible();

    await page.goto('/learn/cgei-ml-geoai');
    await expect(page.getByRole('heading', { name: 'Curriculum units', exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText('6.1', { exact: true }).first()).toBeVisible();
  });

  test('legacy roadmap deep links open orientation, not a study lesson', async ({ page }) => {
    await seedCgeiWorkspace(page);
    await page.goto('/topic/cgei-env-systems-roadmap');

    await expect(page).toHaveURL(/\/learn\/cgei-env-systems$/);
    await expect(page.getByText('Domain orientation · not a lesson', { exact: true })).toBeVisible({ timeout: 20_000 });
    await expect(page.getByText(/Structured lessons and assessments for this domain are being migrated progressively/)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sections', exact: true })).toHaveCount(0);
    await expect(page.getByText(/0 \/ 1 topics studied/)).toHaveCount(0);
  });
});
