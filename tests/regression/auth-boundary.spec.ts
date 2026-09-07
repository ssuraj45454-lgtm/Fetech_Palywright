import { test, expect } from '@playwright/test';

test.describe('@regression @auth authentication boundaries', () => {
  test('Google sign-in is offered without attempting an external authentication flow', async ({ page }) => {
    await page.goto('/login'); await expect(page.getByRole('button', { name: 'Continue with Google' })).toBeVisible();
  });
  test('recovery route presents a labelled email control', async ({ page }) => {
    await page.goto('/forgot-password'); await expect(page.getByPlaceholder('Enter your email')).toHaveAttribute('type', 'email');
  });
});
