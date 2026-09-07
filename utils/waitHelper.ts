import { Page, expect } from '@playwright/test';

export async function waitForAppIdle(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await expect(page.locator('body')).not.toBeEmpty();
}
