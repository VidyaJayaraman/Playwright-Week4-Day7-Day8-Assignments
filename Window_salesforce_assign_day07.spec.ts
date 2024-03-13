/*

    Homework: Window
    Login to "https://login.salesforce.com/"
    Enter Username, Password and click Login
    ClicK 'Learn More' button under Mobile Publisher 
    Click 'Confirm' on the new window
    Verify and validate the title, url of the page
*/


import { chromium, expect, test } from "@playwright/test";
import { channel } from "diagnostics_channel";

test("To launch a browser", async ({ page,context }) => {

    await page.goto("https://login.salesforce.com");
    await page.locator("#username").fill("viddhu.j@gmail.com");
    await page.locator("#password").fill("Testcrm@789!");
    await page.locator("#Login").click();
    await page.waitForLoadState('load');
    const newWindow = context.waitForEvent('page');
    await page.locator("//span[text()=': Mobile Publisher'] /preceding-sibling::span").click();
    const newTab = await newWindow;
    await newTab.locator("//button[text()='Confirm']").click();
    await newTab.locator("//button[contains(text(),'Accept All')]").first().click();
    const newUrl = newTab.url();
    console.log(newUrl);
    const newTitle = await newTab.title();
    console.log(newTitle);
    expect(newUrl).toContain("products/platform/products");
    expect(newTitle).toContain("Create and Publish");

})
