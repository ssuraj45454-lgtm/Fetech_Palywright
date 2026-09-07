import { expect, Locator, Page } from '@playwright/test';

export class ForgotPasswordPage {
  readonly emailInput: Locator;

  constructor(readonly page: Page) {
    this.emailInput = page.getByPlaceholder('Enter your email');
  }

  async goto(): Promise<void> { await this.page.goto('/forgot-password'); }

  async expectVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Forgot Password?' })).toBeVisible();
    await expect(this.emailInput).toHaveAttribute('type', 'email');
  }
}
