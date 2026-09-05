import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test.describe('Folder Management', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  });

  test('User should create a folder @smoke @regression', async ({ folderPage }) => {
    const folderName = `Automation Folder ${Date.now()}`;
    await folderPage.createFolder(folderName);
    await folderPage.expectFolderVisible(folderName);
  });
});