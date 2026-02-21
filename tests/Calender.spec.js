const{test, expect} = require('@playwright/test');


test('calender validation', async ({page})=>
{


    const monthNumber = '6';
    const day = '25';
    const year = '2027';
    const expectedList = [monthNumber,day,year];

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__calendar-button').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__tile').nth(Number(monthNumber) - 1).click();
    await page.locator("//abbr[text() = '"+day+"']").click();

    const inputs = page.locator('.react-date-picker__inputGroup__input')

    for(let i = 0; i< await inputs.count(); i++)
    {

        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);

    }

});