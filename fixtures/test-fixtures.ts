import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { BookmarkPage } from '../pages/BookmarkPage';
import { FolderPage } from '../pages/FolderPage';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  bookmarkPage: BookmarkPage;
  folderPage: FolderPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => await use(new DashboardPage(page)),
  bookmarkPage: async ({ page }, use) => await use(new BookmarkPage(page)),
  folderPage: async ({ page }, use) => await use(new FolderPage(page))
});

export { expect };