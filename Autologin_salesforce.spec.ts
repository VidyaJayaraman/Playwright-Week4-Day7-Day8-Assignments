import {test} from "@playwright/test"

test(`Session Storage auto login`, async({page,context})=> {

await page.goto("https://login.salesforce.com/")
await page.fill("#username","viddhu.j@gmail.com");
await page.fill("#password","Testcrm@789!")
await page.click("#Login");

//To store the session

await page.context().storageState({ path:"credentials/loginStorage.json"})

})