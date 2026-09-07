import { expect, test } from '../../fixtures/test-fixtures';

test.describe('SalesCoach public authentication journeys', () => {
  test('renders the login form and its primary paths @smoke', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.expectVisible();
    await expect(loginPage.emailInput).toHaveAttribute('type', 'email');
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
    await expect(loginPage.forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
    await expect(loginPage.signUpLink).toHaveAttribute('href', '/signup');
  });

  test('does not leave login when submitted with empty credentials @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.signInButton.click();
    await expect(loginPage.page).toHaveURL(/login/);
  });

  test('keeps invalid users out of the dashboard @regression', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalid-playwright-user@example.com', 'NotTheRightPassword!42');
    await loginPage.expectInvalidCredentials();
  });

  test('opens the password recovery page @smoke', async ({ loginPage, forgotPasswordPage }) => {
    await loginPage.goto();
    await loginPage.forgotPasswordLink.click();
    await forgotPasswordPage.expectVisible();
  });

  test('opens the organization creation page @smoke', async ({ loginPage, signUpPage }) => {
    await loginPage.goto();
    await loginPage.signUpLink.click();
    await signUpPage.expectVisible();
  });
});
