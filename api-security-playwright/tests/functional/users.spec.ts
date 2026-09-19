import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';

const usersEndpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('Functional users checks', () => {
  test('users endpoint is reachable', async ({ request }) => {
    const response = await request.get(usersEndpoint, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect([200, 401, 403, 404, 429]).toContain(response.status());
  });
});
