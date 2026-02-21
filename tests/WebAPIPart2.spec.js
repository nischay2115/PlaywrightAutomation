const{test, expect } = require('@playwright/test');


let webContext;
let emailID;

test.beforeAll(  async({browser})=>
    {

        emailID = 'nischay123@gmail.com';
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://rahulshettyacademy.com/client/');
        await page.getByPlaceholder('email@example.com').fill(emailID);
        await page.getByPlaceholder('enter your passsword').fill('Nischay@123');
        await page.getByRole('button', {name: 'Login'}).click();
        await page.waitForLoadState('networkidle');
        await context.storageState({path: 'state.json'});
        webContext = await browser.newContext({storageState: 'state.json'});
        
        
    });
  

test('@API Client App Login', async ({})=>
{

const page = await webContext.newPage();    

await page.goto('https://rahulshettyacademy.com/client/');

const myProduct = 'ZARA COAT 3';
const title = page.locator('.card-body b');

//await page.waitForLoadState('networkidle');//wait
await page.locator(".card-body b").first().waitFor;//wait alternative
const titles = await title.allTextContents();
console.log(titles);

await page.locator('.card-body').filter({hasText: myProduct}).getByRole('button', {name: ' Add To Cart'}).click();

await page.getByRole('listitem').getByRole('button', {name: '  Cart '}).click();

await page.locator('div li').first().waitFor();
await expect(page.getByText(myProduct)).toBeVisible();

await page.getByRole('button', {name: 'Checkout'}).click();

await page.getByPlaceholder('Select Country').pressSequentially('ind');

const autoDropdown = page.locator('.ta-item');
await autoDropdown.first().waitFor();

await page.getByRole('button', {name: /India$/}).click();


await expect(page.getByText(emailID)).toBeVisible();

await page.getByText('Place Order ').click();

await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();

const orderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

const exactOrderID = orderID.trim().split(" ")[1];//replace('\/|\g', ' ') can also be used

console.log(exactOrderID);

await page.getByRole('button', {name: '  ORDERS' }).click();

await page.locator('tr.ng-star-inserted').first().waitFor();

await page.locator('tr').filter({hasText: exactOrderID}).getByText('View').click();

const osId = await page.locator('.col-text').textContent();
console.log(orderID.includes(osId));
expect(orderID.includes(osId)).toBeTruthy();

await page.pause();





})    