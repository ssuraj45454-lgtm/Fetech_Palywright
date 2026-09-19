import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { TEST_IDS } from '../../utils/constants';

const endpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('Response validation', () => {
  test(`${TEST_IDS.RESP_001} - API responses are JSON and do not leak sensitive data`, async ({ request }) => {
    const response = await request.get(endpoint, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });
    const text = await response.text();
    const lower = text.toLowerCase();

    expect(lower).not.toContain('password');
    expect(lower).not.toContain('secret');
    expect(lower).not.toContain('stack trace');
    expect(lower).not.toContain('database credentials');
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test(`${TEST_IDS.RESP_002} - response time remains within expected threshold`, async ({ request }) => {
    const start = Date.now();
    const response = await request.get(endpoint, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });
    const elapsed = Date.now() - start;
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(elapsed).toBeLessThan(15000);
  });
});
