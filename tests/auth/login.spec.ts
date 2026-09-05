import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test.describe('FetchTab Login', () => {
  test('Valid user should login successfully @smoke @regression', async ({ loginPage, dashboardPage }) => {
    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
    await dashboardPage.expectDashboardLoaded();
  });

  test('Invalid credentials should not login @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
    await loginPage.expectInvalidLoginMessage();
  });
});