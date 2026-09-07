import { Page, Locator, expect } from '@playwright/test';

export class FolderPage {
  readonly page: Page;
  readonly addFolderButton: Locator;
  readonly folderNameInput: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addFolderButton = page.getByRole('button', { name: /add folder|new folder|create folder/i }).first();
    this.folderNameInput = page.getByLabel(/folder name|name/i);
    this.saveButton = page.getByRole('button', { name: /save|create|add/i });
  }

  async createFolder(name: string) {
    await this.page.goto('/folders');
    await expect(this.addFolderButton).toBeVisible();
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

  async deleteFolder(name: string) {
    const folderCard = this.folder(name).locator(
      'xpath=ancestor::div[contains(concat(" ", normalize-space(@class), " "), " group ")][1]'
    );
    await folderCard.hover();
    await folderCard.getByRole('button').last().click();
    await this.page.getByText(/delete|move to trash/i).last().click();
    const confirmButton = this.page.getByRole('button', { name: /delete|move to trash|confirm/i }).last();
    if (await confirmButton.isVisible()) await confirmButton.click();
    await expect(this.folder(name)).not.toBeVisible();
  }
}