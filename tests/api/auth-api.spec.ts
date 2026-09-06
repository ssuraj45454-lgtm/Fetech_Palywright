import { test, expect } from '@playwright/test';
import { testData } from '../../data/test-data';

const apiBaseUrl = process.env.FETCHTAB_API_URL || 'https://fetchtab-api.pankajdev.in';

test.describe('FetchTab API', () => {
  test('Maintenance status endpoint should return a valid response', async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/auth/maintenance-status`);

    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toMatch(/application\/json/);
    const body = await response.json();
    expect(body.is_maintenance).toEqual(expect.any(Boolean));
  });

  test('Valid credentials should authenticate and return the current user', async ({ request }) => {
    const loginResponse = await request.post(`${apiBaseUrl}/auth/login`, {
      data: testData.validUser
    });

    expect(loginResponse.ok()).toBeTruthy();
    const loginBody = await loginResponse.json();
    expect(loginBody.status).toBe(200);
    expect(loginBody.data.token).toEqual(expect.any(String));

    const profileResponse = await request.get(`${apiBaseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${loginBody.data.token}` }
    });

    expect(profileResponse.ok()).toBeTruthy();
    const profileBody = await profileResponse.json();
    expect(profileBody.status).toBe(200);
    expect(profileBody.data.email).toBe(testData.validUser.email);
  });

  test('Invalid credentials should be rejected', async ({ request }) => {
    const response = await request.post(`${apiBaseUrl}/auth/login`, {
      data: testData.invalidUser
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.status).toBe(401);
    expect(body.msg).toBe('Invalid credentials or account deleted');
  });
});