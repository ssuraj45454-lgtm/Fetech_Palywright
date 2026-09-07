import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Integrations module should load @smoke @regression', async ({ loginPage, integrationsPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await integrationsPage.expectLoaded();
});