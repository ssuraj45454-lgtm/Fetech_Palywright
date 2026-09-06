import { Page, Locator, expect } from '@playwright/test';

export class BookmarkPage {
  readonly page: Page;
  readonly bookmarksNavButton: Locator;
  readonly allBookmarksLink: Locator;
  readonly addBookmarkButton: Locator;
  readonly titleInput: Locator;
  readonly urlInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookmarksNavButton = page.getByRole('button', { name: /^Bookmarks(?:\s|$)/i });
    this.allBookmarksLink = page.getByRole('link', { name: /all bookmarks/i });
    this.addBookmarkButton = page.getByRole('button', { name: /^add(?: bookmark)?$|^new bookmark$/i });
    this.titleInput = page.getByLabel(/title|bookmark name/i);
    this.urlInput = page.getByLabel(/url|link/i);
    this.saveButton = page.getByRole('button', { name: /save|add/i });
  }

  async openAddBookmark() {
    if (!(await this.addBookmarkButton.isVisible())) {
      if (!(await this.allBookmarksLink.isVisible())) {
        await this.bookmarksNavButton.click();
      }
      await this.allBookmarksLink.click();
      await expect(this.addBookmarkButton).toBeVisible();
    }
    await this.addBookmarkButton.click();
  }

  async addBookmark(title: string, url: string) {
    await this.openAddBookmark();
    await this.titleInput.fill(title);
    await this.urlInput.fill(url);
    await this.saveButton.click();
  }

  bookmark(title: string): Locator {
    return this.page.getByRole('heading', { name: title, exact: true }).first();
  }

  async expectBookmarkVisible(title: string) {
    await expect(this.bookmark(title)).toBeVisible();
  }

  async deleteBookmark(title: string) {
    const bookmarkCard = this.bookmark(title).locator(
      'xpath=ancestor::div[contains(concat(" ", normalize-space(@class), " "), " group ")][1]'
    );
    await bookmarkCard.hover();
    await bookmarkCard.getByRole('button').last().click();
    await this.page.getByText('Move to trash', { exact: true }).click();
    const confirmButton = this.page.getByRole('button', { name: /move to trash|delete|confirm/i }).last();
    if (await confirmButton.isVisible()) await confirmButton.click();
  }
}