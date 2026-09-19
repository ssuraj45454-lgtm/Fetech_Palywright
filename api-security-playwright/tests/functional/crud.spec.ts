import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';

const usersEndpoint = `${environmentConfig.baseUrl}${environmentConfig.usersEndpoint}`;

test.describe('Functional CRUD checks', () => {
  test('CRUD routes are handled without malformed server responses', async ({ request }) => {
    const getResponse = await request.get(usersEndpoint, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });

    const postResponse = await request.post(usersEndpoint, {
      data: { name: 'Rahul', email: 'rahul@example.com' },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect([200, 201, 400, 401, 403, 404, 405, 429]).toContain(getResponse.status());
    expect([200, 201, 400, 401, 403, 404, 405, 422, 429]).toContain(postResponse.status());
  });
});
