import { test, expect } from '@playwright/test';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage';
import { SignUpPage } from '../../pages/SignUpPage';

test.describe('@smoke public navigation', () => {
  test('loads password recovery with an email input', async ({ page }) => { const view = new ForgotPasswordPage(page); await view.goto(); await view.expectVisible(); });
  test('loads organization signup with a disabled submit until valid input', async ({ page }) => { const view = new SignUpPage(page); await view.goto(); await view.expectVisible(); await expect(view.createOrganizationButton).toBeDisabled(); });
});
