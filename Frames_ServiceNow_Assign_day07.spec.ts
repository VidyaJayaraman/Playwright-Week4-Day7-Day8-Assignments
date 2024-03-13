// 2 .ServiceNow -Ordering Mobile(Frames)
// ---------------------------
// Note: Steps to create your instance is attached under reference document. Kindly create your own instance and automate the application

// 1. Launch ServiceNow application
// 2. Login with valid credentials 
// 3. Click-All Enter Service catalog in filter navigator and press enter or Click the ServiceCatalog
// 4. Click on  mobiles
// 5. Select Apple iphone13pro
// 6. Choose yes option in lost or broken iPhone
// 7. Enter phonenumber as 99 in original phonenumber field
// 8. Select Unlimited from the dropdown in Monthly data allowance
// 9. Update color field to SierraBlue and storage field to 512GB
// 10. Click on Order now option
// 11. Verify order is placed

//Sample instance and credentials
//Url to be loaded
// https://dev201012.service-now.com/
// Credentials
// Username: admin (user_name)
// Password: 5lr8LUN!g+bM (user_password)


import{expect, test} from "@playwright/test"

test("handle alert", async({page,context})=>{   

//Either Css or playwright selextors are used to inspect the elements which present in shadow root.
// 1. Launch & Login ServiceNow application

await page.goto("https://dev201012.service-now.com/");
await page.fill("#user_name","admin");
await page.fill("#user_password","5lr8LUN!g+bM");
await page.getByRole("button").filter({hasText:'Log in'}).click();
await page.waitForLoadState("load");

// 3. Click-All Enter Service catalog in filter navigator and press enter or Click the ServiceCatalog
await page.getByRole("button").filter({hasText:'All'}).click();
await page.waitForTimeout(3000);
await page.getByPlaceholder("Filter").fill("Service Catalog");
await page.getByText("Service Catalog",{exact:true}).nth(0).click();

// 4. Click on  mobiles(inside frame)

const frameEle = page.frameLocator("#gsft_main");
await frameEle.getByAltText("Mobiles").click();
await page.waitForTimeout(3000);

// 5. Select Apple iphone13pro

await frameEle.locator("strong",{hasText:'Apple iPhone 13 pro'}).click();


// 6. Choose yes option in lost or broken iPhone

await frameEle.locator(".input-group-radio").first().click();

// 7. Enter phonenumber as 99 in original phonenumber field

await frameEle.locator("//span[contains(text(),'original phone number')]/following::input[2]").fill("99");

// 8. Select Unlimited from the dropdown in Monthly data allowance
// inspect the select tag inside frame and declare inside const after that use select options.

 const  selectEle = frameEle.locator("//select[contains(@class,'form-control cat_item_option')]");
 await  selectEle.selectOption({value:"unlimited"});


// 9. Update color field to SierraBlue and storage field to 512GB

  await frameEle.getByText("Sierra Blue",{exact:true}).click();
  await frameEle.getByText("512 GB [add $300.00]",{exact:true}).click();

// click on order now

await frameEle.locator("//button[@id='oi_order_now_button']").click();
await page.waitForTimeout(3000);

// Verify Order

const orderText = await frameEle.locator("//div[@class='notification notification-success']/span").innerText();
expect(orderText).toContain("submitted");
console.log(orderText);

})



 