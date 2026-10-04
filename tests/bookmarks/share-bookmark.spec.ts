import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test.describe('Share Bookmark', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
  });

  test('Shared bookmark should appear in Sent @regression', async ({ bookmarkPage, sharedPage }) => {
    const bookmarkTitle = 'Bookmark 522';
    await bookmarkPage.openAllBookmarks();
    await bookmarkPage.expectBookmarkVisible(bookmarkTitle);
    await bookmarkPage.shareBookmark(bookmarkTitle, testData.shareRecipientEmail);

    await sharedPage.expectLoaded();
    await sharedPage.openSentTab();
    await sharedPage.expectSentBookmark(bookmarkTitle);
  });
});
