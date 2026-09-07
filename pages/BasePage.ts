import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly navigation: Locator;
  constructor(readonly page: Page) { this.navigation = page.locator('nav, aside, [role="navigation"]').first(); }
  async goto(path: string): Promise<void> { await this.page.goto(path); }
  async expectPageReady(): Promise<void> { await expect(this.page.locator('body')).toBeVisible(); }
  menuItem(name: string | RegExp): Locator { return this.page.getByRole('link', { name }).or(this.page.getByRole('button', { name })); }
}
