const {test, expect} = require('@playwright/test');//importing test annotation from jars


test('Browser Context First Playwright Test', async ({ browser }) => {


    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());

    const username = page.locator("input[type = 'text']");
    const password = page.locator('#password');
    const errorMsg = page.locator("div[style *= 'block']");
    const signInBtn = page.locator('#signInBtn');
    const cardTitle = page.locator('.card-title a');

    await username.fill('nickswonder15');
    await password.fill('Learning@830$3mK2');
    await signInBtn.click();


    console.log(await errorMsg.textContent());
    await expect(errorMsg).toContainText('Incorrect');//assertion
    await username.fill('');
    await username.fill('rahulshettyacademy');
    await signInBtn.click();
    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(1).textContent());
    console.log(await cardTitle.allTextContents());


});

test('Page Playwright Test', async ({ page }) => {
    await page.goto('https://google.com/');
    //get title - assertion 
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');//assertion
});


//dropdowns and radio buttons with web based pop up
test('UI Controls - Dropdowns and Radio buttons', async ({page})=>
{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const username = page.locator("input[type = 'text']");
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');

    //statuc dropdown
    const sdropDown = page.locator('select.form-control');
    await sdropDown.selectOption('consult');
    
    //radio button
    await page.locator('.checkmark').last().click();

    //web based pop up
    await page.locator('.btn-success').click();

    console.log(await page.locator('.checkmark').last().isChecked());
    await expect(page.locator('.checkmark').last()).toBeChecked();

    //checkbox
    await page.locator('#terms').click();
    console.log(await page.locator('#terms').isChecked());
    await expect(page.locator('#terms')).toBeChecked();

    await page.locator('#terms').uncheck();
    console.log(await page.locator('#terms').isChecked());
    expect(await page.locator('#terms').isChecked()).toBeFalsy();

    //blinking text
    const docLink = page.locator("a[href *= 'documents-request']");
    await expect(docLink).toHaveAttribute('class', 'blinkingText');//to assert blinking text

    //to pause
    //await page.pause();


}

);

test('Child Windows Handling', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const docLink = page.locator("a[href *= 'documents-request']");
    const username = page.locator("input[type = 'text']");

    const [newPage] = await Promise.all// for multiple pages [newPage, newPage1, newPage2]
    (
        [
            context.waitForEvent('page'), //listen for any new page
            docLink.click(),
    
        ]
    );

    await newPage.waitForLoadState('networkidle');

    const text = await newPage.locator('.red').innerText();//in place od textContent we can use innerText as it never returns null
    const email = text.split('@')[1].split(' ')[0];
    
    console.log(email);

    await username.fill(email);
    console.log(await username.inputValue());

})