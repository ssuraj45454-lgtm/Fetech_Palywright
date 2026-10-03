import { Page, Locator, expect } from '@playwright/test';
import { typeSlowly } from '../utils/typeSlowly';

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

  async openAllBookmarks() {
    if (!(await this.addBookmarkButton.isVisible())) {
      if (!(await this.allBookmarksLink.isVisible())) {
        await this.bookmarksNavButton.click();
      }
      await this.allBookmarksLink.click();
      await expect(this.addBookmarkButton).toBeVisible();
    }
  }

  async openAddBookmark() {
    await this.openAllBookmarks();
    await this.addBookmarkButton.click();
  }

  async addBookmark(title: string, url: string) {
    await this.openAddBookmark();
    await typeSlowly(this.titleInput, title);
    await typeSlowly(this.urlInput, url);
    await this.saveButton.click();
  }

  bookmark(title: string): Locator {
    return this.page.getByRole('heading', { name: title, exact: true }).first();
  }

  async expectBookmarkVisible(title: string) {
    await expect(this.bookmark(title)).toBeVisible();
  }

  async shareBookmark(title: string) {
    const bookmarkCard = this.bookmark(title).locator(
      'xpath=ancestor::div[contains(concat(" ", normalize-space(@class), " "), " group ")][1]'
    );
    await bookmarkCard.hover();
    await bookmarkCard.getByRole('button').last().click();
    await this.page.getByRole('menuitem', { name: /^share$/i }).click();

    const shareDialog = this.page.getByRole('dialog');
    await expect(shareDialog).toBeVisible();
    if (await shareDialog.getByText(/no friends yet/i).isVisible()) {
      throw new Error('Share test requires at least one accepted friend on the test account.');
    }

    const firstFriend = shareDialog.getByRole('checkbox').first();
    await expect(firstFriend).toBeVisible();
    await firstFriend.locator('xpath=..').click();
    await shareDialog.getByRole('button', { name: /^share$/i }).click();
    await expect(shareDialog).toBeHidden();
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