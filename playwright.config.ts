import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'https://fetchtab.pankajdev.in';
const commonUse = { baseURL, actionTimeout: 15_000, navigationTimeout: 30_000, screenshot: 'only-on-failure' as const, video: 'on-first-retry' as const, trace: 'on-first-retry' as const };

export default defineConfig({
  testDir: './tests', fullyParallel: true, forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, workers: process.env.CI ? 2 : undefined,
  timeout: 60_000, expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { outputFolder: 'reports/html', open: 'never' }], ['json', { outputFile: 'reports/results.json' }], ['junit', { outputFile: 'reports/junit.xml' }]],
  use: commonUse,
  projects: [
    { name: 'fetchtab-setup', testMatch: /fetchtab\.setup\.ts/ },
    { name: 'public-chromium', testMatch: /fetchtab\/public-.*\.spec\.ts/, use: { ...devices['Desktop Chrome'], ...commonUse } },
    { name: 'fetchtab-authenticated', testMatch: /fetchtab\/authenticated-.*\.spec\.ts/, dependencies: ['fetchtab-setup'], use: { ...devices['Desktop Chrome'], ...commonUse, storageState: 'auth/fetchtab.json' } },
  ],
});
