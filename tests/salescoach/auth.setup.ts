import { test as setup } from '@playwright/test';
import { credentials } from '../../data/test-data';
import { LoginPage } from '../../pages/LoginPage';
import { hasTestCredentials } from '../../utils/environment';

setup('create authenticated storage state when credentials are configured', async ({ page }) => {
  const loginPage = new LoginPage(page);
  if (hasTestCredentials()) {
    await loginPage.goto();
    await loginPage.login(credentials.email, credentials.password);
    await page.waitForURL(/dashboard|app/i);
  }
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
