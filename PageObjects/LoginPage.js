module.exports= class loginPage{


    constructor(page){

        this.page = page;
        this.userEmail = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
        this.login = page.locator('#login');


    }

    async visitPage(website){

        await this.page.goto(website); //await page.goto('https://rahulshettyacademy.com/client/');

    }

    async signIn(emailID, password){


        await this.userEmail.fill(emailID);
        await this.userPassword.fill(password);
        await this.login.click();
        await this.page.waitForLoadState('networkidle');


    }


}