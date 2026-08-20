import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'python3 -m http.server 8123',
    port: 8123,
    reuseExistingServer: true,
  },
  use: { baseURL: 'http://localhost:8123' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
