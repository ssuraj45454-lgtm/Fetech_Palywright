import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('My Notes module should load @smoke @regression', async ({ loginPage, notesPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await notesPage.expectLoaded();
});