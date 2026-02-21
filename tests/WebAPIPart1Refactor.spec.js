const{test, expect, request} = require('@playwright/test');
const APiUtils =  require('../utils/APiUtils');

const loginPayLoadData = {userEmail:"nischay123@gmail.com",userPassword:"Nischay@123"};
const orderPayloadData = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let response;
test.beforeAll(  async()=>
    {

        const apiContext = await request.newContext();
        const apiUtils = new APiUtils(apiContext, loginPayLoadData);
        response = await apiUtils.getOrderID(orderPayloadData);
        

    });

  

test('Client App Login', async ({page})=>
{

    
await page.addInitScript(tokenValue =>
{
    window.localStorage.setItem('token', tokenValue)
}, response.token );//stores cookies in the local storage

await page.goto('https://rahulshettyacademy.com/client/');

await page.getByRole('button', {name: '  ORDERS' }).click();

await page.locator('tr.ng-star-inserted').first().waitFor();

await page.locator('tr').filter({hasText: response.OrderID}).getByText('View').click();

const osId = await page.locator('.col-text').textContent();
console.log(response.OrderID.includes(osId));//boolean value
// expect(response.OrderID.includes(osId)).toBeTruthy();

//or
expect(response.OrderID).toContain(osId);





})    