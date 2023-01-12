const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi = require("../../utils/methods/Login");
const login = require("../../utils/pageobjects/login.po.js");

var expectchai = require("chai").expect;
const path = require("path");
const fs = require("fs");
var multiResultsflag = false;
var singleResultflag = false;
describe("Create a collection:", async () => {
  before(async () => {
    const USER_ID = "DELFI-6976-SM-009@slb.com";
    const PASSWORD = "Second^12345";
    const URL = "https://data.discovery.delfi.slb.com/";
    const SECRET_KEY = "fssknsltfkc2sxhy";
    await browser.url(URL);
    console.log("title =" + (await browser.getTitle()));
    try {
      await delfi.delfiLogin(USER_ID, PASSWORD, SECRET_KEY);
      console.log("title =" + (await browser.getTitle()));
      await (await login.$CloseBox).waitForDisplayed();
      await (await login.$CloseBox).click();
    } catch (e) {
      console.log("***run 3 test case simultenously*****");
      console.log("****close Box is not display for this test user a/c*****");
    }

   // try {
    //  await (await login.$CloseBox).waitForDisplayed();
   //   await (await login.$CloseBox).click();
   // } catch (e) {
   //   console.log("****close Box is not display for this test user a/c*****");
   // }

    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    expectchai(await searchPanel.$searchBox.isDisplayed()).to.be.true;
  });

  it("Data Selection & create simple collection", async () => {
    await (await searchPanel.$searchIcon).waitForClickable({ timeout: 40000 });
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(5000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForClickable({ timeout: 90000 });
    await (await searchPanel.$firstSearchResults).click();
    console.log("******click on layer******");
    await (
      await $(
        "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
      )
    ).waitForClickable({ timeout: 80000 });
    await (
      await $(
        "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
      )
    ).click();
    await (await Collections.$Actions).waitForClickable({ timeout: 80000 });
    await Collections.$Actions.click();
    await Collections.$Add.click();
    await Collections.$Add.click();
    await (
      await Collections.$newCollection
    ).waitForClickable({ timeout: 80000 });
    await Collections.$newCollection.click();
    console.log("******Create Collection******");

    await (await $("(//form//input)[1]")).waitForDisplayed({ timeout: 80000 });
    await browser.pause(3000);
    await (await Collections.$collectionName).waitForDisplayed();
    await (
      await Collections.$collectionName
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionName).setValue("Probe Testing");
    console.log("*****enter collection name****");
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Probe Testing Descriptions");
    console.log("*****enter description*****");
    await (await Collections.$checkBox).waitForDisplayed();
    await (await Collections.$checkBox).waitForClickable({ timeout: 80000 });
    await (await Collections.$checkBox).click();
    console.log("*******make it active collection*******");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    console.log("****saved coll****");

    const activeProbeCard = await $("div.active-cards pioneer-collection-item");
    const cardTitle = await (
      await activeProbeCard.$("div.collection-container__title h6")
    ).getText();
    expectchai(cardTitle).to.have.string("Probe Testing");
    console.log("*****Validate Collection*******");

    await (await $("//button[@class='button-pin-tray']")).waitForDisplayed();
    await (await $("//button[@class='button-pin-tray']")).click();

    await (
      await activeProbeCard.$('mat-icon[svgicon="more"]')
    ).waitForClickable({ timeout: 80000 });
    await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click();
    await (
      await $("//button[text()='Delete']")
    ).waitForClickable({ timeout: 80000 });

    await (await $("//button[text()='Delete']")).click();
    console.log("*****Delete the collection*******");

    await (
      await $("mat-dialog-container")
    ).waitForClickable({ timeout: 80000 });
    await (await $("//span[normalize-space()='Confirm']")).click();
    console.log("*******validate the delete container******");

    await (await Collections.$closeCollectionTray).waitForDisplayed();
    await (
      await Collections.$closeCollectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$closeCollectionTray).click();
    await browser.pause(5000);
    expectchai(
      await (await $("div.active-cards pioneer-collection-item")).isDisplayed()
    ).to.be.not.true;
  });
});
