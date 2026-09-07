import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;

  constructor(readonly page: Page) {
    this.emailInput = page.getByPlaceholder('Enter your email');
    this.passwordInput = page.getByPlaceholder('Enter your password');
    this.signInButton = page.getByRole('button', { name: 'Access Dashboard', exact: true });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
    this.signUpLink = page.getByRole('link', { name: 'Create Account', exact: true });
  }

  async goto(): Promise<void> { await this.page.goto('/login'); }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async expectVisible(): Promise<void> {
    await expect(this.page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async expectInvalidCredentials(): Promise<void> {
    await expect(this.page).toHaveURL(/login/);
  }
}
