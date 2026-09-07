import { APIRequestContext, expect } from '@playwright/test';
export async function expectSuccessful(response: Awaited<ReturnType<APIRequestContext['get']>>): Promise<void> {
  expect(response.ok(), `${response.status()} ${response.url()}`).toBeTruthy();
}
