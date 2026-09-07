import { test as base, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

type Pages = { loginPage: LoginPage; signUpPage: SignUpPage; forgotPasswordPage: ForgotPasswordPage; dashboardPage: DashboardPage };

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  signUpPage: async ({ page }, use) => use(new SignUpPage(page)),
  forgotPasswordPage: async ({ page }, use) => use(new ForgotPasswordPage(page)),
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page))
});

export { expect };
