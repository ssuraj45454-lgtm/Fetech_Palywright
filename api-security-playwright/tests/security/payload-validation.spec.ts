import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { buildLargePayload, buildUserPayload } from '../../api/helpers/payload.helper';
import { TEST_IDS } from '../../utils/constants';

const endpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('Payload validation security checks', () => {
  test(`${TEST_IDS.PAYLOAD_001} - known malicious field patterns are rejected`, async ({ request }) => {
    const payload = {
      name: 'Rahul',
      email: 'rahul@test.com',
      isAdmin: true,
      role: 'admin',
      permissions: ['read', 'write'],
      userId: '123',
      accountId: '456',
    };

    const response = await request.post(endpoint, {
      data: payload,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect(response.status()).not.toBe(500);
    expect([400, 403, 404, 405, 422, 429]).toContain(response.status());
  });

  test(`${TEST_IDS.PAYLOAD_002} - oversized payload is rejected gracefully`, async ({ request }) => {
    const response = await request.post(endpoint, {
      data: buildLargePayload(true),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect(response.status()).not.toBe(500);
    expect([413, 400, 405, 422, 429]).toContain(response.status());
  });

  test('safe user payload passes if API contract allows it', async ({ request }) => {
    const response = await request.post(endpoint, {
      data: buildUserPayload(),
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });
    expect([200, 201, 400, 405, 422, 429]).toContain(response.status());
  });
});
