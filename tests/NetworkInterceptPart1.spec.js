const { test, expect, request } = require('@playwright/test');
const APiUtils = require('../utils/APiUtils');

const loginPayLoadData = { userEmail: "nischay123@gmail.com", userPassword: "Nischay@123" };
const orderPayloadData = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayloadorders = {data:[],message:"No Orders"};
let response;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext, loginPayLoadData);
    response = await apiUtils.getOrderID(orderPayloadData);


});



test('@nwIntercept Client App Login Intercepting Response Call', async ({ page }) => {


    await page.addInitScript(tokenValue => {
        window.localStorage.setItem('token', tokenValue)
    }, response.token);//stores cookies in the local storage

    await page.goto('https://rahulshettyacademy.com/client/');

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            const response1 = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadorders);
            route.fulfill(
                {
                    response1,
                    body,
                }
            )
        }

    );

    await page.getByRole('button', { name: '  ORDERS' }).click();

    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');

    console.log (await page.locator('.mt-4').textContent());

})