import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test.describe('AI Tabs extension import', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  });

  test('Installed extension should receive the Import Tabs request @extension @regression', async ({ aiTabsPage }) => {
    await aiTabsPage.gotoWithExtension();
    await aiTabsPage.expectImportRequest();
  });
});