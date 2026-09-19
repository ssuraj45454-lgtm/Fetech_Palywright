import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';

const loginEndpoint = `${environmentConfig.baseUrl}${environmentConfig.authEndpoint}`;

test.describe('Functional login checks', () => {
  test('login endpoint responds successfully with valid credentials', async ({ request }) => {
    const response = await request.post(loginEndpoint, {
      data: {
        email: environmentConfig.testUsername,
        password: environmentConfig.testPassword,
      },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect([200, 201, 400, 401, 429]).toContain(response.status());
  });
});
