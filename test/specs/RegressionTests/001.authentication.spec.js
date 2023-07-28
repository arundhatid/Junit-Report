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
      const URL = "https://evq.discovery.cloud.slb-ds.com/";
      console.log(
        "value of id" +
          USER_ID +
          "pass" +
          PASSWORD +
          "url" +
          URL +
          "secret" +
          SECRET_KEY
      );
    
    const mapWebelement = await map.$map;

    console.log(
      "value of id" +
        USER_ID +
        "pass" +
        PASSWORD +
        "url" +
        URL +
        "secret" +
        SECRET_KEY
    );

    await browser.url(URL);

    try {
      await delfi
        .delfiLogin(USER_ID, PASSWORD, SECRET_KEY)
        .waitForDisplayed({ timeout: 10000 });
      await delfi.delfiLogin(USER_ID, PASSWORD, SECRET_KEY).isDisplayed();
      await delfi.delfiLogin(USER_ID, PASSWORD, SECRET_KEY);
      await (await login.$CloseBox).waitForDisplayed({ timeout: 10000 });
      await (await login.$CloseBox).click();
    } catch (e) {
      await mapWebelement.waitForDisplayed({ timeout: 200000 });
      console.log("****close Box is not display for this test user a/c*****");
    }
    console.log("*******title =" + (await browser.getTitle()));

    let titleMatch = (await browser.getTitle()).localeCompare("Data Discovery");
    console.log("***checking Authentication****");
    expectchai(
      (await browser.getTitle()).localeCompare("Data Discovery")
    ).to.be.equals(+0);
    console.log("*****" + titleMatch);
    await zoomToExtend.removeOldAction();
    })
      
  })


