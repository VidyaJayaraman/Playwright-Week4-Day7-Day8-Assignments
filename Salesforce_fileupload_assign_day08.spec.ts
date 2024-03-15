/* Assignment:2
 * 1. Log in to Salesforce application 
 * Note: Create a json fie for the username and password and login 
 * 2. Click the app launcher icon
 * 3. Click View All
 * 4. Enter Marketing in the Search text box
 * 5. Click Marketing
 * 6. Click Contacts dropdown
 * 7. Click New Contact
 * 8. Fill the mandatory fields
 * 9. Click Save
 * 10. Verify the Contact created
 * 11. Click Upload files and verify the file uploaded
 * 12. Click View All
 * 13. Click the uploaded file
 * 14. Download the file and save it in your directory
 * 
 */

import { expect, test } from "@playwright/test"
import fs from 'fs'
import path from 'path'

const testData = JSON.parse(fs.readFileSync(path.join(__dirname, "login1DataSalesForce.json"), 'utf-8'));

test(`Read data from JSON test case ${testData.Testcase}`, async ({ page }) => {

    // Log in to Salesforce application  & click Apps launcher

    await page.goto("https://login.salesforce.com/?Login");
    await page.fill("#username", testData.Username);
    await page.fill("#password", testData.Password);
    await page.locator("#Login").click();
    await page.waitForLoadState('load');

    await page.locator("//div[@class='slds-icon-waffle']").click();
    await page.waitForSelector("//button[text()='View All']")
    await page.locator("//button[text()='View All']").click();
    await page.waitForLoadState('load');

    // To search for Marketting (facing laoding issues)

    await page.getByPlaceholder("Search apps or items...").fill("Marketing");
    await page.getByPlaceholder("Search apps or items...").focus()
    await page.keyboard.press("Enter");
    await page.click('//mark[text()="Marketing"]');

    // Create a new Contact 

    await page.locator("//span[text()='Contacts']/following::*[local-name()='svg'][1]").click();
    await page.getByText("New Contact", { exact: true }).click();
    await page.locator("//button[@name='salutation']").click()
    await page.locator("//span[contains(@title,'Mrs.')]").click();
    await page.getByPlaceholder("First Name").fill("Vidya");
    await page.getByPlaceholder("Last Name").fill("Jayaraman");
    await page.locator("//button[@name='SaveEdit']").click();

    // Verify the "contact was created "

    const outputContact = await page.locator(" //span[contains( @class,'toastMessage')]").innerText();
    console.log(outputContact);
    expect(outputContact).toContain("created")
    await page.waitForTimeout(5000);

    // Upload a file (It has type as Input file) First mouse Hover to upload file section.

    const text1 = page.locator('//span[text()="Notes & Attachments"]')
    await expect(text1).toBeVisible({ timeout: 10000 })
    await text1.hover({ force: true })

    const text2 = page.locator("//div[text()='Upload Files']");
    expect(text2).toBeVisible({ timeout: 10000 });
    await text2.hover({ force: true });

    await page.setInputFiles("input[type='file']", 'C:/Users/ol56/Desktop/Playwright new/Playwright new Tesleaf/tests/Day8-JS-TS/Fileupload/CssSelector.txt')
    await page.locator("//span[contains(@class,'label bBody')]").click();
    await page.waitForTimeout(3000);

    //To verify file

    const viewAll = page.locator("//span[text()='Notes & Attachments']//following::span[text()='View All']")
    await viewAll.click({ force: true })
    await page.waitForSelector("//span[@class='itemTitle desktop outputTextOverride uiOutputText']");
    const uploadFilename = await page.locator("//span[@class='itemTitle desktop outputTextOverride uiOutputText']").getAttribute("title");
    expect(uploadFilename).toContain("Css");
    console.log("FileUpload successful");

    // To download the uploaded File

    const downArrow = page.locator("div[class='forceVirtualActionMarker forceVirtualAction'] a ")
    expect(downArrow).toBeVisible({ timeout: 10000 });
    await downArrow.click();

    const fileToDownload = page.waitForEvent('download');
    await page.locator("//a[@title='Download']").click();
    const filepath1 = await fileToDownload;
    await filepath1.saveAs("downloaded files/" + (await fileToDownload).suggestedFilename());

})





