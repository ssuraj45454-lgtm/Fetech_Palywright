import { Page, Locator, expect } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class ImportPage extends ModulePage {
  readonly fileInput: Locator;
  readonly processFilesButton: Locator;

  constructor(page: Page) {
    super(page);
    this.fileInput = page.locator('#file-upload');
    this.processFilesButton = page.getByRole('button', { name: 'Process Files', exact: true });
  }

  async expectLoaded() { await this.expectModuleLoaded('/import'); }

  async uploadBookmarks(filePath: string) {
    await this.expectLoaded();
    await this.fileInput.setInputFiles(filePath);
    await expect(this.page.getByRole('heading', { name: 'Preview Files' })).toBeVisible();
    await expect(this.page.getByText(filePath.split(/[\\/]/).pop()!, { exact: true })).toBeVisible();
  }
}