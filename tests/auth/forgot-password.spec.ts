import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test('Forgot password page should load @smoke @regression', async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.expectLoaded();
});

test('User should request a password recovery link @regression', async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.expectLoaded();
  await forgotPasswordPage.requestRecovery(testData.validUser.email);
  await forgotPasswordPage.expectRecoverySent(testData.validUser.email);
});