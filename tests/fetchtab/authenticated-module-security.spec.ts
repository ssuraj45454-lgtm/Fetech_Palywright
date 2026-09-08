import { expect, test } from '@playwright/test';
import { hasFetchTabCredentials } from '../../config/fetchtabUser';

const internalPath = (href: string, baseURL: string): string | undefined => {
  const url = new URL(href, baseURL);
  if (url.origin !== new URL(baseURL).origin || !url.pathname.startsWith('/')) return undefined;
  return `${url.pathname}${url.search}${url.hash}`;
};

test.describe('@security FetchTab authenticated modules', () => {
  test.beforeEach(() => test.skip(!hasFetchTabCredentials(), 'Configure the dedicated FetchTab test account in .env.'));

  test('every sidebar module is reachable by the authenticated test user', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('body')).toBeVisible();

    const hrefs = await page.locator('nav a[href], aside a[href], [role="navigation"] a[href]').evaluateAll(
      links => [...new Set(links.map(link => link.getAttribute('href')).filter((href): href is string => Boolean(href)))],
    );
    expect(hrefs, 'No sidebar module links were discovered.').not.toEqual([]);

    for (const href of hrefs) {
      const path = internalPath(href, page.url());
      if (!path || path === '/logout') continue;
      await page.goto(path);
      await expect(page.locator('body')).toBeVisible();
      expect(page.url()).not.toMatch(/\/login(?:$|[?#])/i);
    }
  });

  test('every discovered module route redirects in a clean browser context', async ({ page, browser, baseURL }) => {
    await page.goto('/dashboard');
    const hrefs = await page.locator('nav a[href], aside a[href], [role="navigation"] a[href]').evaluateAll(
      links => [...new Set(links.map(link => link.getAttribute('href')).filter((href): href is string => Boolean(href)))],
    );
    const paths = hrefs.map(href => internalPath(href, baseURL!)).filter((path): path is string => Boolean(path && path !== '/logout'));
    expect(paths, 'No module routes were discovered.').not.toEqual([]);

    const anonymousContext = await browser.newContext();
    const anonymousPage = await anonymousContext.newPage();
    try {
      for (const path of paths) {
        await anonymousPage.goto(path);
        await expect(anonymousPage, `Unauthenticated access was allowed for ${path}`).toHaveURL(/\/login(?:$|[?#])/i);
      }
    } finally {
      await anonymousContext.close();
    }
  });

  test('logout invalidates access to an already-discovered module', async ({ page }) => {
    await page.goto('/dashboard');
    const firstModule = page.locator('nav a[href], aside a[href], [role="navigation"] a[href]').first();
    const href = await firstModule.getAttribute('href');
    test.skip(!href, 'No sidebar module route was available.');

    const path = internalPath(href!, page.url());
    test.skip(!path, 'The first sidebar link is external.');
    const logout = page.getByRole('button', { name: /sign out|logout/i }).or(page.getByRole('link', { name: /sign out|logout/i })).first();
    test.skip(await logout.count() === 0, 'No visible logout control was found.');
    await logout.click();
    await page.goto(path!);
    await expect(page).toHaveURL(/\/login(?:$|[?#])/i);
  });
});
