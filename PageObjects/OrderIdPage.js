module.exports = class OrderIdPage{


    constructor(page){

        this.page = page;
        this.osIdComp = page.locator('.col-text');

    }

    async verifyOrderID(orderID){

        const osId = await this.osIdComp.textContent();
        const boolean = orderID.includes(osId);
        return boolean;

    }


}