import { test, expect } from '../../fixtures/manager.fixture';
import { FeaturePage } from '../../pages/FeaturePage';
import { expectAccessDeniedOrRedirected } from '../../utils/assertions';

test.describe('@manager @regression team workspace', () => {
  test('@smoke loads dashboard and real manager navigation', async ({ managerPage }) => { await managerPage.goto('/dashboard'); expect(await managerPage.discoveredNavigation()).not.toEqual([]); });
  for (const module of ['Team Performance', 'Teams', 'Calls', 'Call Reports', 'Leaderboard']) test(`opens visible ${module}`, async ({ managerPage, page }) => {
    await managerPage.goto('/dashboard'); const item = managerPage.menuItem(new RegExp(module, 'i')); test.skip(await item.count() === 0, `${module} not exposed.`);
    await new FeaturePage(page).openFromNavigation(new RegExp(module, 'i'));
  });
  test('@negative denies a manager a verified Org Admin route', async ({ page }) => {
    const protectedRoute = process.env.ORG_ADMIN_ONLY_ROUTE;
    test.skip(!protectedRoute, 'Set ORG_ADMIN_ONLY_ROUTE after an Org Admin discovery run.');
    await page.goto(protectedRoute!); await expectAccessDeniedOrRedirected(page, protectedRoute!);
  });
});
