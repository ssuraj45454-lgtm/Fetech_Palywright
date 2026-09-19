import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Duplicate Finder module should load and scan duplicates @smoke @regression', async ({ loginPage, duplicatesPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await duplicatesPage.expectLoaded();
  await duplicatesPage.scanDuplicates();
});

test('Duplicate Finder should keep first and delete all other @regression', async ({ loginPage, duplicatesPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await duplicatesPage.expectLoaded();
  await duplicatesPage.scanDuplicates();
  await duplicatesPage.keepFirstAndDeleteAllOther();
});