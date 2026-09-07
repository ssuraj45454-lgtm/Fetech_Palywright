import { Page, expect } from '@playwright/test';

export class ModulePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectModuleLoaded(route: string) {
    await this.page.goto(route);
    await expect(this.page).toHaveURL(new RegExp(`${route.replace('/', '\\/')}$`));
    await expect(this.page.getByRole('main').first()).toBeVisible();
  }
}