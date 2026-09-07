import { test as base } from '@playwright/test';
import { AppShellPage } from '../pages/AppShellPage';
import { hasCredentials } from '../config/testUsers';

type AuthFixtures = { orgAdminPage: AppShellPage; managerPage: AppShellPage; salesRepPage: AppShellPage };
export const test = base.extend<AuthFixtures>({
  orgAdminPage: async ({ page }, use, testInfo) => { testInfo.skip(!hasCredentials('orgAdmin'), 'ORG_ADMIN_EMAIL and ORG_ADMIN_PASSWORD are required.'); await use(new AppShellPage(page)); },
  managerPage: async ({ page }, use, testInfo) => { testInfo.skip(!hasCredentials('manager'), 'MANAGER_EMAIL and MANAGER_PASSWORD are required.'); await use(new AppShellPage(page)); },
  salesRepPage: async ({ page }, use, testInfo) => { testInfo.skip(!hasCredentials('salesRep'), 'SALES_REP_EMAIL and SALES_REP_PASSWORD are required.'); await use(new AppShellPage(page)); },
});
export { expect } from '@playwright/test';
