// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 2,
  timeout: 40 * 1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',

  projects: [
    {
      name: 'testProject1',
      use: {

        browserName: 'firefox',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        permissions: ['geolocation'],
        //viewport:{width: 720, height:720},
        ...devices['iPhone 15 Pro Max landscape'],
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,

      }
    },
    {
      name: 'testProject2',
      use: {

        browserName: 'chromium',
        headless: false,
        screenshot: "only-on-failure",
        trace: 'retain-on-failure',
        permissions: ['geolocation'],
        //viewport:{width: 720, height:720},
        //...devices['iPhone 15 Pro Max landscape'],
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,

      }
    }
  ]

});

