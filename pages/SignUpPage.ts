import { expect, Locator, Page } from '@playwright/test';

export class SignUpPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly termsCheckbox: Locator;
  readonly createOrganizationButton: Locator;
  readonly loginLink: Locator;

  constructor(readonly page: Page) {
    this.emailInput = page.getByPlaceholder('Enter your email');
    this.passwordInput = page.getByPlaceholder('Enter your password').first();
    this.confirmPasswordInput = page.getByPlaceholder('Enter your password').nth(1);
    this.termsCheckbox = page.getByRole('checkbox');
    this.createOrganizationButton = page.getByRole('button', { name: 'Create Organization' });
    this.loginLink = page.getByRole('link', { name: 'Login', exact: true });
  }

  async goto(): Promise<void> { await this.page.goto('/signup'); }

  async expectVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Build a High-Performance Sales Organization' })).toBeVisible();
    await expect(this.createOrganizationButton).toBeDisabled();
  }
}
