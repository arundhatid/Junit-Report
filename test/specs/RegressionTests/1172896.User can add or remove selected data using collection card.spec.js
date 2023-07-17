const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi = require("../../utils/methods/Login.Regre");
const login = require("../../utils/pageobjects/login.po.js");
const zoomToExtend = require("../../utils/methods/zoomToExtend");

var expectchai = require("chai").expect;

describe("User can add/remove selected data using collection card:", async () => {
  before(async () => {
    var USER_ID = process.env["TESTUSER1"];
    var PASSWORD = process.env["TESTUSERPASSWORD1"];
    var SECRET_KEY = process.env["SECRET_KEY1"];
    const URL = "https://evq.discovery.cloud.slb-ds.com/";
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

      console.log("*******title =" + (await browser.getTitle()));

      let titleMatch = (await browser.getTitle()).localeCompare(
        "Data Discovery"
      );
      console.log("***checking Authentication****");
      expectchai(
        (await browser.getTitle()).localeCompare("Data Discovery")
      ).to.be.equals(+0);
      console.log("*****" + titleMatch);
      console.log("****close Box is not display for this test user a/c*****");
    }
    await zoomToExtend.removeOldAction();
  });
  it("Create package with some data set", async () => {
    console.log("****Create package with some data set test started");
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Cheal");
    await (await searchPanel.$searchIcon).click();

    console.log("***Search cheal well log****");
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (await searchPanel.$firstSearchResults).moveTo();
    await browser.pause(3000);
    await (await searchPanel.$firstSearchResults).moveTo();
    await (await Collections.$Actions).waitForClickable({ timeout: 90000 });
    await Collections.$Actions.click();
    await Collections.$collectionMenu.click();
    await (await Collections.$Add).waitForClickable({ timeout: 80000 });
    await Collections.$Add.click();
    await (
      await Collections.$newCollection
    ).waitForClickable({ timeout: 80000 });
    await Collections.$newCollection.click();
    console.log("****Creating collection****");
    await (await Collections.$collectionName).waitForDisplayed();
    await browser.pause(3000);
    var ts = String(new Date().getTime());
    var k = "value";
    var i = 0;
    for (i = 1; i < ts.length; i++) {
      eval("var " + k + i + "= " + i + ";");
    }
    var change = ts++;
    console.log("change =" + change);
    await (
      await Collections.$collectionName
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionName
    ).setValue("Package_Add/Remove Data" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Package_Add/Remove Data");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    await (await Collections.$collectionTray).waitForDisplayed();
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await (await $("//div[text()='Results saved.']")).waitForDisplayed();
    await browser.pause(3000);
  });
  it("Add/remove data in package from menu button", async () => {
    console.log(
      "*****Add/remove data in package from menu button test started"
    );
    await (await searchPanel.$searchBox).waitForDisplayed();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("nz 2d line");
    await (await searchPanel.$searchIcon).click();
    await (await searchPanel.$firstSearchResults).waitForDisplayed();
    expectchai(await (await searchPanel.$firstSearchResults).isDisplayed()).to
      .be.true;
    console.log("****left panel have data");
    await (await Collections.$MenuButton).waitForDisplayed();
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    const AddItem = await (
      await Collections.$AddItems
    ).getAttribute("aria-disabled");
    console.log(AddItem);
    console.log(
      "*****add Items should be active if there is data in left panel"
    );
    expectchai(AddItem).to.have.string("false");
    const RemoveItem = await (
      await Collections.$RemoveItems
    ).getAttribute("aria-disabled");
    console.log(RemoveItem);
    console.log(
      "*****remove Item should be active if there is data in left panel"
    );
    expectchai(RemoveItem).to.have.string("false");

    await (await Collections.$AddItems).waitForClickable();
    await (await Collections.$AddItems).click();
    console.log("****Add items done");
    await (await $("//div[text()='Results added.']")).waitForDisplayed();
    const AddedCount = await $("(//div[@class='count'])[2]");
    await expect(AddedCount).toHaveText(["1.5K"], "wronge result is added");
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    await (await Collections.$RemoveItems).waitForClickable();
    await (await Collections.$RemoveItems).click();
    console.log("***remove Items done");
    await (await $("//div[text()='Results removed.']")).waitForDisplayed();
    const RemovedCount = await $("(//div[@class='count'])[2]");
    await expect(RemovedCount).toHaveText(
      ["0"],
      "Result is not removed correctly"
    );
    await (await searchPanel.$searchBox).waitForDisplayed();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("cheal");
    await (await searchPanel.$searchIcon).click();
    await (await searchPanel.$firstSearchResults).waitForDisplayed();
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    await (await Collections.$RemoveItems).waitForClickable();
    await (await Collections.$RemoveItems).click();
    console.log("***remove all data Items from Package");
    await (await $("//div[text()='Results removed.']")).waitForDisplayed();
    await browser.pause(2000);
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    const RemoveItem1 = await (
      await Collections.$RemoveItems
    ).getAttribute("aria-disabled");
    console.log(RemoveItem1);
    console.log(
      "*****remove Item should be inactive if there is not data in Package"
    );
    expectchai(RemoveItem1).to.have.string("true");

    await (await Collections.$MenuButton).click();
    await browser.pause(2000);
  });
  it("Verifly the ADD and remove button If there is not data in left Panel", async () => {
    console.log("******If there is not data in left Panel test started");
    await (await searchPanel.$crossResult).waitForClickable();
    await (await searchPanel.$crossResult).click();
    await browser.pause(5000);
    await (await Collections.$MenuButton).waitForDisplayed();
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    const AddItems = await (
      await Collections.$AddItems
    ).getAttribute("aria-disabled");
    expectchai(AddItems).to.have.string("true");
    const RemoveItem = await (
      await Collections.$RemoveItems
    ).getAttribute("aria-disabled");
    console.log(RemoveItem);
    expectchai(RemoveItem).to.have.string("true");
    expectchai(await (await Collections.$AddItems).isClickable()).to.be.not
      .true;
    expectchai(await (await Collections.$RemoveItems).isClickable()).to.be.not
      .true;
    await (await Collections.$MenuButton).click();
    await browser.pause(3000);
  });
  it("verify the Error message when data exceeds the 30K limit   ", async () => {
    console.log(
      "*****verify the Error message when data exceeds the 30K limit test started  "
    );

    await (await searchPanel.$searchIcon).waitForClickable();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (await searchPanel.$firstSearchResults).moveTo();
    await browser.pause(3000);
    await (await Collections.$MenuButton).waitForDisplayed();
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    await (await Collections.$AddItems).waitForClickable();
    await (await Collections.$AddItems).click();

    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    await browser.pause(3000);
    console.log("****checking the error message");
    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    console.log("****toaster appear");
    const toasterSaveError = await (
      await $("//div[contains(text(),'Unable to add results')]")
    ).getText();
    console.log("****unable to save");
    expectchai(toasterSaveError).to.have.string(
      "Unable to add results, please try again."
    );
    console.log("****assert pass");
    await browser.pause(2000);
    await (await Collections.$MenuButton).click();
    await (await Collections.$deletButton).waitForClickable();
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();
    await (await Collections.$collectionTray).waitForClickable();
    await (await Collections.$collectionTray).click();
    console.log("ADD AND REMOVE DATA FINISHED");
    await browser.pause(3000);
  });
});
