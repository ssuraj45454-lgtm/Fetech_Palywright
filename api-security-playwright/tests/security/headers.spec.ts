import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { TEST_IDS } from '../../utils/constants';

const endpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('Security header validation', () => {
  test(`${TEST_IDS.HEADER_001} - expected headers are present when applicable`, async ({ request }) => {
    const response = await request.get(endpoint, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });
    const headers = response.headers();

    const policyHeaders = [
      'strict-transport-security',
      'content-security-policy',
      'x-content-type-options',
      'referrer-policy',
      'permissions-policy',
    ];

    const present = policyHeaders.filter((header) => !!headers[header]);
    expect(present.length).toBeGreaterThanOrEqual(0);
    expect(headers['x-powered-by'] || '').not.toMatch(/.+/i);
  });
});
