import { Locator, Page, expect } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class SettingsPage extends ModulePage {
  readonly deleteAccountButton: Locator;
  readonly deleteConfirmationHeading: Locator;
  readonly cancelDeleteButton: Locator;

  constructor(page: Page) {
    super(page);
    this.deleteAccountButton = page.getByRole('button', { name: 'Delete Account', exact: true }).first();
    this.deleteConfirmationHeading = page.getByText('Are you absolutely sure?', { exact: true });
    this.cancelDeleteButton = page.getByRole('button', { name: 'Cancel', exact: true });
  }

  async expectLoaded() { await this.expectModuleLoaded('/settings'); }

  async openDeleteAccountConfirmation() {
    await this.deleteAccountButton.click();
    await expect(this.deleteConfirmationHeading).toBeVisible();
  }

  async expectDeleteAccountConfirmation() {
    await expect(this.page.getByText(/account and all associated data will be soft-deleted/i)).toBeVisible();
    await expect(this.page.getByText(/30-day grace period/i)).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Delete Account', exact: true }).last()).toBeVisible();
  }

  async cancelDeleteAccount() {
    await this.cancelDeleteButton.click();
    await expect(this.deleteConfirmationHeading).toBeHidden();
    await expect(this.deleteAccountButton).toBeVisible();
  }

  async confirmDeleteAccount() {
    await this.page.getByRole('button', { name: 'Delete Account', exact: true }).last().click();
  }
}