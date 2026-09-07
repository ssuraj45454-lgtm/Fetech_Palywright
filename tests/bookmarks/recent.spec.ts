import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Recent bookmarks module should load @smoke @regression', async ({ loginPage, recentPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await recentPage.expectLoaded();
});