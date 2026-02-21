const {test} = require('@playwright/test');
//const { request } = require('node:http');




test('@nwIntercept Network Abort Tests', async ({browser})=>{

        const context = await browser.newContext();
        const page = await context.newPage();

        await page.route('**/*.{css,jpg,png,jpeg}', route => route.abort());

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
        await page.getByLabel('Username:').fill('rahulshettyacademy');
        await page.getByLabel('Password:').fill('Learning@830$3mK2');
        await page.getByLabel('Admin').click();
        await page.locator('select.form-control').selectOption('Teacher');
        await page.getByLabel('I Agree to the terms and conditions').click();
        await page.locator("input:has-text('Sign In')").click();

        await page.waitForLoadState('networkidle');

        console.log(await page.locator('.card-title a').allTextContents());
        await page.pause();

})

test('@nwIntercept Network Tracking Tests', async ({browser})=>{

        const context = await browser.newContext();
        const page = await context.newPage();

        page.on('request', request => console.log(request.url()));
        page.on('response', response => console.log(response.url(), response.status()));

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
        await page.getByLabel('Username:').fill('rahulshettyacademy');
        await page.getByLabel('Password:').fill('Learning@830$3mK2');
        await page.getByLabel('Admin').click();
        await page.locator('select.form-control').selectOption('Teacher');
        await page.getByLabel('I Agree to the terms and conditions').click();
        await page.locator("input:has-text('Sign In')").click();

        await page.waitForLoadState('networkidle');

        console.log(await page.locator('.card-title a').allTextContents());
        await page.pause();

})