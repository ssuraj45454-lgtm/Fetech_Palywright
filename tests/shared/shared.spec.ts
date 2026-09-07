import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Shared module should load @smoke @regression', async ({ loginPage, sharedPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await sharedPage.expectLoaded();
});