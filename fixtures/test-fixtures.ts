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
import { FavoritesPage } from '../pages/FavoritesPage';
import { RecentPage } from '../pages/RecentPage';
import { NotesPage } from '../pages/NotesPage';
import { DuplicatesPage } from '../pages/DuplicatesPage';
import { BrokenLinksPage } from '../pages/BrokenLinksPage';
import { SignupPage } from '../pages/SignupPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { FeedbackPage } from '../pages/FeedbackPage';

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
  favoritesPage: FavoritesPage;
  recentPage: RecentPage;
  notesPage: NotesPage;
  duplicatesPage: DuplicatesPage;
  brokenLinksPage: BrokenLinksPage;
  signupPage: SignupPage;
  forgotPasswordPage: ForgotPasswordPage;
  feedbackPage: FeedbackPage;
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
  planPage: async ({ page }, use) => await use(new PlanPage(page)),
  favoritesPage: async ({ page }, use) => await use(new FavoritesPage(page)),
  recentPage: async ({ page }, use) => await use(new RecentPage(page)),
  notesPage: async ({ page }, use) => await use(new NotesPage(page)),
  duplicatesPage: async ({ page }, use) => await use(new DuplicatesPage(page)),
  brokenLinksPage: async ({ page }, use) => await use(new BrokenLinksPage(page)),
  signupPage: async ({ page }, use) => await use(new SignupPage(page)),
  forgotPasswordPage: async ({ page }, use) => await use(new ForgotPasswordPage(page)),
  feedbackPage: async ({ page }, use) => await use(new FeedbackPage(page)),
});

export { expect };