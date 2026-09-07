import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Trash module should load @smoke @regression', async ({ loginPage, trashPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await trashPage.expectLoaded();
});