import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('User should logout successfully @smoke @regression', async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await dashboardPage.logout();
  await loginPage.expectLoginPage();
});