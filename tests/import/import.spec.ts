import { test, expect } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';
import fs from 'fs';
import path from 'path';

const defaultBookmarkFile = path.resolve(__dirname, '../../data/bookmarks_100_15_folders.html');
const getBookmarkFilePath = () => {
  const envPath = process.env.FETCHTAB_BOOKMARK_FILE;
  if (envPath) {
    return path.resolve(envPath);
  }
  return defaultBookmarkFile;
};

test('Import Bookmarks module should load @smoke @regression', async ({ loginPage, importPage }) => {
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await importPage.expectLoaded();
});

test('User should upload an HTML bookmarks file @smoke @regression', async ({ loginPage, importPage }) => {
  const filePath = getBookmarkFilePath();
  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await importPage.uploadBookmarks(filePath);
});

test('User should upload a local HTML bookmarks file @regression', async ({ loginPage, importPage }) => {
  const localFilePath = getBookmarkFilePath();
  test.skip(!/\.html?$/i.test(localFilePath), 'Bookmark file must be an .html or .htm file.');

  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await importPage.uploadBookmarks(localFilePath);
});

test('User should upload and process local bookmarks file @smoke @regression', async ({ loginPage, importPage }) => {
  const localFilePath = getBookmarkFilePath();
  expect(fs.existsSync(localFilePath), `Bookmark file not found: ${localFilePath}`).toBeTruthy();

  await loginPage.goto();
  await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  await importPage.uploadBookmarks(localFilePath);
  await importPage.processUploadedFile();
  await importPage.viewAllBookmarks();
});