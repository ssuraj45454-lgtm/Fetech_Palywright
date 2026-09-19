import { Locator, Page, expect } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class BrokenLinksPage extends ModulePage {
  readonly scanButton: Locator;

  constructor(page: Page) {
    super(page);
    this.scanButton = page.getByRole('button', { name: /scan|check broken links|verify links/i });
  }

  async expectLoaded() { await this.expectModuleLoaded('/bookmarks/broken-links'); }

  async scanBrokenLinks() {
    await expect(this.scanButton).toBeVisible();
    await this.scanButton.click();
  }
}