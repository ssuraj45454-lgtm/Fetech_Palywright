import { Page, Locator, expect } from '@playwright/test';

export class BookmarkPage {
  readonly page: Page;
  readonly addBookmarkButton: Locator;
  readonly titleInput: Locator;
  readonly urlInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addBookmarkButton = page.getByRole('button', { name: /add bookmark|new bookmark/i });
    this.titleInput = page.getByLabel(/title|bookmark name/i);
    this.urlInput = page.getByLabel(/url|link/i);
    this.saveButton = page.getByRole('button', { name: /save|add/i });
  }

  async openAddBookmark() { await this.addBookmarkButton.click(); }

  async addBookmark(title: string, url: string) {
    await this.openAddBookmark();
    await this.titleInput.fill(title);
    await this.urlInput.fill(url);
    await this.saveButton.click();
  }

  bookmark(title: string): Locator {
    return this.page.getByText(title, { exact: true });
  }

  async expectBookmarkVisible(title: string) {
    await expect(this.bookmark(title)).toBeVisible();
  }

  async deleteBookmark(title: string) {
    await this.bookmark(title).click();
    await this.page.getByRole('button', { name: /delete/i }).click();
    const confirmButton = this.page.getByRole('button', { name: /delete|confirm/i });
    if (await confirmButton.isVisible()) await confirmButton.click();
  }
}