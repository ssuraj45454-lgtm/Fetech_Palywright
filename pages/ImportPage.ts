import { Page, Locator, expect } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class ImportPage extends ModulePage {
  readonly fileInput: Locator;
  readonly processFilesButton: Locator;
  readonly viewAllBookmarksButton: Locator;

  constructor(page: Page) {
    super(page);
    this.fileInput = page.locator('#file-upload');
    this.processFilesButton = page.getByRole('button', { name: 'Process Files', exact: true });
    this.viewAllBookmarksButton = page.getByRole('button', { name: 'View All Bookmarks', exact: true });
  }

  async expectLoaded() { await this.expectModuleLoaded('/import'); }

  async uploadBookmarks(filePath: string) {
    await this.expectLoaded();
    await this.fileInput.setInputFiles(filePath);
    await expect(this.page.getByRole('heading', { name: 'Preview Files' })).toBeVisible();
    await expect(this.page.getByText(filePath.split(/[\\/]/).pop()!, { exact: true })).toBeVisible();
  }

  async processUploadedFile() {
    await this.processFilesButton.click();
    await expect(this.page.getByRole('heading', { name: 'Import Complete' })).toBeVisible({ timeout: 30_000 });
    await expect(this.page.getByText(/Processed \d+ items/i)).toBeVisible();
  }

  async viewAllBookmarks() {
    await this.viewAllBookmarksButton.click();
    await expect(this.page).toHaveURL(/\/bookmarks$/);
    await expect(this.page.getByRole('heading', { name: 'All Bookmarks', exact: true })).toBeVisible();
  }
}