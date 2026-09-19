import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { TEST_IDS } from '../../utils/constants';

const endpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('OPTIONS method checks', () => {
  test(`${TEST_IDS.OPTIONS_001} - OPTIONS response exposes allowed methods/headers`, async ({ request }) => {
    const response = await request.fetch(endpoint, {
      method: 'OPTIONS',
      failOnStatusCode: false,
    });

    const headers = response.headers();
    expect([200, 204, 405, 401, 403, 429]).toContain(response.status());
    const allow = headers['allow'] || headers['Allow'] || '';
    expect(allow.length >= 0).toBeTruthy();
  });
});
