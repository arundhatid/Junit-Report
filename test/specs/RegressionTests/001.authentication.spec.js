const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const map = require("../../utils/pageobjects/map.po");
const delfi = require("../../utils/methods/Login.Regre");
const login = require("../../utils/pageobjects/login.po.js");
const zoomToExtend = require("../../utils/methods/clearAllFilterAndViewMode");
var expectchai = require("chai").expect;

  describe("browser Launch:", async () => {
    
    it("Authentication", async () => {
      var USER_ID = process.env["TESTUSER1"];
      var PASSWORD = process.env["TESTUSERPASSWORD1"];
      var SECRET_KEY = process.env["SECRET_KEY1"];
      var URL = process.env["CDD_URL"]
      
      
    
    //const mapWebelement = await map.$map;

    await delfi.delfiLogin(USER_ID, PASSWORD, SECRET_KEY,URL);
    try {
      // await delfi
      //   .delfiLogin(USER_ID, PASSWORD, SECRET_KEY)
      //   .waitForDisplayed({ timeout: 10000 });
      // await delfi.delfiLogin(USER_ID, PASSWORD, SECRET_KEY).isDisplayed();
      // await delfi.delfiLogin(USER_ID, PASSWORD, SECRET_KEY);
      //await delfi.delfiLogin(USER_ID, PASSWORD, SECRET_KEY,URL);
      // if (await login.$CloseBox.isDisplayed())
      // {
      //   await (await login.$CloseBox).waitForDisplayed({ timeout: 10000 });
      //   await (await login.$CloseBox).click();
      // }
      // else
      // {
      //   console.log('Closebox is not displayed')
      // }
    } catch (e) {
      //await mapWebelement.waitForDisplayed({ timeout: 200000 });
      //console.log("****close Box is not display for this test user a/c*****");
      console.log('Failure in the delfi login')
    }
    console.log("*******title =" + (await browser.getTitle()));

    let titleMatch = (await browser.getTitle()).localeCompare("Data Discovery");
    console.log("***checking Authentication****");
    console.log("Browser title is: " + await browser.getTitle())
    expectchai(
      (await browser.getTitle()).localeCompare("Data Discovery")
    ).to.be.equals(+0);
    console.log("*****" + titleMatch);
    await browser.pause(10000);
    await zoomToExtend.removeOldAction();
    })
      
  })


