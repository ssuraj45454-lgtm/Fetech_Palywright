import { test } from '../../fixtures/test-fixtures';

test('Forgot password page should load @smoke @regression', async ({ forgotPasswordPage }) => {
  await forgotPasswordPage.expectLoaded();
});