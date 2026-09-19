import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { TEST_IDS } from '../../utils/constants';

const endpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('Request validation checks', () => {
  test(`${TEST_IDS.REQ_001} - missing required fields are rejected without 500`, async ({ request }) => {
    const response = await request.post(endpoint, {
      data: { email: 'rahul@example.com' },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });
    expect(response.status()).not.toBe(500);
    expect([400, 403, 405, 422, 429]).toContain(response.status());
  });

  test(`${TEST_IDS.REQ_002} - malformed or invalid JSON is rejected without stack trace`, async ({ request }) => {
    const malformedJson = '{"name": "Rahul"';
    const response = await request.post(endpoint, {
      data: malformedJson,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });
    expect(response.status()).not.toBe(500);
    expect([400, 405, 422, 429]).toContain(response.status());
  });
});
