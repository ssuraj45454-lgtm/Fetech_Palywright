import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'https://salescoach-28ae3.firebaseapp.com';
const commonUse = { baseURL, actionTimeout: 15_000, navigationTimeout: 30_000, screenshot: 'only-on-failure' as const, video: 'on-first-retry' as const, trace: 'on-first-retry' as const };

export default defineConfig({
  testDir: './tests', fullyParallel: true, forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, workers: process.env.CI ? 2 : undefined,
  timeout: 60_000, expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { outputFolder: 'reports/html', open: 'never' }], ['json', { outputFile: 'reports/results.json' }], ['junit', { outputFile: 'reports/junit.xml' }]],
  use: commonUse,
  projects: [
    { name: 'org-admin-setup', testMatch: /org-admin\.setup\.ts/ },
    { name: 'manager-setup', testMatch: /manager\.setup\.ts/ },
    { name: 'sales-rep-setup', testMatch: /sales-rep\.setup\.ts/ },
    { name: 'public-chromium', testMatch: /(?:auth|common|negative|ui|regression)\/.*\.spec\.ts/, use: { ...devices['Desktop Chrome'], ...commonUse } },
    { name: 'org-admin', testMatch: /org-admin\/.*\.spec\.ts/, dependencies: ['org-admin-setup'], use: { ...devices['Desktop Chrome'], ...commonUse, storageState: 'auth/org-admin.json' } },
    { name: 'manager', testMatch: /manager\/.*\.spec\.ts/, dependencies: ['manager-setup'], use: { ...devices['Desktop Chrome'], ...commonUse, storageState: 'auth/manager.json' } },
    { name: 'sales-rep', testMatch: /sales-rep\/.*\.spec\.ts/, dependencies: ['sales-rep-setup'], use: { ...devices['Desktop Chrome'], ...commonUse, storageState: 'auth/sales-rep.json' } },
    { name: 'mobile-chrome', testMatch: /ui\/.*\.spec\.ts/, use: { ...devices['Pixel 5'], ...commonUse } },
    { name: 'tablet', testMatch: /ui\/.*\.spec\.ts/, use: { ...devices['iPad (gen 7)'], ...commonUse } },
  ],
});
