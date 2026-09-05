import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signupLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: /email/i });
    this.passwordInput = page.getByLabel(/password/i);
    this.loginButton = page.getByRole('button', { name: 'Sign in', exact: true });
    this.forgotPasswordLink = page.getByRole('link', { name: /forgot password/i });
    this.signupLink = page.getByRole('link', { name: /sign up|create account/i });
  }

  async goto() { await this.page.goto('/login'); }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAndWaitForDashboard(email: string, password: string) {
    await this.login(email, password);
    await this.page.waitForURL(/dashboard/);
  }

  async expectLoginPage() {
    await expect(this.loginButton).toBeVisible();
  }

  async expectInvalidLoginMessage() {
    await expect(this.page.getByText('Invalid credentials or account deleted', { exact: true })).toBeVisible();
  }
}