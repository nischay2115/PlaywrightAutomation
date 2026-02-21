module.exports = class DashBoardPage{


    constructor(page){

        this.page = page;
        this.title = page.locator('.card-body b');
        this.productCards = page.locator('.card-body');


    }

    async getAllProductTitles(){

        const titles = await this.title.allTextContents();
        console.log(titles);

    }

    async addDesiredProduct(myProduct){

        const count = await this.productCards.count();
        
        for(let i = 0; i < count; i++)
        {
           if(await this.productCards.nth(i).locator('b').textContent() === myProduct)//comparing product names to my Product name
           {
        
                await this.productCards.nth(i).locator('text = Add to Cart').click();
                break;
        
           }
        }

    }

    async goToCartPage(){

        await this.page.locator("[routerlink *= 'cart']").click();
        await this.page.locator('div li').first().waitFor();

    }


}