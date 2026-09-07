import { Page, expect } from '@playwright/test';

export class SignupPage {
  constructor(readonly page: Page) {}

  async expectLoaded() {
    await this.page.goto('/signup');
    await expect(this.page).toHaveURL(/\/signup$/);
    await expect(this.page.getByRole('heading', { name: /create an account/i })).toBeVisible();
  }
}