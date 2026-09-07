import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Import Bookmarks module should load @smoke @regression', async ({ loginPage, importPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await importPage.expectLoaded();
});