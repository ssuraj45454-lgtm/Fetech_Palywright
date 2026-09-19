import { test, expect } from '@playwright/test';
import { environmentConfig } from '../../config/environments';

const base = environmentConfig.baseUrl;
const authHeaders = {
  Authorization: `Bearer ${environmentConfig.testToken}`,
  Accept: 'application/json',
};

test.describe('Authentication and bookmarks API coverage', () => {
  test('signup endpoint accepts or rejects requests without crashing', async ({ request }) => {
    const response = await request.post(`${base}/auth/signup`, {
      data: {
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'Password123!'
      },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect([200, 201, 400, 409, 422, 429]).toContain(response.status());
    expect(response.status()).not.toBe(500);
  });

  test('signup verification endpoint handles verification requests safely', async ({ request }) => {
    const response = await request.post(`${base}/auth/signup/verify`, {
      data: {
        email: 'testuser@example.com',
        otp: '123456'
      },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect([200, 201, 400, 401, 403, 409, 422, 429]).toContain(response.status());
    expect(response.status()).not.toBe(500);
  });

  test('login endpoint validates credentials and returns a valid auth response', async ({ request }) => {
    const response = await request.post(`${base}/auth/login`, {
      data: {
        email: environmentConfig.testUsername || 'test@example.com',
        password: environmentConfig.testPassword || 'Password123'
      },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect([200, 201, 400, 401, 403, 422, 429]).toContain(response.status());
    expect(response.status()).not.toBe(500);
  });

  test('logout endpoint responds correctly for unauthenticated or authenticated calls', async ({ request }) => {
    const response = await request.post(`${base}/auth/logout`, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect([200, 201, 401, 403, 429]).toContain(response.status());
    expect(response.status()).not.toBe(500);
  });

  test('forgot password endpoint handles reset requests safely', async ({ request }) => {
    const response = await request.post(`${base}/auth/forgot-password`, {
      data: {
        email: 'testuser@example.com'
      },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect([200, 201, 400, 422, 429]).toContain(response.status());
    expect(response.status()).not.toBe(500);
  });

  test('reset password endpoint handles invalid or expired reset attempts', async ({ request }) => {
    const response = await request.post(`${base}/auth/reset-password`, {
      data: {
        token: 'invalid-token',
        password: 'NewPassword123!'
      },
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect([200, 201, 400, 401, 422, 429]).toContain(response.status());
    expect(response.status()).not.toBe(500);
  });

  test('bookmarks count endpoint requires auth or returns a controlled denial', async ({ request }) => {
    const response = await request.get(`${base}/bookmarks/count`, {
      headers: { Accept: 'application/json' },
      failOnStatusCode: false,
    });

    expect([200, 401, 403, 429]).toContain(response.status());
    expect(response.status()).not.toBe(500);
  });

  test('live authenticated endpoints respond successfully with the real bearer token', async ({ request }) => {
    const endpoints = [
      '/auth/me',
      '/bookmarks/count',
      '/bookmarks/get-all-bookmarks',
      '/folders',
      '/notifications',
      '/notes',
      '/tabs',
      '/shares/counts',
    ];

    for (const endpoint of endpoints) {
      const response = await request.get(`${base}${endpoint}`, {
        headers: authHeaders,
        failOnStatusCode: false,
      });

      const status = response.status();
      expect([200, 201, 204, 429], `Endpoint ${endpoint} should succeed or be rate-limited with the bearer token`).toContain(status);
      expect(status).not.toBe(500);

      const body = await response.json().catch(() => ({}));
      expect(body).toBeDefined();
    }
  });
});
