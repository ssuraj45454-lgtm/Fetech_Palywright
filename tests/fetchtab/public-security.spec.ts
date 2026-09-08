import { expect, test } from '@playwright/test';

const requiredSecurityHeaders = ['x-content-type-options', 'content-security-policy', 'strict-transport-security'];

test.describe('@security FetchTab public surface', () => {
  test('uses HTTPS and returns baseline security headers', async ({ request, baseURL }) => {
    expect(baseURL).toMatch(/^https:/);
    const response = await request.get('/');
    expect(response.ok()).toBeTruthy();

    const headers = response.headers();
    for (const header of requiredSecurityHeaders) {
      expect.soft(headers[header], `Missing ${header} header`).toBeTruthy();
    }
  });

  test('login controls avoid password disclosure and use browser email validation', async ({ page }) => {
    await page.goto('/login');
    const email = page.getByLabel(/^Email \*$/);
    const password = page.getByLabel(/^Password \*$/);

    await expect(email).toHaveAttribute('type', 'email');
    await expect(password).toHaveAttribute('type', 'password');
    await email.fill('not-an-email');
    expect(await email.evaluate(element => (element as HTMLInputElement).validity.valid)).toBeFalsy();
  });

  test('public links do not expose credentials in their URLs', async ({ page }) => {
    await page.goto('/');
    const hrefs = await page.locator('a[href]').evaluateAll(links => links.map(link => link.getAttribute('href') ?? ''));
    for (const href of hrefs) {
      expect(href).not.toMatch(/(?:password|token|secret|api[_-]?key)=/i);
    }
  });
});
