const{test, expect, request} = require('@playwright/test');

const loginPayLoadData = {userEmail:"nischay123@gmail.com",userPassword:"Nischay@123"};
const orderPayloadData = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let exactOrderID;
test.beforeAll(  async()=>
    {

        const apiContext = await request.newContext();
        const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: loginPayLoadData
            });
        expect(loginResponse.ok()).toBeTruthy();

        const jsonBody = await loginResponse.json();

        token = jsonBody.token;

        console.log(token);

        const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
                            {
                                data: orderPayloadData,
                                headers: 
                                        {
                                            'Authorization' : token,
                                            'content-type' : 'application/json'
                                        },
                            });

        expect(orderResponse.ok()).toBeTruthy();                    
        
        const orderJsonBody = await orderResponse.json();
        console.log(orderJsonBody);

        exactOrderID = orderJsonBody.orders[0];

        
    });
  

test('@API Client App Login', async ({page})=>
{

    
await page.addInitScript(tokenValue =>
{
    window.localStorage.setItem('token', tokenValue)
}, token );//stores cookies in the local storage

await page.goto('https://rahulshettyacademy.com/client/');

await page.getByRole('button', {name: '  ORDERS' }).click();

await page.locator('tr.ng-star-inserted').first().waitFor();

await page.locator('tr').filter({hasText: exactOrderID}).getByText('View').click();

const osId = await page.locator('.col-text').textContent();
console.log(exactOrderID.includes(osId));
expect(exactOrderID.includes(osId)).toBeTruthy();





})    