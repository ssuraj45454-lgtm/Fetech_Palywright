import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { TEST_IDS } from '../../utils/constants';

const endpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('Timeout validation', () => {
  test(`${TEST_IDS.TIMEOUT_001} - normal requests complete within configured timeout`, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(endpoint, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
      timeout: environmentConfig.requestTimeout,
    });
    const elapsed = Date.now() - start;

    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(elapsed).toBeLessThan(environmentConfig.requestTimeout + 5000);
  });
});
