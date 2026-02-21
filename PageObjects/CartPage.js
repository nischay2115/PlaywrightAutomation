
module.exports = class CartPage{


    constructor(page){


        this.page = page;
        this.cartProduct = page.locator(".cartSection h3");
        this.checkOut = page.locator('text = Checkout');



    }

    async verifyProducts(){

        
        const products = await this.cartProduct.allTextContents();
        
        return products

    }

    async goToCheckout(){

        await this.checkOut.click();

    }


}