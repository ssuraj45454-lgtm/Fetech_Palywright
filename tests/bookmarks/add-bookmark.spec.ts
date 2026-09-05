import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test.describe('Bookmark Management', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  });

  test('User should be able to add bookmark @smoke @regression', async ({ bookmarkPage }) => {
    await bookmarkPage.addBookmark(testData.bookmark.title, testData.bookmark.url);
    await bookmarkPage.expectBookmarkVisible(testData.bookmark.title);
  });
});