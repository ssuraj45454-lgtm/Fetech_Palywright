import { test } from '../../fixtures/test-fixtures';
import { credentialsMessage, hasTestCredentials } from '../../utils/environment';

test.describe('SalesCoach authenticated workspace', () => {
  test('loads the dashboard for the dedicated test user @smoke', async ({ dashboardPage }) => {
    test.skip(!hasTestCredentials(), credentialsMessage);
    await dashboardPage.goto();
    await dashboardPage.expectLoaded();
  });
});
