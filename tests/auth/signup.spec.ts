import { test, expect } from '../../fixtures/test-fixtures';

test('Signup page should load @smoke @regression', async ({ signupPage }) => {
  await signupPage.expectLoaded();
});

test('Signup with empty fields should show required validations @regression', async ({ signupPage }) => {
  await signupPage.expectLoaded();
  await signupPage.submitEmptyForm();
  await signupPage.expectRequiredFieldErrors();
});

test('Signup email field should use email validation @regression', async ({ signupPage }) => {
  await signupPage.expectLoaded();
  await signupPage.emailInput.fill('invalid-email');
  await expect(signupPage.emailInput).toHaveAttribute('type', 'email');
});

test('Signup should provide role options @regression', async ({ signupPage }) => {
  await signupPage.expectLoaded();
  await signupPage.selectRole('QA Engineer');
  await expect(signupPage.roleCombobox).toContainText('QA Engineer');
});

test('Signup should show password strength for a strong password @regression', async ({ signupPage }) => {
  await signupPage.expectLoaded();
  await signupPage.passwordInput.fill('Password@123');
  await signupPage.expectPasswordStrength('Strong');
});

test('Valid signup should open email verification when enabled @signup @regression', async ({ signupPage }) => {
  const signupEmail = process.env.FETCHTAB_SIGNUP_EMAIL;
  test.skip(!signupEmail, 'Set FETCHTAB_SIGNUP_EMAIL to opt into signup verification testing.');

  await signupPage.expectLoaded();
  await signupPage.fillForm('Playwright Test User', 'QA Engineer', signupEmail!, 'Password@123');
  await signupPage.createAccountButton.click();
  await signupPage.expectVerificationDialog();
});