import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Login Validation', () => {
  test('Login with empty fields @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginButton.click();
    await expect(loginPage.emailInput).toHaveAttribute('required', '');
    await expect(loginPage.passwordInput).toHaveAttribute('required', '');
  });

  test('Invalid email format @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.emailInput.fill('abc');
    await loginPage.passwordInput.fill('Password@123');
    await loginPage.loginButton.click();
    await expect(loginPage.emailInput).toHaveAttribute('type', 'email');
  });
});