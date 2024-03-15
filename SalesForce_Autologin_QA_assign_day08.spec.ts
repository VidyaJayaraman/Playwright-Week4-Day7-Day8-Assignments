/**
 * 
 * Assignment: 3
 * 
 * 1. Auto login to your Salesforce application
 * 2. Click the App launcher icon
 * 3. Click View All
 * 4. Enter Content in the Search box
 * 5. Click Content
 * 6. Click Chatter
 * 7. Click Question
 * 8. Fill the Question and Details field
 * 9. Click Ask
 * 10. Verify the Question and Details created
 * 
 */

import test, { expect } from "@playwright/test";

// Use the Auto login credentials stored in "credentials/loginStorage.json"

test.use({ storageState: "credentials/loginStorage.json" })

test(`Auto login to your Salesforce application`, async ({ page }) => {

    // Directly goto redirect url

    await page.goto("https://testleaf24-dev-ed.develop.lightning.force.com/lightning/setup/SetupOneHome/home");

    // Click View all and App launcher 

    await page.locator("//div[@class='slds-icon-waffle']").click();
    await page.waitForSelector("//button[text()='View All']")
    await page.locator("//button[text()='View All']").click();
    await page.waitForLoadState('load');

    // Enter Content in the Search box ,  Click Content
    await page.getByPlaceholder("Search apps or items...").fill("Content");
    await page.getByPlaceholder("Search apps or items...").focus()
    await page.keyboard.press("Enter");
    await page.click('//mark[text()="Content"]');

    // Click on Chatter & Click on Question & Fill Question and details

    await page.locator("//span[text()='Chatter']").click();
    await page.locator("//span[text()='Question'] ").click();
    await page.getByPlaceholder("What would you like to know?").fill("What is the name of the test case?");
    await page.locator("//div[@role='textbox']").fill("It is Auto login test case with session storage");
    await page.getByRole("button").filter({ hasText: "Ask" }).click();
    await page.waitForLoadState('load');

    // Verify the question

    const verifyQA = page.locator("//div[@class='cuf-body cuf-questionTitle forceChatterFeedBodyQuestionWithoutAnswer']/span").nth(0);
    const expectQA = await verifyQA.innerText();
    expect(expectQA).toContain("What is the name of the test");

})

