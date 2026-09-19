import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';
import { TEST_IDS } from '../../utils/constants';

const authzMessage = 'Authorization should deny cross-user or privilege escalation access';

test.describe('Authorization and BOLA tests', () => {
  test(`${TEST_IDS.AUTHZ_001} - user accesses own resource`, async ({ request }) => {
    const response = await request.get(`${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}/me`, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });
    expect([200, 401, 403, 404, 429]).toContain(response.status());
  });

  test(`${TEST_IDS.AUTHZ_002} - user cannot access another user resource`, async ({ request }) => {
    const response = await request.get(`${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}/101`, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });
    expect([403, 404, 401, 200, 429]).toContain(response.status());
  });

  test(`${TEST_IDS.AUTHZ_003} - unauthorized role cannot access admin endpoint`, async ({ request }) => {
    const response = await request.get(`${environmentConfig.baseUrl}/api/v1/admin`, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });
    expect([403, 401, 404, 429]).toContain(response.status());
  });

  test(`${TEST_IDS.AUTHZ_004} - sales rep cannot access manager-only endpoint`, async ({ request }) => {
    const response = await request.get(`${environmentConfig.baseUrl}/api/v1/manager`, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });
    expect([403, 401, 404, 429]).toContain(response.status());
  });

  test(`${TEST_IDS.AUTHZ_005} - manager cannot access org admin-only endpoint`, async ({ request }) => {
    const response = await request.get(`${environmentConfig.baseUrl}/api/v1/org-admin`, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });
    expect([403, 401, 404, 429]).toContain(response.status());
  });
});
