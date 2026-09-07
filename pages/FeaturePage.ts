import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

/** Generic feature model: routes and controls are discovered from authenticated navigation at runtime. */
export class FeaturePage extends BasePage {
  async openFromNavigation(label: string | RegExp): Promise<void> { await this.menuItem(label).first().click(); await this.expectPageReady(); }
  async expectHeading(heading: string | RegExp): Promise<void> { await expect(this.page.getByRole('heading', { name: heading }).first()).toBeVisible(); }
  async search(value: string): Promise<void> { await this.page.getByRole('searchbox').or(this.page.getByPlaceholder(/search/i)).first().fill(value); }
  async expectEmptyOrContent(): Promise<void> { await expect(this.page.locator('body')).not.toBeEmpty(); }
}
