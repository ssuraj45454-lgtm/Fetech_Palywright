import { APIResponse } from '@playwright/test';

export async function getJsonBody(response: APIResponse) {
  return response.json().catch(() => ({}));
}

export function assertStatus(response: APIResponse, expectedStatus: number | number[], message?: string) {
  const allowed = Array.isArray(expectedStatus) ? expectedStatus : [expectedStatus];
  if (!allowed.includes(response.status())) {
    throw new Error(
      `${message || 'Unexpected status code'}: expected ${allowed.join(' or ')}, received ${response.status()}`
    );
  }
}

export function getResponseMetadata(response: APIResponse) {
  return {
    status: response.status(),
    statusText: response.statusText(),
    contentType: response.headers()['content-type'] || '',
    responseTime: Date.now(),
  };
}
