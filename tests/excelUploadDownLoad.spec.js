const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');


async function readExcelTest(workSheet, target) {

    let cellCordnts = { rOw: -1, cOlumn: -1 };

    workSheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {


            if (cell.value === target) {

                cellCordnts.rOw = rowNumber;
                cellCordnts.cOlumn = colNumber;

            }

        })

    })

    return cellCordnts;

}

async function writeExcelTest(Sheet, filePath, target, moveTill, changedTo) {

    const workBook = new ExcelJs.Workbook();
    await workBook.xlsx.readFile(filePath);
    const workSheet = workBook.getWorksheet(Sheet);
    const rcellCordnts = await readExcelTest(workSheet, target);

    const cell1 = workSheet.getCell(rcellCordnts.rOw, rcellCordnts.cOlumn + moveTill.columnChange);
    cell1.value = changedTo;

    await workBook.xlsx.writeFile(filePath);



}

//writeExcelTest('Sheet1', '/Users/USER/Downloads/download.xlsx', 'Mango', {rowChange: 0, columnChange:2}, 350 );



test('Upload Download Excel Validation', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');

    const textSearch = 'Mango';
    let updatedValue = 310;

    const [download] = await Promise.all([

        page.waitForEvent('download'),//giving await since file is going to take some time to download

        page.getByRole('button', { name: 'Download' }).click(), //downloading the file
        
        

    ])

    const filePath = await download.path();

    await writeExcelTest('Sheet1', filePath, textSearch, { rowChange: 0, columnChange: 2 }, updatedValue);

    await page.locator('#fileinput').setInputFiles(filePath);// uploading the file

    const textLocator = page.getByText(textSearch);

    const desiredRowLocator = page.getByRole('row').filter({ has: textLocator });

    await expect(desiredRowLocator.locator('#cell-4-undefined')).toContainText(updatedValue.toString());


    await page.pause();


})



