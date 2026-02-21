module.exports = class SuccessfullOrderPage{


    constructor(page){

        this.page = page;
        this.statement = page.locator('.hero-primary');
        this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
        this.myOrdersPagebutton = page.locator("li [routerlink = '/dashboard/myorders']");
        this.rows = page.locator('tr.ng-star-inserted');

    }

    TyStatement(){//async is removed as expect does not not accept Promise<Locator>

        return this.statement;

    }
    

    async getOrderID(){

        const orderID = await this.orderId.textContent();

        console.log(orderID);

        return orderID;

    }

    async goToMyOrders(){

        await this.myOrdersPagebutton.click();
        await this.rows.first().waitFor();
        

    }



}