import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly sidebar: Locator;
  readonly searchInput: Locator;
  readonly logoutControl: Locator;

  constructor(readonly page: Page) {
    this.sidebar = page.locator('aside, [role="navigation"]').first();
    this.searchInput = page.getByPlaceholder(/search/i).or(page.getByRole('searchbox'));
    this.logoutControl = page.getByRole('button', { name: /logout|sign out/i })
      .or(page.getByRole('menuitem', { name: /logout|sign out/i }));
  }

  async goto(): Promise<void> { await this.page.goto('/dashboard'); }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard|app/i);
    await expect(this.sidebar.or(this.page.getByText(/sales|dashboard/i).first())).toBeVisible();
  }

  async search(value: string): Promise<void> { await this.searchInput.fill(value); }

  async logout(): Promise<void> { await this.logoutControl.click(); }
}
