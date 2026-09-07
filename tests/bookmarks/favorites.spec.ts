import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Favorites module should load @smoke @regression', async ({ loginPage, favoritesPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await favoritesPage.expectLoaded();
});