import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Duplicate Finder module should load @smoke @regression', async ({ loginPage, duplicatesPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await duplicatesPage.expectLoaded();
});