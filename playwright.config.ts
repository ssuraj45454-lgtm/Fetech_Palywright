import { defineConfig, devices } from '@playwright/test';

const desktopViewport = { width: 1920, height: 1080 };

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://fetchtab.pankajdev.in',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-first-retry',
    headless: false
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        channel: 'chrome',
        viewport: desktopViewport,
        launchOptions: {
          args: ['--start-maximized', '--window-size=1920,1080', '--window-position=0,0', '--disable-dev-shm-usage']
        }
      }
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
        viewport: desktopViewport,
        launchOptions: {
          args: ['-width', '1920', '-height', '1080']
        }
      }
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
        viewport: desktopViewport
      }
    }
  ]
});