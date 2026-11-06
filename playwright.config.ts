import { defineConfig, devices } from '@playwright/test';

const port = 3123;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'retain-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    // E2E_DEV=1 runs against `next dev`, where Strict Mode mounts every effect twice
    command: process.env.E2E_DEV
      ? `next dev e2e/app -p ${port}`
      : `next build e2e/app && next start e2e/app -p ${port}`,
    url: `http://localhost:${port}`,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
