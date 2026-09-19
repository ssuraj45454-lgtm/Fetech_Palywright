import { test, expect } from '../../fixtures/test-fixtures';
import { typeSlowly } from '../../utils/typeSlowly';

test.describe('Login Validation', () => {
  test('Login with empty fields @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginButton.click();
    await expect(loginPage.emailInput).toHaveAttribute('required', '');
    await expect(loginPage.passwordInput).toHaveAttribute('required', '');
  });

  test('Login with empty email should be blocked @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await typeSlowly(loginPage.passwordInput, 'Password@123');
    await loginPage.loginButton.click();
    await expect(loginPage.emailInput).toHaveAttribute('required', '');
  });

  test('Login with empty password should be blocked @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await typeSlowly(loginPage.emailInput, 'user@example.com');
    await loginPage.loginButton.click();
    await expect(loginPage.passwordInput).toHaveAttribute('required', '');
  });

  test('Invalid email format @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await typeSlowly(loginPage.emailInput, 'abc');
    await typeSlowly(loginPage.passwordInput, 'Password@123');
    await loginPage.loginButton.click();
    await expect(loginPage.emailInput).toHaveAttribute('type', 'email');
  });

});