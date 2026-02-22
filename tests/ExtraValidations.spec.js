const{test, expect} = require('@playwright/test');


test('Naviagtion', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await page.goto('https://www.google.com/');
    await page.goBack();
    await page.goForward();
})

test('Hidden Element Assertion', async ({page})=>
{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    
    expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.getByText('Hide').click();
    expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();


});

test('Dialog Box/pop Up, Hover and Frames', async ({page})=>
{
        await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

        //pop up

        const [dialog] = await Promise.all(
            [
                page.waitForEvent('dialog'),
                page.locator('#confirmbtn').click()
            ]
        );

        await dialog.accept();

        //hover

        await page.getByRole('button', {name: 'Mouse Hover'}).hover();

        //frames-> recognized by iframes or set frames in html
        const framePage = page.frameLocator('#courses-iframe');

        await framePage.getByRole('link', {name: 'All Access plan'}).click();
        const textCheck = await framePage.locator('.text h2').textContent();
        console.log(textCheck.split(' ')[1]);
        


});