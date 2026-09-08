import { test as setup } from '@playwright/test';
import { fetchTabUser, hasFetchTabCredentials } from '../../config/fetchtabUser';

setup('authenticate FetchTab test user', async ({ page, context }) => {
  setup.skip(!hasFetchTabCredentials(), 'Set FETCHTAB_EMAIL and FETCHTAB_PASSWORD in .env to run authenticated module checks.');

  await page.goto('/login');
  await page.getByLabel(/^Email \*$/).fill(fetchTabUser.email);
  await page.getByLabel(/^Password \*$/).fill(fetchTabUser.password);
  await page.getByRole('button', { name: /^Sign in$/ }).click();
  await page.waitForURL(/dashboard|app|bookmarks|tabs/i);
  await context.storageState({ path: 'auth/fetchtab.json' });
});
