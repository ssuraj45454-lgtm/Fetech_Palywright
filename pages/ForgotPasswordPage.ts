import { Page, Locator, expect } from '@playwright/test';

export class ForgotPasswordPage {
  readonly emailInput: Locator;
  readonly recoveryButton: Locator;

  constructor(readonly page: Page) {
    this.emailInput = page.getByRole('textbox', { name: 'Email Address' });
    this.recoveryButton = page.getByRole('button', { name: 'Send recovery link', exact: true });
  }

  async expectLoaded() {
    await this.page.goto('/forgot-password');
    await expect(this.page).toHaveURL(/\/forgot-password$/);
    await expect(this.page.getByRole('heading', { name: /forgot password/i })).toBeVisible();
  }

  async requestRecovery(email: string) {
    await this.emailInput.fill(email);
    await this.recoveryButton.click();
  }

  async expectRecoverySent(email: string) {
    await expect(this.page.getByRole('heading', { name: 'Check your email' })).toBeVisible();
    await expect(this.page.locator('p').filter({ hasText: new RegExp(`If an account exists for ${email}.*recovery link has been sent`, 'i') })).toBeVisible();
  }
}