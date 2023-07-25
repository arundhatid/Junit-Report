const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi = require("../../utils/methods/Login.Regre");
const login = require("../../utils/pageobjects/login.po.js");
const zoomToExtend = require("../../utils/methods/clearAllFilterAndViewMode");
const createNewPackage = require("../../utils/methods/packageCreation");

var expectchai = require("chai").expect;

describe("User can add/remove selected data using collection card:", async () => {
  after(async () => {
    await zoomToExtend.removeOldAction();
  });
  it("Create package with some data set", async () => {
    console.log("****Create package with some data set test started");
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Cheal");
    await (await searchPanel.$searchIcon).click();
    console.log("***Search cheal well log****");
    await createNewPackage.packageCreation();
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
    await (await Collections.$Resultsaved).waitForDisplayed();
    await browser.pause(3000);
  });
  it("Add data in package from menu button", async () => {
    console.log("*****Add data in package from menu button test started");
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
    await (await Collections.$AddItems).waitForDisplayed();
    await (await Collections.$AddItems).click();

    await (await Collections.$ResultAdded).waitForDisplayed();
    console.log("****Add items done");
    const AddedCount = await Collections.$Seismic2DCount;
    await expect(AddedCount).toHaveText(["1.5K"], "wronge result is added");
    await browser.pause(2000);
  });

  it("remove data in package from menu button", async () => {
    console.log("***remove data in package from menu button test started");
    await (await Collections.$MenuButton).waitForDisplayed();
    await (await Collections.$MenuButton).click();
    const RemoveItem = await (
      await Collections.$RemoveItems
    ).getAttribute("aria-disabled");
    console.log(RemoveItem);
    console.log(
      "*****remove Item should be active if there is data in left panel"
    );
    expectchai(RemoveItem).to.have.string("false");

    // await (await Collections.$AddItems).waitForClickable();
    // await (await Collections.$AddItems).click();

    // await (await Collections.$ResultAdded).waitForDisplayed();
    // const AddedCount = await Collections.$Seismic2DCount;
    // await expect(AddedCount).toHaveText(["1.5K"], "wronge result is added");
    // await (await Collections.$MenuButton).waitForClickable();
    // await (await Collections.$MenuButton).click();
    await (await Collections.$RemoveItems).waitForClickable();
    await (await Collections.$RemoveItems).click();
    console.log("***remove Items done");
    await (await Collections.$ResultRemoved).waitForDisplayed();
    const RemovedCount = await Collections.$Seismic2DCount;
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
    await (await Collections.$ResultRemoved).waitForDisplayed();
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
    await (await searchPanel.$crossResult).waitForDisplayed();
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

    await (await searchPanel.$searchIcon).waitForDisplayed();
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
    await (await Collections.$ToastMessage).waitForDisplayed();
    await browser.pause(3000);
    console.log("****checking the error message");
    await (await Collections.$ToastMessage).waitForDisplayed();
    console.log("****toaster appear");
    expectchai(await Collections.$ToastMessage.getText()).to.have.string(
      "Unable to add results, please try again."
    );
    expectchai(await Collections.$ToastMessage2.getText()).to.have.string(
      "The number of selected items exceeds the limit of"
    );
    console.log("****assert pass");
    await browser.pause(2000);
    await (await Collections.$MenuButton).click();
    await (await Collections.$deletButton).waitForClickable();
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await Collections.$Deleted).waitForDisplayed();
    await (await Collections.$collectionTray).waitForClickable();
    await (await Collections.$collectionTray).click();
    console.log("ADD AND REMOVE DATA FINISHED");
    await browser.pause(3000);
  });
});
