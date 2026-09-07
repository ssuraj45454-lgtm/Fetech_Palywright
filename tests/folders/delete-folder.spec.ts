import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test.describe('Folder Deletion', () => {
  test('User should delete a folder @regression', async ({ loginPage, folderPage }) => {
    const folderName = `Automation Delete Folder ${Date.now()}`;

    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
    await folderPage.createFolder(folderName);
    await folderPage.expectFolderVisible(folderName);
    await folderPage.deleteFolder(folderName);
  });
});