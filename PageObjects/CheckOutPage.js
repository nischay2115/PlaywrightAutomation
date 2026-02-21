module.exports = class CheckOutPage{


    constructor(page){

        this.page = page;
        this.selectCountryKey = page.locator("[placeholder *= 'Country']");
        this.autoDropdown = page.locator('.ta-results button');
        this.placeOrderElement = page.locator('text = Place Order ');

    }

    async selectCountry(countryKeyword, desiredCountry){

        await this.selectCountryKey.pressSequentially(countryKeyword);
        
        await this.autoDropdown.first().waitFor();

        const countryCount = await this.autoDropdown.count();

        for(let i = 0; i<countryCount; i++)
        {
            const text = await this.autoDropdown.nth(i).textContent();
        
            if(text.trim() === desiredCountry)
            {
                await this.autoDropdown.nth(i).click();
                break;
            }
        
        }

    }


    async placeOrder(){


            await this.placeOrderElement.click();

    }


}