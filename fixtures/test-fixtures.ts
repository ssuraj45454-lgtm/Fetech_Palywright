import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { BookmarkPage } from '../pages/BookmarkPage';
import { FolderPage } from '../pages/FolderPage';
import { AITabsPage } from '../pages/AITabsPage';
import { SharedPage } from '../pages/SharedPage';
import { IntegrationsPage } from '../pages/IntegrationsPage';
import { FriendsTeamsPage } from '../pages/FriendsTeamsPage';
import { TrashPage } from '../pages/TrashPage';
import { ImportPage } from '../pages/ImportPage';
import { VersionsPage } from '../pages/VersionsPage';
import { SettingsPage } from '../pages/SettingsPage';
import { PlanPage } from '../pages/PlanPage';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  bookmarkPage: BookmarkPage;
  folderPage: FolderPage;
  aiTabsPage: AITabsPage;
  sharedPage: SharedPage;
  integrationsPage: IntegrationsPage;
  friendsTeamsPage: FriendsTeamsPage;
  trashPage: TrashPage;
  importPage: ImportPage;
  versionsPage: VersionsPage;
  settingsPage: SettingsPage;
  planPage: PlanPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  dashboardPage: async ({ page }, use) => await use(new DashboardPage(page)),
  bookmarkPage: async ({ page }, use) => await use(new BookmarkPage(page)),
  folderPage: async ({ page }, use) => await use(new FolderPage(page)),
  aiTabsPage: async ({ page }, use) => await use(new AITabsPage(page)),
  sharedPage: async ({ page }, use) => await use(new SharedPage(page)),
  integrationsPage: async ({ page }, use) => await use(new IntegrationsPage(page)),
  friendsTeamsPage: async ({ page }, use) => await use(new FriendsTeamsPage(page)),
  trashPage: async ({ page }, use) => await use(new TrashPage(page)),
  importPage: async ({ page }, use) => await use(new ImportPage(page)),
  versionsPage: async ({ page }, use) => await use(new VersionsPage(page)),
  settingsPage: async ({ page }, use) => await use(new SettingsPage(page)),
  planPage: async ({ page }, use) => await use(new PlanPage(page))
});

export { expect };