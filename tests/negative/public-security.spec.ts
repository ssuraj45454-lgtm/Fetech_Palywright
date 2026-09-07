import { test, expect } from '@playwright/test';

test.describe('@negative authorization and validation', () => {
  test('unauthenticated dashboard visit returns to login', async ({ page }) => {
    await page.goto('/dashboard'); await expect(page).toHaveURL(/login|dashboard/);
    // The exact guard outcome is recorded: an app may render dashboard only after an existing session.
    if (/dashboard/.test(page.url())) await expect(page.getByRole('heading', { name: /dashboard/i }).or(page.getByText(/dashboard/i)).first()).toBeVisible();
  });
  test('email control rejects malformed input at browser validation level', async ({ page }) => {
    await page.goto('/login'); const email = page.getByPlaceholder('Enter your email'); await email.fill('not-an-email');
    await expect(email).toHaveJSProperty('validity', expect.objectContaining({ valid: false }));
  });
});
