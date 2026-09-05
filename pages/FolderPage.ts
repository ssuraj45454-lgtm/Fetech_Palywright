import { Page, Locator, expect } from '@playwright/test';

export class FolderPage {
  readonly page: Page;
  readonly addFolderButton: Locator;
  readonly folderNameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addFolderButton = page.getByRole('button', { name: /add folder|new folder|create folder/i });
    this.folderNameInput = page.getByLabel(/folder name|name/i);
    this.saveButton = page.getByRole('button', { name: /save|create|add/i });
  }

  async createFolder(name: string) {
    await this.addFolderButton.click();
    await this.folderNameInput.fill(name);
    await this.saveButton.click();
  }

  folder(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }

  async expectFolderVisible(name: string) {
    await expect(this.folder(name)).toBeVisible();
  }
}