import { test as setup } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { hasCredentials, Role, testUsers } from '../../config/testUsers';

export function roleStorageState(role: Role, path: string): void {
  setup(`authenticate ${role} when credentials are configured`, async ({ page }) => {
    if (hasCredentials(role)) {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(testUsers[role].email, testUsers[role].password);
      await page.waitForURL(/dashboard|app/i);
    }
    await page.context().storageState({ path });
  });
}
