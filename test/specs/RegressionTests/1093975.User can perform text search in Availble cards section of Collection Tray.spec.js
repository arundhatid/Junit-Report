const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const map = require("../../utils/pageobjects/map.po");
const delfi = require("../../utils/methods/Login.Regre");
const zoomToExtend = require("../../utils/methods/clearAllFilterAndViewMode");
const login = require("../../utils/pageobjects/login.po.js");
const Collections = require("../../utils/pageobjects/collections.po");
const createNewPackage = require("../../utils/methods/packageCreation");

var expectchai = require("chai").expect;

describe(" Perform text search in Availble cards section of Collection Tray :", async () => {
  after(async () => {
    await zoomToExtend.removeOldAction();
  });
  it("Verify Text search in Collection Tray when none of the filter is selected", async () => {
    const layer = "cheal";
    const mapWebelement = await map.$map;
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
    ).setValue("coll_Avaliable cards" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("coll_Avaliable cards Testing Descriptions");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    await (await Collections.$collectionTray).waitForDisplayed();
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await (await Collections.$Resultsaved).waitForDisplayed();
    await browser.pause(3000);
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();

    await zoomToExtend.zoomToExtend(layer);
    await browser.pause(3000);
    // await (await map.$zoomplus).waitForClickable();
    // await (await map.$zoomplus).click();

    //click on rect selection
    console.log("*****rectangular selection");
    await map.$rectSelect.waitForClickable();
    await map.$rectSelect.click();
    const rectSelect = await map.$rectSelect;
    expect(rectSelect).toBeClickable();
    await browser.pause(5000);
    await mapWebelement.dragAndDrop({ x: 100, y: 50 });
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
    ).setValue("Coll For Text_Search" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll Coll For Text_Search Testing Descriptions");
    await (await Collections.$checkBox).waitForDisplayed();
    await (await Collections.$checkBox).waitForClickable({ timeout: 80000 });
    await (await Collections.$checkBox).click();
    console.log("***save coll*****");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).waitForClickable();
    await (await Collections.$collectionTray).click();
    await (await Collections.$Resultsaved).waitForDisplayed();
    await (
      await Collections.$collSearchBox
    ).waitForClickable({ timeout: 90000 });
    await (await Collections.$collSearchBox).click();
    console.log("***click on coll search box");
    await (await Collections.$collSearchBox).setValue("Available cards");
    await (await Collections.$collSearchIcon).waitForDisplayed();
    await (await Collections.$collSearchIcon).click();

    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll_Avaliable Cards"
    );
    console.log("*****entered text is appear in Available Cards");
    await browser.pause(3000);
    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Text_Search"
    );
    console.log("****verify Active Cards section is remain as it is");

    await browser.pause(3000);
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await browser.pause(5000);
  });

  it("Verify Text search in Collection Tray when Collections filter is selected", async () => {
    console.log(
      "**** Verify Text search in Collection Tray when Collections filter is selected started"
    );
    await (await Collections.$collectionTray).click();
    await (await Collections.$collectionChip).waitForClickable();
    await (await Collections.$projectChip).click();
    await (
      await Collections.$collSearchBox
    ).waitForClickable({ timeout: 90000 });
    await (await Collections.$collSearchBox).click();
    console.log("***click on coll search box");
    await (await Collections.$collSearchBox).setValue("Available cards");
    await (await Collections.$collSearchIcon).waitForDisplayed();
    await (await Collections.$collSearchIcon).click();

    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll_Avaliable Cards"
    );
    console.log("*****entered text is appear in Available Cards");
    await browser.pause(4000);
    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Text_Search"
    );
    console.log("****verify Active Cards section is remain as it is");
    await browser.pause(2000);
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await browser.pause(5000);
  });

  it("Verify Text search in Collection Tray when Filter available Collections/Projects filter is selected", async () => {
    console.log(
      "******Verify Text search in Collection Tray when Filter available Collections/Projects filter is selected started"
    );
    await (await searchPanel.$crossResult).waitForDisplayed();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(3000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForClickable({ timeout: 90000 });
    await (await searchPanel.$firstSearchResults).click();
    console.log("******click on layer******");
    await browser.pause(3000);
    await (
      await searchPanel.$filterAvailableCollectionsProjects
    ).waitForClickable();
    await (await searchPanel.$filterAvailableCollectionsProjects).click();
    console.log("****click on filter avl coll/ project");
    await browser.pause(3000);

    expectchai(await Collections.$customChip.getText()).to.have.string(
      "Cheal-A6 ST1"
    );
    await browser.pause(3000);

    const collectionChip = await (
      await Collections.$collectionChip
    ).getAttribute("class");
    console.log(collectionChip);
    expectchai(
      await (await Collections.$collectionChip).getAttribute("class")
    ).to.have.string(
      "mat-mdc-chip mat-mdc-tooltip-trigger mat-primary mdc-evolution-chip mat-mdc-standard-chip filter-selected"
    );

    await (
      await Collections.$collSearchBox
    ).waitForClickable({ timeout: 90000 });
    await (await Collections.$collSearchBox).click();
    console.log("***click on coll search box");
    await (await Collections.$collSearchBox).setValue("Available cards");
    await (await Collections.$collSearchIcon).waitForClickable();
    await (await Collections.$collSearchIcon).click();

    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Text_Search"
    );
    console.log("****verify Active Cards section is remain as it is");
    await browser.pause(3000);

    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll_Avaliable Cards"
    );
    console.log("*****entered text is appear in Available Cards");
    await browser.pause(2000);
  });

  it("Verify 'No Collections and Projects available' message", async () => {
    console.log(
      "Verify 'No Collections and Projects available' message test started"
    );
    await (await Collections.$collSearchBox).setValue("hyxe");
    await (await Collections.$collSearchIcon).waitForDisplayed();
    await (await Collections.$collSearchIcon).click();
    await (await Collections.$noCollAvl).waitForDisplayed();
    expectchai(await Collections.$noCollAvl.getText()).to.have.string(
      "No Collections or Projects Available"
    );
    console.log("No Collections or Projects Available is display");
    await browser.pause(4000);

    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Text_Search"
    );
    console.log("****verify Active Cards section is remain as it is");
    await (await Collections.$collSearchBox).click();
    await (await Collections.$MenuButton).waitForDisplayed();
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await Collections.$Deleted).waitForDisplayed();
    console.log("***1 coll delete");
    await browser.pause(3000);
    await (await Collections.$MenuButton).waitForDisplayed();
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await Collections.$Deleted).waitForDisplayed();
    await (await Collections.$closeCustomChip).waitForClickable();
    await (await Collections.$closeCustomChip).click();
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);
    console.log("******AVL CARD FINISHED");
    await browser.pause(3000);
  });
});
