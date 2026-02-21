const {test, request, expect} = require('@playwright/test');
const APiUtils = require('../utils/APiUtils');

const loginPayLoadData = { userEmail: "nischay123@gmail.com", userPassword: "Nischay@123" };


let token;

test.beforeAll(  async()=>{

    const requestContext = await request.newContext();
    let apiUtils = new APiUtils(requestContext, loginPayLoadData );
    token = await apiUtils.getToken();

});





test('@nwIntercept Security Testing Request Call', async ({page})=>{

    await page.addInitScript(tokenValue => 
    {
        window.localStorage.setItem('token', tokenValue)
    },token);

    await page.goto('https://rahulshettyacademy.com/client/');

    await page.getByRole('button', { name: '  ORDERS' }).click();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',

            async route => route.continue(
                {
                    url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6971248ec941646b7aad902d'
                })

        )

    await page.locator("button:has-text('View')").first().click();
    
    console.log(await page.locator('.blink_me').textContent());

    expect(page.locator('.blink_me')).toHaveText('You are not authorize to view this order');
    

})