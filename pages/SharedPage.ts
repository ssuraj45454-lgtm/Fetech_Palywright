import { Page, expect } from '@playwright/test';
import { ModulePage } from './ModulePage';

export class SharedPage extends ModulePage {
  constructor(page: Page) { super(page); }
  async expectLoaded() { await this.expectModuleLoaded('/shared'); }

  async openSentTab() {
    const sentTab = this.page.getByRole('tab', { name: /sent/i });
    if (await sentTab.isVisible()) {
      await sentTab.click();
      return;
    }
    await this.page.getByRole('button', { name: /sent/i }).click();
  }

  async expectSentBookmark(title: string) {
    await expect(this.page.getByRole('heading', { name: title, exact: true }).first()).toBeVisible();
  }
}