import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Settings module should load @smoke @regression', async ({ loginPage, settingsPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await settingsPage.expectLoaded();
});