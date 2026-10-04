import { test } from '../../fixtures/test-fixtures';
import { testData } from '../../data/test-data';

test.describe('Account Deletion', () => {
  test.beforeEach(async ({ loginPage, settingsPage }) => {
    await loginPage.goto();
    await loginPage.loginAndWaitForDashboard(testData.validUser.email, testData.validUser.password);
    await settingsPage.expectLoaded();
  });

  test('Delete Account should show its confirmation and recovery details @regression', async ({ settingsPage }) => {
    await settingsPage.openDeleteAccountConfirmation();
    await settingsPage.expectDeleteAccountConfirmation();
  });

  test('Cancel should close the Delete Account confirmation without deleting the account @regression', async ({ settingsPage }) => {
    await settingsPage.openDeleteAccountConfirmation();
    await settingsPage.cancelDeleteAccount();
  });

  test('Confirm should delete the account @destructive', async ({ settingsPage, loginPage }) => {
    // test.skip(
    //   process.env.FETCHTAB_ALLOW_ACCOUNT_DELETION !== 'true',
    //   'Set FETCHTAB_ALLOW_ACCOUNT_DELETION=true only when the configured test account is safe to delete.'
    // );

    await settingsPage.openDeleteAccountConfirmation();
    await settingsPage.confirmDeleteAccount();
    await loginPage.expectLoginPage();
  });
});
