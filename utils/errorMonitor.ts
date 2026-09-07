import { Page, TestInfo } from '@playwright/test';

export function monitorMeaningfulErrors(page: Page, testInfo: TestInfo): void {
  const errors: string[] = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('requestfailed', request => errors.push(`request: ${request.method()} ${request.url()} — ${request.failure()?.errorText ?? 'failed'}`));
  testInfo.attach('runtime-errors.txt', { body: Buffer.from(errors.join('\n') || 'No meaningful errors captured.'), contentType: 'text/plain' });
}
