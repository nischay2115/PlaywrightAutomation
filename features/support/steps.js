const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('login to Ecommerce app using credentials {string} and {string}', async function (username, password) {

    await this.lgnPage.signIn(username, password);

});

When('{string} is added to cart', async function (myProduct) {

    const dbPage = this.poManager.getDashboardPage();
    await dbPage.getAllProductTitles();
    await dbPage.addDesiredProduct(myProduct);
    await dbPage.goToCartPage();
});

Then('{string} will be in the cart', async function (myProduct) {

    const cPage = this.poManager.getCartPage();
    expect(await cPage.verifyProducts()).toContain(myProduct);
    await cPage.goToCheckout();
});

When('order is placed with valid country details {string} and {string}', async function (countryKeyword, desiredCountry) {

    const checkPage = this.poManager.getCheckOutPage();
    await checkPage.selectCountry(countryKeyword, desiredCountry);
    await checkPage.placeOrder();
});

Then('My order is in Order History with {string} statement', async function (thankYouStatement) {
    const sPage = this.poManager.getSuccessfullOrderPage();
    await expect(sPage.TyStatement()).toContainText(thankYouStatement);
    const orderID = await sPage.getOrderID();
    await sPage.goToMyOrders();

    const mOPage = this.poManager.myOrdersPage();
    await mOPage.goToMyOrderIdPage(orderID);

    const myOrderIdPage = this.poManager.myOrderIdPage();
    expect(myOrderIdPage.verifyOrderID(orderID)).toBeTruthy();
});

Given('login to website using invalid credentials {string} and {string}', async function(emailID, pword){

    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await this.page.title());

    const username = this.page.locator("input[type = 'text']");
    const password = this.page.locator('#password');
    const signInBtn = this.page.locator('#signInBtn');

    await username.fill(emailID);
    await password.fill(pword);
    await signInBtn.click();


   

})

Then('Verify error message is displayed', async function () {


     const errorMsg = this.page.locator("div[style *= 'block']");
    
     console.log(await errorMsg.textContent());
     await expect(errorMsg).toContainText('Incorrect');
});