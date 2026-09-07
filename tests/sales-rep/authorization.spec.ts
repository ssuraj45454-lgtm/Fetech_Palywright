import { test } from '../../fixtures/salesRep.fixture';
import { expectAccessDeniedOrRedirected } from '../../utils/assertions';

test.describe('@sales-rep @negative direct URL authorization', () => {
  test('denies a Sales Rep a verified Org Admin route', async ({ page }) => {
    const protectedRoute = process.env.ORG_ADMIN_ONLY_ROUTE;
    test.skip(!protectedRoute, 'Set ORG_ADMIN_ONLY_ROUTE after an Org Admin discovery run.');
    await page.goto(protectedRoute!); await expectAccessDeniedOrRedirected(page, protectedRoute!);
  });
});
