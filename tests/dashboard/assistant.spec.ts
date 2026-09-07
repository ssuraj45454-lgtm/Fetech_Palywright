import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Assistant should be visible for an authenticated user @smoke @regression', async ({ loginPage, dashboardPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await dashboardPage.expectAssistantVisible();
});