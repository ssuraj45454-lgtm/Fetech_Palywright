import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AppShellPage extends BasePage {
  constructor(page: Page) { super(page); }
  async discoveredNavigation(): Promise<{ label: string; href: string | null }[]> {
    return this.page.locator('nav a, aside a, [role="navigation"] a').evaluateAll(links => links.map(link => ({ label: (link.textContent ?? '').trim(), href: link.getAttribute('href') })).filter(item => item.label));
  }
  async logout(): Promise<void> { await this.menuItem(/logout|sign out/i).first().click(); }
}
