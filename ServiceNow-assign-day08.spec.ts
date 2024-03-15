/*
 * Assignment:1
 * 
 * 1. Login to Servicenow application
 *          Load the url :https://dev87582.service-now.com/
 *          username: admin
 *          password:testleaf$123
 * 2. Click 'All'
 * 3. Enter 'Service Catalog' in the filter
 * 4. Click 'Service Catalog'
 * 5. Click 'Mobiles'
 * 6. Click 'Apple iPhone 13
 * 7. Fill all the fields present(handle dropdown and radio buttons)
 * 8. Click Order Now
 * 9. Verify the Order status
 * 
 */

import test, { expect } from "@playwright/test";


test("handle alert", async ({ page }) => {

    //Either Css or playwright selextors are used to inspect the elements which present in shadow root.
    // 1. Launch & Login ServiceNow application

    await page.goto("https://dev201012.service-now.com/");
    await page.fill("#user_name", "admin");
    await page.fill("#user_password", "5lr8LUN!g+bM");
    await page.getByRole("button").filter({ hasText: 'Log in' }).click();
    await page.waitForLoadState("load");

    // 3. Click-All Enter Service catalog in filter navigator and press enter or Click the ServiceCatalog
    await page.getByRole("button").filter({ hasText: 'All' }).click();
    await page.waitForTimeout(3000);
    await page.getByPlaceholder("Filter").fill("Service Catalog");
    await page.getByText("Service Catalog", { exact: true }).nth(0).click();

    // 4. Click on  mobiles(inside frame)

    const frameEle = page.frameLocator("#gsft_main");
    await frameEle.getByAltText("Mobiles").click();
    await page.waitForTimeout(3000);

    // 5. Select Apple iphone13pro

    await frameEle.locator("strong", { hasText: 'Apple iPhone 13' }).nth(0).click();

    // 6. Choose yes option in lost or broken iPhone

    await frameEle.locator(".input-group-radio").first().click();

    // 7. Enter phonenumber as 99 in original phonenumber field

    await frameEle.locator("//span[contains(text(),'original phone number')]/following::input[2]").fill("99");

    // 8. Select Unlimited from the dropdown in Monthly data allowance
    // inspect the select tag inside frame and declare inside const after that use select options.

    const selectEle = frameEle.locator("//select[contains(@class,'form-control cat_item_option')]");
    await selectEle.selectOption({ value: "Unlimited" });

    // 9. Update color field to SierraBlue and storage field to 512GB

    await frameEle.getByText("Midnight", { exact: true }).click();
    await frameEle.locator("//label[contains(text(),'512')]").click();
    await page.waitForTimeout(3000);

    // click on order now

    await frameEle.locator("//button[@id='oi_order_now_button']").click();
    await page.waitForTimeout(3000);

    // Verify Order

    const orderText = await frameEle.locator("//div[@class='notification notification-success']/span").innerText();
    expect(orderText).toContain("submitted");
    console.log(orderText);

})




