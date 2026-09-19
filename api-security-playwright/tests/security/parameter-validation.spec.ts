import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { TEST_IDS } from '../../utils/constants';

const endpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('Parameter validation', () => {
  test(`${TEST_IDS.PARAM_001} - invalid query parameters are handled safely`, async ({ request }) => {
    for (const value of ['abc', '-1', '0', '999999999']) {
      const response = await request.get(`${endpoint}?page=${value}`, {
        failOnStatusCode: false,
      });
      expect(response.status()).not.toBe(500);
      expect([200, 400, 401, 422, 404, 429]).toContain(response.status());
    }
  });

  test(`${TEST_IDS.PARAM_002} - limit values are validated`, async ({ request }) => {
    for (const value of ['abc', '-1', '0', '999999999']) {
      const response = await request.get(`${endpoint}?limit=${value}`, {
        failOnStatusCode: false,
      });
      expect(response.status()).not.toBe(500);
      expect([200, 400, 401, 422, 404, 429]).toContain(response.status());
    }
  });
});
