const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const playwright = require('playwright');
const POManager = require('../../PageObjects/POManager');




Before({timeout: 10*1000}, async function(){


    const browser = await playwright.chromium.launch({headless: false});
    const context = await browser.newContext();
    this.page = await context.newPage();
        
    this.poManager = new POManager(this.page);
    
    this.lgnPage = this.poManager.getLoginPage();
    await this.lgnPage.visitPage("https://rahulshettyacademy.com/client/");

})

AfterStep(async function({result}){

    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path: 'Screenshot.png'});
    }

})

After(function(){


    console.log('Iam last to execute');


})