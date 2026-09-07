import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Broken Links module should load @smoke @regression', async ({ loginPage, brokenLinksPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await brokenLinksPage.expectLoaded();
});