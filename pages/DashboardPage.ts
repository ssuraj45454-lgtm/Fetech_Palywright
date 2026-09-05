import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly sidebar: Locator;
  readonly searchInput: Locator;
  readonly profileButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: /good morning/i });
    this.sidebar = page.locator('aside');
    this.searchInput = page.getByPlaceholder(/search/i);
    this.profileButton = page.locator('button[aria-haspopup="menu"]:has(img)');
    this.logoutButton = page.getByRole('menuitem', { name: /log ?out|sign out/i });
  }

  async goto() { await this.page.goto('/dashboard'); }

  async expectDashboardLoaded() {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.dashboardHeading).toBeVisible();
  }

  async search(value: string) { await this.searchInput.fill(value); }
  async logout() {
    await this.profileButton.click();
    await this.logoutButton.click();
  }
}