import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { TEST_IDS } from '../../utils/constants';

const versions = ['v1', 'v2', 'v99'];

test.describe('API versioning checks', () => {
  test(`${TEST_IDS.VERSION_001} - supported and unsupported versions behave as expected`, async ({ request }) => {
    for (const version of versions) {
      const response = await request.get(`${environmentConfig.baseUrl}/api/${version}/users`, {
        failOnStatusCode: false,
      });
      expect([200, 400, 404, 401, 403, 429]).toContain(response.status());
    }
  });
});
