module.exports = class MyOrdersPage{


    constructor(page){

        this.page = page;
        this.row = page.locator('tr.ng-star-inserted');

    }


    async goToMyOrderIdPage(orderID){

        

        const rowCount = await this.row.count();

        console.log(rowCount);

        for (let i = 0; i < rowCount; i++) 
            {
                const rowOrderID = await this.row.nth(i).locator('th').textContent();

                if (orderID.includes(rowOrderID)) 
                    {
                        await this.row.nth(i).locator('.btn-primary').click();
                        break;
                    }
            }


    }


}