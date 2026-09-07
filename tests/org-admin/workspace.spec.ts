import { test, expect } from '../../fixtures/orgAdmin.fixture';
import { FeaturePage } from '../../pages/FeaturePage';

test.describe('@org-admin @regression organization workspace', () => {
  test('@smoke loads the authenticated dashboard and captures real navigation', async ({ orgAdminPage }) => {
    await orgAdminPage.goto('/dashboard'); await orgAdminPage.expectPageReady();
    expect(await orgAdminPage.discoveredNavigation()).not.toEqual([]);
  });
  for (const module of ['Organization', 'Users', 'Managers', 'Sales Reps', 'Teams', 'Billing', 'Settings']) {
    test(`opens ${module} only when exposed by current navigation`, async ({ orgAdminPage, page }) => {
      await orgAdminPage.goto('/dashboard'); const item = orgAdminPage.menuItem(new RegExp(module, 'i'));
      test.skip(await item.count() === 0, `${module} is not exposed for this configured account.`);
      const feature = new FeaturePage(page); await feature.openFromNavigation(new RegExp(module, 'i')); await feature.expectEmptyOrContent();
    });
  }
});
