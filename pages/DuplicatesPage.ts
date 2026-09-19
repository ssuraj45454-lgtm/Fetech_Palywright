import { Locator, Page, expect } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class DuplicatesPage extends ModulePage {
  readonly scanButton: Locator;
  readonly keepFirstButton: Locator;
  readonly deleteAllOtherButton: Locator;
  readonly bulkActionButton: Locator;

  constructor(page: Page) {
    super(page);
    this.scanButton = page.getByRole('button', { name: /scan|find duplicates|check duplicates|verify duplicates/i }).first();
    this.keepFirstButton = page.getByRole('button', { name: /keep first/i }).first();
    this.deleteAllOtherButton = page.getByRole('button', { name: /delete all other|delete others/i }).first();
    this.bulkActionButton = page.getByRole('button', { name: /keep first.*delete all others|keep first, delete others/i }).first();
  }

  async expectLoaded() { await this.expectModuleLoaded('/bookmarks/duplicates'); }

  async scanDuplicates() {
    if (await this.bulkActionButton.isVisible().catch(() => false)) {
      return;
    }

    if (await this.scanButton.isVisible().catch(() => false)) {
      await this.scanButton.click();
      return;
    }
  }

  async keepFirstAndDeleteAllOther() {
    const emptyState = this.page.getByText(/no duplicate|nothing to merge|no duplicates|no duplicate records/i);
    if (await emptyState.isVisible().catch(() => false)) {
      return;
    }

    const bulkAction = this.page.getByRole('button', { name: /keep first.*delete all others|keep first, delete others/i }).first();
    if (await bulkAction.isVisible().catch(() => false)) {
      await bulkAction.click();

      const confirmDialog = this.page.getByRole('dialog', { name: /keep first in every group/i }).first();
      const confirmButton = confirmDialog.getByRole('button', { name: /keep first.*delete all others|keep first, delete others|keep first.*delete/i }).first();

      await expect(confirmDialog).toBeVisible({ timeout: 20000 });
      await expect(confirmButton).toBeVisible({ timeout: 20000 });
      await confirmButton.click();
      return;
    }

    await expect(this.keepFirstButton).toBeVisible({ timeout: 20000 });
    await this.keepFirstButton.click();

    await expect(this.deleteAllOtherButton).toBeVisible({ timeout: 20000 });
    await this.deleteAllOtherButton.click();
  }
}