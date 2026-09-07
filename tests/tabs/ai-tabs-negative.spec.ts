import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test.describe('AI Tabs negative scenarios', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  });

  test('Invalid search should show no matching tabs @negative @regression', async ({ aiTabsPage }) => {
    await aiTabsPage.goto();
    await aiTabsPage.search('ZZZ_INVALID_TAB_SEARCH_987654');
    await aiTabsPage.expectNoMatchingTabs();
  });

  test('AI Tabs should show an extension prompt when extension is unavailable @negative @regression', async ({ aiTabsPage }) => {
    await aiTabsPage.goto();
    await aiTabsPage.expectExtensionPrompt();
  });

  test('Install Extension should open the FetchTab Chrome Web Store page @regression', async ({ aiTabsPage }) => {
    await aiTabsPage.goto();
    const extensionPage = await aiTabsPage.openExtensionStore();
    await extensionPage.close();
  });
});