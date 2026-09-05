import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  });

  test('Dashboard should load successfully @smoke @regression', async ({ dashboardPage }) => {
    await dashboardPage.expectDashboardLoaded();
  });

  test('Search should accept text @regression', async ({ dashboardPage }) => {
    await dashboardPage.search('Google');
  });
});