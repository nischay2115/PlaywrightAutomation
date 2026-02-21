const { test, expect } = require('@playwright/test');
const POManager = require('../PageObjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../TestData/PlaceOrder.json')));//converted JSON string to Javascript object
const {customTest} = require('../utils/customFixture');

//using JSON Dataset 
for (const data of dataSet)//for loop for array dataset
{

  test(`@Iter Client App Login ${data.myProduct}`, async ({ page }) => {

    const poManager = new POManager(page);

    const lgnPage = poManager.getLoginPage();
    await lgnPage.visitPage(data.website);
    await lgnPage.signIn(data.emailID, data.password);


    const dbPage = poManager.getDashboardPage();
    await dbPage.getAllProductTitles();
    await dbPage.addDesiredProduct(data.myProduct);
    await dbPage.goToCartPage();

    const cPage = poManager.getCartPage();
    expect(await cPage.verifyProducts()).toContain(data.myProduct);
    await cPage.goToCheckout();


    const checkPage = poManager.getCheckOutPage();
    await checkPage.selectCountry(data.countryKeyword, data.desiredCountry);
    await checkPage.placeOrder();


    const sPage = poManager.getSuccessfullOrderPage();
    await expect(sPage.TyStatement()).toContainText(data.thankYouStatement);
    const orderID = await sPage.getOrderID();
    await sPage.goToMyOrders();

    const mOPage = poManager.myOrdersPage();
    await mOPage.goToMyOrderIdPage(orderID);

    const myOrderIdPage = poManager.myOrderIdPage();
    expect(await myOrderIdPage.verifyOrderID(orderID)).toBeTruthy();



  })
}

//using custom fixture
customTest('Client App Login using custome fixture', async ({page, testData}) =>{



    const poManager = new POManager(page);

    const lgnPage = poManager.getLoginPage();
    await lgnPage.visitPage(testData.website);
    await lgnPage.signIn(testData.emailID, testData.password);


    const dbPage = poManager.getDashboardPage();
    await dbPage.getAllProductTitles();
    await dbPage.addDesiredProduct(testData.myProduct);
    await dbPage.goToCartPage();

    const cPage = poManager.getCartPage();
    expect(await cPage.verifyProducts()).toContain(testData.myProduct);
    await cPage.goToCheckout();


    const checkPage = poManager.getCheckOutPage();
    await checkPage.selectCountry(testData.countryKeyword, testData.desiredCountry);
    await checkPage.placeOrder();


    const sPage = poManager.getSuccessfullOrderPage();
    await expect(sPage.TyStatement()).toContainText(testData.thankYouStatement);
    const orderID = await sPage.getOrderID();
    await sPage.goToMyOrders();

    const mOPage = poManager.myOrdersPage();
    await mOPage.goToMyOrderIdPage(orderID);

    const myOrderIdPage = poManager.myOrderIdPage();
    expect(myOrderIdPage.verifyOrderID(orderID)).toBeTruthy();


})
