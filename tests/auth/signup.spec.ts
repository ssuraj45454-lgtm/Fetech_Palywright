import { test } from '../../fixtures/test-fixtures';

test('Signup page should load @smoke @regression', async ({ signupPage }) => {
  await signupPage.expectLoaded();
});