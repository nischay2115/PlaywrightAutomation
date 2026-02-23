// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';



/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 40 *1000,
  expect: {
    timeout: 5000
  },

  retries: 1,

  reporter: [
    ['line'],
    ['html', {outputFolder: 'playwright-report', open: 'never'}],
    ['allure-playwright'],
],

  use: {

    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on',

  }
 
  });

