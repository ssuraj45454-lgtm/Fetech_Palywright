import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Versions module should load @smoke @regression', async ({ loginPage, versionsPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await versionsPage.expectLoaded();
});