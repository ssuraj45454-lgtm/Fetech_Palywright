import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { TEST_IDS } from '../../utils/constants';

const endpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('Rate limiting checks', () => {
  test(`${TEST_IDS.RATE_001} - repeated requests trigger rate-limit protection`, async ({ request }) => {
    const responses = [] as number[];

    for (let i = 0; i < Math.min(environmentConfig.rateLimitRequests, 10); i++) {
      const response = await request.get(endpoint, {
        headers: { Accept: 'application/json' },
        failOnStatusCode: false,
      });
      responses.push(response.status());
    }

    expect(responses.some((status) => [429, 403, 401].includes(status))).toBeTruthy();
  });
});
