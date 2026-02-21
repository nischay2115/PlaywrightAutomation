const {test, expect} = require('@playwright/test');



test('Taking screenshot', async ({page})=>
{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    
    expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();

    await page.getByPlaceholder('Hide/Show Example').screenshot({path: 'PartialScreenshot.png'});

    await page.getByText('Hide').click();

    expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();

    await page.screenshot({path: 'FullScreenshot.png'});


});

test('UI testing using Screenshot', async ({page})=>{

    await page.goto('https://www.makemytrip.com/');
    expect(await page.screenshot()).toMatchSnapshot('landingpage.png');

})