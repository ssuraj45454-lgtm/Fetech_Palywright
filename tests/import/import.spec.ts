import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';
import path from 'path';

test('Import Bookmarks module should load @smoke @regression', async ({ loginPage, importPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await importPage.expectLoaded();
});

test('User should upload an HTML bookmarks file @smoke @regression', async ({ loginPage, importPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await importPage.uploadBookmarks(path.resolve(__dirname, 'file:///C:/Users/LENOVO/Downloads/bookmarks_600_with_notes.html'));
});

test('User should upload a local HTML bookmarks file @regression', async ({ loginPage, importPage }) => {
  const localFilePath = process.env.FETCHTAB_BOOKMARK_FILE;
  test.skip(!localFilePath, 'Set FETCHTAB_BOOKMARK_FILE to a local .html bookmarks file.');
  test.skip(!/\.html?$/i.test(localFilePath!), 'FETCHTAB_BOOKMARK_FILE must be an .html or .htm file.');

  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await importPage.uploadBookmarks(path.resolve(localFilePath!));
});