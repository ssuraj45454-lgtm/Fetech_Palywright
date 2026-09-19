import { Page, Locator, expect } from '@playwright/test';
import { typeSlowly } from '../utils/typeSlowly';

export class SignupPage {
  readonly fullNameInput: Locator;
  readonly roleCombobox: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly createAccountButton: Locator;

  constructor(readonly page: Page) {
    this.fullNameInput = page.getByRole('textbox', { name: /full name/i }).first();
    this.roleCombobox = page.getByRole('combobox').first();
    this.emailInput = page.getByRole('textbox', { name: /email/i }).first();
    this.passwordInput = page.getByRole('textbox', { name: /password/i }).first();
    this.createAccountButton = page.getByRole('button', { name: /create account|sign up/i }).first();
  }

  async expectLoaded() {
    await this.page.goto('/signup', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/\/signup$/);
    await expect(this.page.getByRole('heading', { name: /create an account|sign up/i }).first()).toBeVisible();
  }

  async submitEmptyForm() {
    await this.createAccountButton.click();
  }

  async selectRole(role: string) {
    await this.roleCombobox.waitFor({ state: 'visible', timeout: 15000 });

    const nativeSelect = this.page.locator('select').filter({ has: this.page.locator('option') }).first();
    if (await nativeSelect.count()) {
      await nativeSelect.selectOption({ label: role });
      return;
    }

    await this.roleCombobox.click();
    const option = this.page.getByRole('option', { name: new RegExp(role, 'i') }).first();
    await expect(option).toBeVisible({ timeout: 15000 });
    await option.click();
  }

  async fillForm(fullName: string, role: string, email: string, password: string) {
    await typeSlowly(this.fullNameInput, fullName);
    await this.selectRole(role);
    await typeSlowly(this.emailInput, email);
    await typeSlowly(this.passwordInput, password);
  }

  async submitForm(fullName: string, role: string, email: string, password: string) {
    await this.fillForm(fullName, role, email, password);
    await this.createAccountButton.click();
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