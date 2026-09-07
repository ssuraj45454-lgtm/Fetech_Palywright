import { expect, test } from '../../fixtures/test-fixtures';

test.describe('SalesCoach organization signup', () => {
  test('requires accepting terms before organization creation @smoke', async ({ signUpPage }) => {
    await signUpPage.goto();
    await signUpPage.expectVisible();
    await expect(signUpPage.termsCheckbox).not.toBeChecked();
  });

  test('enables organization creation after valid client-side input @regression', async ({ signUpPage }) => {
    await signUpPage.goto();
    await signUpPage.emailInput.fill('playwright.validation@example.com');
    await signUpPage.passwordInput.fill('SecurePassword!42');
    await signUpPage.confirmPasswordInput.fill('SecurePassword!42');
    await signUpPage.termsCheckbox.check();
    await expect(signUpPage.createOrganizationButton).toBeEnabled();
  });

  test('returns to login without creating an account @regression', async ({ signUpPage, loginPage }) => {
    await signUpPage.goto();
    await signUpPage.loginLink.click();
    await loginPage.expectVisible();
  });
});
