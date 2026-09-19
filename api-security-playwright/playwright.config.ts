import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const requestTimeout = Number(process.env.REQUEST_TIMEOUT || 10000);

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  timeout: requestTimeout,
  expect: {
    timeout: requestTimeout,
  },
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'reports/results.json' }],
    ['list'],
  ],
  outputDir: 'test-results',
  use: {
    baseURL: process.env.BASE_URL || 'https://fetchtab-api.pankajdev.in',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
    ...devices['Desktop Chrome'],
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
