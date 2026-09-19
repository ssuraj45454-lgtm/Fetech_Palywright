import { test } from '@playwright/test';

export function logSecurityStep(testId: string, message: string): void {
  test.step(`${testId} - ${message}`, async () => {
    // Step is logged via Playwright's reporting; no secrets are printed here.
  });
}
