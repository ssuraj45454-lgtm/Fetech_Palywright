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

  test('User should be able to add a bookmark note and see it in Notes @regression', async ({
    bookmarkPage,
    notesPage
  }) => {
    const bookmarkTitle = `Notes test bookmark ${Date.now()}`;
    const note = `Notes test note ${Date.now()}`;

    await bookmarkPage.addBookmark(bookmarkTitle, testData.bookmark.url);
    await bookmarkPage.addNoteToBookmark(bookmarkTitle, note);
    await notesPage.expectLoaded();
    await notesPage.expectNoteVisible(note);
  });
});