const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi = require("../../utils/methods/Login");
const login = require("../../utils/pageobjects/login.po.js");
var expectchai = require("chai").expect;
const path = require("path");
const fs = require("fs");
var multiResultsflag = false;
var singleResultflag = false;
const { createJSHandle } = require("puppeteer-core");
const {
  default: isDisplayed,
} = require("webdriverio/build/commands/element/isDisplayed");
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
      await (await login.$CloseBox).click();
    } catch (e) {
      console.log("***run 3 test case simultenously*****");
      console.log("****close Box is not display for this test user a/c*****");
    }
  
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    expectchai(await searchPanel.$searchBox.isDisplayed()).to.be.true;
  });

  it("Create Collection by well log & Add Layer in Active coll", async () => {
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await searchPanel.$searchIcon).waitForClickable({ timeout: 10000 });
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Cheal");
    await (await searchPanel.$searchIcon).click();
    console.log("***Search cheal well log****");
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    if ((await searchPanel.$firstSearchResults).isDisplayed) {
      await browser.pause(5000);
      await (await Collections.$Actions).waitForClickable({ timeout: 90000 });
      await Collections.$Actions.click();
      await (await Collections.$Add).waitForClickable({ timeout: 80000 });
      await Collections.$Add.click();
      await (
        await Collections.$newCollection
      ).waitForClickable({ timeout: 80000 });
      await Collections.$newCollection.click();
      console.log("****Creating collection****");
      await (await Collections.$collectionName).waitForDisplayed();
      await browser.pause(3000);
      await (
        await Collections.$collectionName
      ).waitForClickable({ timeout: 80000 });
      await (
        await Collections.$collectionName
      ).setValue("Coll for Probe Testing");
      await (await Collections.$collectionDiscreption).waitForDisplayed();
      await (
        await Collections.$collectionDiscreption
      ).waitForClickable({ timeout: 80000 });
      await (
        await Collections.$collectionDiscreption
      ).setValue("Coll for Probe Testing Descriptions");
      await (await Collections.$checkBox).waitForDisplayed();
      await (await Collections.$checkBox).waitForClickable({ timeout: 80000 });
      await (await Collections.$checkBox).click();
      console.log("***make coll active*****");
      await (
        await Collections.$saveButton
      ).waitForClickable({ timeout: 80000 });
      await (await Collections.$saveButton).click();

      await (await Collections.$collectionTray).waitForDisplayed();
      await (
        await Collections.$collectionTray
      ).waitForClickable({ timeout: 80000 });
      await (await Collections.$collectionTray).click();
      await browser.pause(5000);
    } else {
      console.log("cheal well log is not avl");
    }

    const activeProbeCard = await $("div.active-cards pioneer-collection-item");
    const cardTitle = await (
      await activeProbeCard.$("div.collection-container__title h6")
    ).getText();
    expectchai(cardTitle).to.have.string("Probe Testing");
    console.log("*****validating if collection card is present of not*****");
    //Adding 3D in active coll
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("BO_3D");
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    if ((await searchPanel.$firstSearchResults).isDisplayed) {
      await browser.pause(5000);
      await (
        await searchPanel.$firstSearchResults
      ).waitForClickable({ timeout: 80000 });
      await (await searchPanel.$firstSearchResults).click();
      await (
        await $(
          "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
        )
      ).waitForDisplayed();
      await (
        await $(
          "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
        )
      ).click();
      console.log("*****Adding 3D Seismic******");

      await (await Collections.$Actions).waitForClickable({ timeout: 80000 });
      await Collections.$Actions.click();
      await Collections.$Add.click();
      await Collections.$Add.click();

      await (
        await Collections.$activeCollections
      ).waitForClickable({ timeout: 80000 });
      await Collections.$activeCollections.click();
      await browser.pause(5000);
      console.log("*****Adding 3D Seismic In active coll****");
    } else {
      console.log("BO_3D 3D Seismic is not avl");
    }
    //Adding 2D Sesmic layer in active coll
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("PEG0909M1000");
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    if ((await searchPanel.$firstSearchResults).isDisplayed) {
      await (await searchPanel.$firstSearchResults).click();
      await (await searchPanel.$firstSearchResults).waitForClickable();

      await (
        await $("(//div[@class='search-item-row'])[1]")
      ).waitForDisplayed();
      await (await $("(//div[@class='search-item-row'])[1]")).click();
      console.log("*****Adding 2D Seismic*****");
      await (await Collections.$Actions).waitForClickable({ timeout: 80000 });
      await Collections.$Actions.click();
      await browser.pause(3000);
      await Collections.$Add.click();
      await Collections.$Add.click();
      
      await (
        await Collections.$activeCollections
      ).waitForClickable({ timeout: 80000 });
      await Collections.$activeCollections.click();
      await browser.pause(5000);
      console.log("****Adding 2D Seismic in active coll****");
    } else {
      console.log("PEG0909M1000 2D Seismic is not avl");
    }
    //Aading Prospect in active coll
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Hector");
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    if ((await searchPanel.$firstSearchResults).isDisplayed) {
      await browser.pause(5000);
      await (
        await searchPanel.$firstSearchResults
      ).waitForClickable({ timeout: 80000 });
      await (await searchPanel.$firstSearchResults).click();
      await (
        await $(
          "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
        )
      ).waitForDisplayed();
      await (
        await $(
          "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
        )
      ).click();
      console.log("******Adding Prospects****");
      await (await Collections.$Actions).waitForClickable({ timeout: 80000 });
      await Collections.$Actions.click();
      await (await Collections.$Add).waitForClickable();
      await Collections.$Add.click();

      await (
        await Collections.$activeCollections
      ).waitForClickable({ timeout: 80000 });
      await Collections.$activeCollections.click();
      console.log("******Adding Prospects in active coll*****");

      await browser.pause(5000);
      await (
        await Collections.$closeCollectionTray
      ).waitForClickable({ timeout: 80000 });
      await (await Collections.$closeCollectionTray).click();

      await (await searchPanel.$crossResult).click();
      await browser.pause(10000);
    } else {
      console.log("Hector Prospects is not avl");
    }

    //Enable Focus mode & delet one layer from active coll
    await (await $("//mat-icon[@data-mat-icon-name='target-icon']")).click();
    await browser.pause(5000);
    console.log(
      "*******Enable focus mode & remove one layer from active collection******"
    );

    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (
      await $("(//div[@class='search-item-row']/div)[2]")
    ).waitForDisplayed();
    await (
      await $("(//div[@class='search-item-row']/div)[3]")
    ).waitForDisplayed();
    await (
      await $("(//div[@class='search-item-row']/div)[4]")
    ).waitForDisplayed();
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    expectchai(
      await $("(//div[@class='search-item-row']/div)[2]").isDisplayed()
    ).to.be.true;
    expectchai(
      await $("(//div[@class='search-item-row']/div)[3]").isDisplayed()
    ).to.be.true;
    expectchai(
      await $("(//div[@class='search-item-row']/div)[4]").isDisplayed()
    ).to.be.true;
    const elem1 = await $("(//div[@class='search-item-row']/div)[1]/div");
    expect(elem1).toHaveTextContaining(
      [" Prospects (1) "],
      "focus mode is not working"
    );
    const elem2 = await $("(//div[@class='search-item-row']/div)[2]/div");
    expect(elem2).toHaveTextContaining(
      [" Seismic 2D Line (1) "],
      "focus mode is not working"
    );
    const elem3 = await $("(//div[@class='search-item-row']/div)[3]/div");
    expect(elem3).toHaveTextContaining(
      [" Seismic 3D Survey (1) "],
      "focus mode is not working"
    );
    const elem4 = await $("(//div[@class='search-item-row']/div)[4]/div");
    expect(elem4).toHaveTextContaining(
      [" Well Log (38) "],
      "focus mode is not working"
    );
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 90000 });
    await browser.pause(5000);
    console.log("******click on first layer*****");
    await (
      await searchPanel.$firstSearchResults
    ).waitForClickable({ timeout: 90000 });
    await (await searchPanel.$firstSearchResults).click();
    await (await searchPanel.$firstSearchResults).click();
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
    await Collections.$Actions.click();
    await browser.pause(2000);
    await Collections.$removeFrom.click();
    await Collections.$removeFrom.click();
    console.log("****remove prospect from active coll*****");

    await (
      await Collections.$activeCollections
    ).waitForClickable({ timeout: 80000 });
    await Collections.$activeCollections.click();
    console.log("*****remove layer from active coll*****");
    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).click();
    await (
      await activeProbeCard.$('mat-icon[svgicon="more"]')
    ).waitForClickable({ timeout: 80000 });
    await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click();
    await (await Collections.$deletButton).waitForDisplayed();
    console.log("****click on delet button******");
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    console.log("*****Delete the collection******");
    //validate the delete container
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await $("//span[normalize-space()='Confirm']")).click();
    console.log("******Confrim Delete the collection*******");
    await (await Collections.$closeCollectionTray).waitForDisplayed();
    await (
      await Collections.$closeCollectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$closeCollectionTray).click();
    await browser.pause(2000);
    expectchai(
      await (await $("div.active-cards pioneer-collection-item")).isDisplayed()
    ).to.be.not.true;
  });
});
