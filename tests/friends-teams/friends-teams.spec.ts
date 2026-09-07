import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Friends and Teams module should load @smoke @regression', async ({ loginPage, friendsTeamsPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await friendsTeamsPage.expectLoaded();
});