import { Page, Locator, expect } from '@playwright/test';

export class SignupPage {
  readonly fullNameInput: Locator;
  readonly roleCombobox: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly createAccountButton: Locator;

  constructor(readonly page: Page) {
    this.fullNameInput = page.getByRole('textbox', { name: 'Full name *' });
    this.roleCombobox = page.getByRole('combobox').first();
    this.emailInput = page.getByRole('textbox', { name: 'Email *' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password *' });
    this.createAccountButton = page.getByRole('button', { name: 'Create account', exact: true });
  }

  async expectLoaded() {
    await this.page.goto('/signup');
    await expect(this.page).toHaveURL(/\/signup$/);
    await expect(this.page.getByRole('heading', { name: /create an account/i })).toBeVisible();
  }

  async submitEmptyForm() {
    await this.createAccountButton.click();
  }

  async selectRole(role: string) {
    await this.roleCombobox.click();
    await this.page.getByRole('option', { name: role, exact: true }).click();
  }

  async fillForm(fullName: string, role: string, email: string, password: string) {
    await this.fullNameInput.fill(fullName);
    await this.selectRole(role);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async expectRequiredFieldErrors() {
    await expect(this.page.getByText('Full name is required.', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Please select your role.', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Email is required.', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Password is required.', { exact: true })).toBeVisible();
  }

  async expectPasswordStrength(label: string) {
    await expect(this.page.getByText('Password strength', { exact: true })).toBeVisible();
    await expect(this.page.getByText(label, { exact: true })).toBeVisible();
  }

  async expectVerificationDialog() {
    await expect(this.page.getByRole('dialog', { name: 'Verify your email' })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Verification code' })).toBeVisible();
  }
}