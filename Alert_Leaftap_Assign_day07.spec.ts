// MergeContact (Alert and windowHandle)
// -----------		  
// 1. Launch URL "http://leaftaps.com/opentaps/control/login"
// 2. Enter UserName and Password Using Id Locator
// 3. Click on Login Button using Class Locator
// 4. Click on CRM/SFA Link
// 5. Click on contacts Button
// 6. Click on Merge Contacts using Xpath Locator
// 7. Click on Widget of From Contact
// 8. Click on First Resulting Contact
// 9. Click on Widget of To Contact
// 10. Click on Second Resulting Contact
// 11. Click on Merge button using Xpath Locator
// 12. Accept the Alert
// 13. Verify the title of the page


import{test} from "@playwright/test"

test("handle alert", async({page,context})=>{   

await page.goto("http://leaftaps.com/opentaps/control/login");
await page.fill("#username","demoSalesManager");
await page.fill("#password","crmsfa");


// Alert Handling

page.once('dialog', async alertType => {
    console.log(alertType.type())
    const msg = alertType.message();
    console.log(msg);
    await alertType.accept();
}) 

await page.click(".decorativeSubmit");
await page.click("//a[contains(text(),'CRM/SFA')]");
await page.getByText("Contacts",{exact:true}).click();
await page.click("//a[text()='Merge Contacts']");


//handle additional window resulting first

const page1 =context.waitForEvent('page');
await page.click("//input[@id='partyIdFrom'] / following::img[1]");
const window1 = await page1;
console.log(window1.url());
await window1.bringToFront();

//Click on the first search result

await window1.locator("div[class='x-grid3-cell-inner x-grid3-col-partyId'] a").first().click();

//handle additional window resulting first

await page.bringToFront();
const page2 = context.waitForEvent('page');
await page.click("//input[@id='partyIdFrom'] / following::img[2]");
const window2 = await page2;
console.log(window2.url());
await window2.bringToFront();

//Click on the second search result

await window2.locator("div[class='x-grid3-cell-inner x-grid3-col-partyId'] a").nth(1).click();

// click on merge in original window and handle alert(code for alert has written already)

await page.bringToFront();
page.locator(".buttonDangerous",{hasText:"Merge"}).click();
await page.waitForTimeout(3000);

})

