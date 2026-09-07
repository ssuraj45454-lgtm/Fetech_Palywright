import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Feedback and Feature Requests module should load @smoke @regression', async ({ loginPage, feedbackPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await feedbackPage.expectLoaded();
});