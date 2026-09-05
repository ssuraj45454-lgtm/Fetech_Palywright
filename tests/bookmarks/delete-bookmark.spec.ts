import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test.describe('Delete Bookmark', () => {
  test.beforeEach(async ({ loginPage, bookmarkPage }) => {
    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
    await bookmarkPage.addBookmark(testData.bookmark.title, testData.bookmark.url);
  });

  test('User should be able to delete bookmark @regression', async ({ bookmarkPage }) => {
    await bookmarkPage.deleteBookmark(testData.bookmark.title);
  });
});