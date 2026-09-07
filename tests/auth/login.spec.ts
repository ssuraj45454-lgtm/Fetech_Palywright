import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('@auth @smoke Login', () => {
  test('renders the verified login controls', async ({ page }) => {
    const login = new LoginPage(page); await login.goto(); await login.expectVisible();
    await expect(login.emailInput).toHaveAttribute('type', 'email');
    await expect(login.passwordInput).toHaveAttribute('type', 'password');
  });
  test('@negative rejects an empty form without entering the workspace', async ({ page }) => {
    const login = new LoginPage(page); await login.goto(); await login.signInButton.click();
    await expect(page).toHaveURL(/login/);
  });
  test('@negative keeps invalid credentials outside the dashboard', async ({ page }) => {
    const login = new LoginPage(page); await login.goto(); await login.login('invalid-playwright-user@example.test', 'InvalidPassword!42');
    await expect(page).toHaveURL(/login/);
  });
  test('links to verified recovery and account-creation routes', async ({ page }) => {
    const login = new LoginPage(page); await login.goto();
    await expect(login.forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
    await expect(login.signUpLink).toHaveAttribute('href', '/signup');
  });
});
