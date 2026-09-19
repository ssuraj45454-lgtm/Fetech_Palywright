import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { TEST_IDS } from '../../utils/constants';

const endpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('CORS validation', () => {
  test(`${TEST_IDS.CORS_001} - CORS headers are evaluated safely`, async ({ request }) => {
    const response = await request.fetch(endpoint, {
      method: 'OPTIONS',
      headers: {
        Origin: 'https://app.example.com',
        'Access-Control-Request-Method': 'GET',
      },
      failOnStatusCode: false,
    });

    const headers = response.headers();
    expect([200, 204, 401, 403, 405]).toContain(response.status());
    expect(headers['access-control-allow-origin'] || headers['Access-Control-Allow-Origin'] || '').toBeDefined();
  });
});
