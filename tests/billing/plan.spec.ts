import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Plans and Billing module should load @smoke @regression', async ({ loginPage, planPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await planPage.expectLoaded();
});