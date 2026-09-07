import { Page, expect } from '@playwright/test';

export class ForgotPasswordPage {
  constructor(readonly page: Page) {}

  async expectLoaded() {
    await this.page.goto('/forgot-password');
    await expect(this.page).toHaveURL(/\/forgot-password$/);
    await expect(this.page.getByRole('heading', { name: /forgot password/i })).toBeVisible();
  }
}