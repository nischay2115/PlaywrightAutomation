const{test, expect} = require('@playwright/test');

test('Client App Login', async ({page})=>
{

const emailID = 'nischay123@gmail.com';

await page.goto('https://rahulshettyacademy.com/client/');
await page.locator('#userEmail').fill(emailID);
await page.locator('#userPassword').fill('Nischay@123');
await page.locator('#login').click();

const myProduct = 'ZARA COAT 3';
let productCards = page.locator('.card-body');
const title = page.locator('.card-body b');


await page.waitForLoadState('networkidle');//wait
//await page.locator(".card-body b").last().waitFor;//wait alternative
const titles = await title.allTextContents();
console.log(titles);

const count = await productCards.count();

for(let i = 0; i < count; i++)
{
   if(await productCards.nth(i).locator('b').textContent() === myProduct)//comparing product names to my Product name
   {

        await productCards.nth(i).locator('text = Add to Cart').click();
        break;

   }
}

await page.locator("[routerlink *= 'cart']").click();
await page.locator('div li').first().waitFor();
const boolean = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(boolean).toBeTruthy();
await page.locator('text = Checkout').click();

await page.locator("[placeholder *= 'Country']").pressSequentially('ind');
const autoDropdown = page.locator('.ta-results');
await autoDropdown.waitFor();
const countryCount = await autoDropdown.locator('button').count();
console.log(countryCount);

for(let i = 0; i<countryCount; i++)
{
    const text = await autoDropdown.locator('button').nth(i).textContent();

    if(text.trim() === 'India')//trim is used to remove any space. We can use includes to but, it serves like contains
    {
        await autoDropdown.locator('button').nth(i).click();
        break;
    }

}

await expect(page.locator('.mt-5 label')).toHaveText(emailID);

await page.locator('text = Place Order ').click();

await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

const orderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();

console.log(orderID);

await page.locator("li [routerlink = '/dashboard/myorders']").click();

await page.locator('tr.ng-star-inserted').first().waitFor();

const row = page.locator('tr.ng-star-inserted');

const rowCount = await row.count();

console.log(rowCount);

for (let i = 0; i < rowCount; i++) 
{
  const rowOrderID = await row.nth(i).locator('th').textContent();

  if (orderID.includes(rowOrderID)) 
  {
    await row.nth(i).locator('.btn-primary').click();
    break;
  }
}

const osId = await page.locator('.col-text').textContent();
console.log(orderID.includes(osId));
expect(orderID.includes(osId)).toBeTruthy();

await page.pause();



})