import { test, expect } from '@playwright/test';

test.describe('@ui @regression public responsive UI', () => {
  test('login has no horizontal document overflow and exposes its primary action', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('button', { name: 'Access Dashboard' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
  });
  test('signup remains usable at the configured viewport', async ({ page }) => {
    await page.goto('/signup'); await expect(page.getByRole('heading', { name: /high-performance sales organization/i })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
  });
});
