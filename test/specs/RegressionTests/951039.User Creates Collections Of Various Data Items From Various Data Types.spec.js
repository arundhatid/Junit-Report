const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi = require("../../utils/methods/Login.Regre");
const login = require("../../utils/pageobjects/login.po.js");
const Package = require("../../utils/pageobjects/package.po.js");
const zoomToExtend = require("../../utils/methods/clearAllFilterAndViewMode");
const createNewPackage = require("../../utils/methods/packageCreation");

var expectchai = require("chai").expect;

describe("Create a collections:", async () => {
  after(async () => {
    await zoomToExtend.removeOldAction();
  });

  it("Verify creation and display of Active Well collection", async () => {
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await layers.$normalclick).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await browser.pause(3000);
    console.log("click on well hide button");
    await (await layers.$WellLayerHideBtn).waitForClickable();
    await (await layers.$WellLayerHideBtn).click();
    await (await layers.$WellLayerDropdown).waitForClickable();
    await (await layers.$WellLayerDropdown).click();
    await browser.pause(3000);
    console.log("****well filetr");
    await (await layers.$WellFilter).waitForClickable();
    await (await layers.$WellFilter).click();
    const cross = await (
      await searchPanel.$backOrClose
    ).getAttribute("data-slb-id");
    console.log(cross)
    if (cross == "side-panel-header-close-button") {
      await (await searchPanel.$crossResult).click();
    } else {
      await (await layers.$backLayerArrow).click();
    }
    //await (await searchPanel.$crossResult).click();
    await browser.pause(3000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
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
    ).setValue("Well Logs Coll" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll for Well Logs Descriptions");
    await (await Collections.$checkBox).waitForClickable();
    await (await Collections.$checkBox).click();
    await browser.pause(3000);
    await (await Collections.$saveButton).click();
    await browser.pause(3000);
    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);
    console.log(await Collections.$activeCardColl.getText());
    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Well Logs Coll" + change
    );
    console.log("***verify coll Title");
    expectchai(
      await (await Package.$dateTime).getAttribute("svgicon")
    ).to.have.string("datetime");
    console.log("****created on");
    await browser.pause(2000);
    expectchai(
      await (await Package.$createdBY).getAttribute("class")
    ).to.have.string("creator");
    console.log("***created By");
    expectchai(
      await (await Package.$wellIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("Well");
    console.log("****1st icon should be well");
    expectchai(
      await (await Package.$2DlineIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("2d-line");
    console.log("*****2nd icon 2D icon");
    expectchai(
      await (await Package.$3DSurveyIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("3d-survey");
    console.log("****3rd icon 3d survey");
    expectchai(
      await (await Package.$other).getAttribute("data-mat-icon-name")
    ).to.have.string("more");
    console.log("*****4th icon others");
    await (await Collections.$MenuButton).click();
    expectchai(await (await Collections.$deletButton).getText()).to.have.string(
      "Delete"
    );
    console.log("*****delete button should be visible after clicking 3 dots");
    await browser.pause(5000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await Package.$activeCardCount).getText()).to.have.string(
      "1"
    );

    console.log("******active coll num should be reflected on search bar");
    await (await Collections.$MenuButton).click();
    await (await Collections.$deletButton).waitForDisplayed();
    await (await Collections.$deletButton).waitForClickable();
    await (await Collections.$deletButton).click();
    //validate the delete container
    await (await $("mat-dialog-container")).waitForDisplayed();

    await (await map.$confrimClear).click();
    try {
      await (await Collections.$collectionTray).waitForDisplayed();
      await (await Collections.$collectionTray).waitForClickable();
      await (await Collections.$collectionTray).click();
    } catch (error) {
      await (await Collections.$collectionTray).waitForDisplayed();
      await (await Collections.$collectionTray).waitForClickable();
      await (await Collections.$collectionTray).click();
    }

    await browser.pause(5000);
  });

  it("Verify creation and display of Seismic2d collection", async () => {
    console.log("*****Seismic 2D coll test case started");
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    console.log("****click on filter");
    await (await layers.$filterIcon).waitForClickable();
    await (await layers.$filterIcon).click();
    console.log("****remove layer***");
    await (await layers.$removeLayer).click();
    await (await searchPanel.$crossResult).waitForClickable();
    await (await searchPanel.$crossResult).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await browser.pause(3000);
    await (await layers.$Seismic2dHideBtn).waitForClickable();
    await (await layers.$Seismic2dHideBtn).click();
    await browser.pause(3000);
    await (await layers.$Seismic2dDropdown).waitForClickable();
    await (await layers.$Seismic2dDropdown).click();
    await browser.pause(3000);
    console.log("****click on seismic2d filter***");
    await (await layers.$SeismicFilterSearch).waitForClickable();
    await (await layers.$SeismicFilterSearch).click();
    await browser.pause(3000);
    await (await layers.$backLayerArrow).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (await searchPanel.$searchBox).click();
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
    ).setValue("Seismic2d Line Collection" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll for Seismic2d Line Descriptions");
    await (await Collections.$checkBox).waitForDisplayed();
    await browser.pause(3000);
    await (await Collections.$checkBox).click();
    await browser.pause(3000);
    await (await Collections.$saveButton).click();
    await browser.pause(3000);
    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);

    console.log(await Collections.$activeCardColl.getText());
    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Seismic2d Line Collection" + change
    );
    console.log("***verify coll Title");
    expectchai(
      await (await Package.$dateTime).getAttribute("svgicon")
    ).to.have.string("datetime");
    console.log("****created on");
    await browser.pause(2000);
    expectchai(
      await (await Package.$createdBY).getAttribute("class")
    ).to.have.string("creator");
    console.log("***created By");
    expectchai(
      await (await Package.$wellIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("Well");
    console.log("****1st icon should be well");
    expectchai(
      await (await Package.$2DlineIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("2d-line");
    console.log("*****2nd icon 2D icon");
    expectchai(
      await (await Package.$3DSurveyIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("3d-survey");
    console.log("****3rd icon 3d survey");
    expectchai(
      await (await Package.$other).getAttribute("data-mat-icon-name")
    ).to.have.string("more");
    console.log("*****4th icon others");
    await (await Collections.$MenuButton).click();
    expectchai(await (await Collections.$deletButton).getText()).to.have.string(
      "Delete"
    );
    console.log("*****delete button should be visible after clicking 3 dots");
    await browser.pause(5000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await Package.$activeCardCount).getText()).to.have.string(
      "1"
    );

    await browser.pause(2000);
    await (await Collections.$MenuButton).click();
    await browser.pause(2000);
    await (await Collections.$deletButton).waitForDisplayed();
    await (await Collections.$deletButton).click();
    console.log("****delet coll");
    //validate the delete container
    await (await $("mat-dialog-container")).waitForDisplayed();

    await (await map.$confrimClear).click();
    console.log("*****checking the delete toaster");
    await (await Collections.$Deleted).waitForDisplayed();
    await (await Collections.$collectionTray).waitForClickable();
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);
  });

  it("Verify creation and display of Seismic3d collection", async () => {
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    console.log("*****click on filter");
    await (await layers.$filterIcon).waitForClickable();
    await (await layers.$filterIcon).click();
    console.log("****remove layer***");
    await (await layers.$removeLayer).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await (await layers.$globalUnHideLayersBtn).waitForClickable();
    await (await layers.$globalUnHideLayersBtn).click();
    await browser.pause(2000);
    await (await layers.$backLayerArrow).click();
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await searchPanel.$searchIcon).waitForClickable({ timeout: 10000 });
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Nova Scotia");
    await (await searchPanel.$searchIcon).click();
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
    ).setValue("Coll For Seismic3d Line" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll for Seismic3d Line Descriptions");
    await (await Collections.$checkBox).waitForDisplayed();
    await (await Collections.$checkBox).click();
    await browser.pause(2000);
    await (await Collections.$saveButton).click();
    await browser.pause(3000);
    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);

    console.log(await Collections.$activeCardColl.getText());
    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Seismic3d Line" + change
    );
    console.log("***verify coll Title");
    expectchai(
      await (await Package.$dateTime).getAttribute("svgicon")
    ).to.have.string("datetime");
    console.log("****created on");
    await browser.pause(2000);
    expectchai(
      await (await Package.$createdBY).getAttribute("class")
    ).to.have.string("creator");
    console.log("***created By");
    expectchai(
      await (await Package.$wellIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("Well");
    console.log("****1st icon should be well");
    expectchai(
      await (await Package.$2DlineIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("2d-line");
    console.log("*****2nd icon 2D icon");
    expectchai(
      await (await Package.$3DSurveyIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("3d-survey");
    console.log("****3rd icon 3d survey");
    expectchai(
      await (await Package.$other).getAttribute("data-mat-icon-name")
    ).to.have.string("more");
    console.log("*****4th icon others");
    await (await Collections.$MenuButton).click();
    expectchai(await (await Collections.$deletButton).getText()).to.have.string(
      "Delete"
    );
    console.log("*****delete button should be visible after clicking 3 dots");
    await browser.pause(5000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await Package.$activeCardCount).getText()).to.have.string(
      "1"
    );
    console.log("****validate active coll num in serch bar");
    await (await Collections.$MenuButton).click();
    await browser.pause(2000);
    await (await Collections.$deletButton).click();
    //validate the delete container
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).click();
    console.log("*****checking the delete toaster");
    await await Collections.$Deleted.waitForDisplayed();
    await await Collections.$collectionTray.waitForDisplayed();
    await (await Collections.$collectionTray).click();
    await browser.pause(5000);
  });

  it("Verify creation and display of Prospects collection", async () => {
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    console.log("****click on filter");
    await (await layers.$filterIcon).waitForClickable();
    await (await layers.$filterIcon).click();

    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await browser.pause(3000);
    console.log("****unhide prospect");
    await (await layers.$ProspectHideBtn).waitForClickable();
    await (await layers.$ProspectHideBtn).click();
    await browser.pause(3000);
    console.log("****8prospect drop down");
    await (await layers.$ProspectDropdown).waitForClickable();
    await (await layers.$ProspectDropdown).click();
    await browser.pause(5000);
    console.log("****click on propect layer");
    try {
      await (await layers.$ProspectSearchBox).waitForClickable();
      await (await layers.$ProspectSearchBox).click();
    } catch (e) {
      await (await layers.$ProspectSearchBox).waitForClickable();
      await (await layers.$ProspectSearchBox).click();
    }
    await (await layers.$ProspetLayer1).waitForClickable();
    await (await layers.$ProspetLayer1).click();
    await (await layers.$ProspetLayer2).waitForClickable();
    await (await layers.$ProspetLayer2).click();
    await (await layers.$ProspetLayer3).waitForClickable();
    await (await layers.$ProspetLayer3).click();
    await (await layers.$ProspetLayer4).waitForClickable();
    await (await layers.$ProspetLayer4).click();
    await (await layers.$ProspetLayer5).waitForClickable();
    await (await layers.$ProspetLayer5).click();
    console.log("****click on seach attributes for selectiong the layer");
    await browser.pause(5000);

    await (await layers.$backLayerArrow).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (await searchPanel.$searchBox).moveTo();
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
    ).setValue("Coll For Prospects" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll for Prospects Descriptions");
    await browser.pause(3000);
    await (await Collections.$checkBox).waitForDisplayed();
    await (await Collections.$checkBox).click();
    await browser.pause(2000);
    await (await Collections.$saveButton).click();
    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).click();
    await (await Collections.$Resultsaved).waitForDisplayed();
    console.log(await Collections.$activeCardColl.getText());
    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Prospects" + change
    );
    console.log("***verify coll Title");
    expectchai(
      await (await Package.$dateTime).getAttribute("svgicon")
    ).to.have.string("datetime");
    console.log("****created on");
    await browser.pause(2000);
    expectchai(
      await (await Package.$createdBY).getAttribute("class")
    ).to.have.string("creator");
    console.log("***created By");
    expectchai(
      await (await Package.$wellIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("Well");
    console.log("****1st icon should be well");
    expectchai(
      await (await Package.$2DlineIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("2d-line");
    console.log("*****2nd icon 2D icon");
    expectchai(
      await (await Package.$3DSurveyIcon).getAttribute("data-mat-icon-name")
    ).to.have.string("3d-survey");
    console.log("****3rd icon 3d survey");
    expectchai(
      await (await Package.$other).getAttribute("data-mat-icon-name")
    ).to.have.string("more");
    console.log("*****4th icon others");
    await (await Collections.$MenuButton).click();
    expectchai(await (await Collections.$deletButton).getText()).to.have.string(
      "Delete"
    );
    console.log("*****delete button should be visible after clicking 3 dots");
    await browser.pause(5000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await Package.$activeCardCount).getText()).to.have.string(
      "1"
    );
    console.log("****validate num of active coll on serech bar");

    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).waitForClickable();
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);

    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    console.log("****click on filter");
    await (await layers.$filterIcon).waitForClickable();
    await (await layers.$filterIcon).click();
    console.log("***remove old filter");
    await (await layers.$removeLayer).click();
    await (await layers.$close).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await (await layers.$globalUnHideLayersBtn).waitForClickable();
    await (await layers.$globalUnHideLayersBtn).click();
    await (await layers.$backLayerArrow).click();
  });

  it("Create Four Collection", async () => {
    const layer = "cheal";
    const mapWebelement = await map.$map;
    console.log("*****creat 3rd coll");
    await zoomToExtend.zoomToExtend(layer);
    await browser.pause(5000);
    //click on rect selection
    console.log("*****rectangular selection");
    await map.$rectSelect.waitForClickable();
    await map.$rectSelect.click();
    const rectSelect = await map.$rectSelect;
    expect(rectSelect).toBeClickable();
    await browser.pause(9000);
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
    ).setValue("Active Collection_03" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Active Collection_03 Testing Descriptions");

    console.log("***save coll*****");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();

    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await (await Collections.$Resultsaved).waitForDisplayed();
    console.log("****for coll num 4");
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    console.log("*****rectangular selection");
    await map.$rectSelect.waitForClickable();
    await map.$rectSelect.click();
    await browser.pause(9000);
    await mapWebelement.dragAndDrop({ x: 200, y: 80 });
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
    ).setValue("Active Collection_04" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Active Collection_04 Testing Descriptions");
    await (await Collections.$checkBox).waitForClickable({ timeout: 80000 });
    await (await Collections.$checkBox).click();
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    console.log("***save coll*****");
    await browser.pause(5000);
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await (await Collections.$Resultsaved).waitForDisplayed();
    console.log("****four active coll created");
    await browser.pause(5000);
  });
  it("Verify Active Collection to appear on right side on Collection Tray", async () => {
    console.log(
      "****Active Collection to appear on right side on Collection Tray test case staerd"
    );
    console.log(await Collections.$activeCardColl.getText());
    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Prospects"
    );
    console.log(
      "*****validating active coll appear on right side of coll tray*****"
    );
    console.log(await Collections.$activeCardColl2.getText());
    expectchai(await Collections.$activeCardColl2.getText()).to.have.string(
      "Active Collection_04"
    );
    console.log(
      "*****validating 2nd active coll appear on 1st side of coll tray*****"
    );
    await browser.pause(3000);
    await (await Collections.$Deactivted1stColl).waitForClickable();
    await (await Collections.$Deactivted1stColl).click();
    console.log("****inactive the coll for Prospect");
    await browser.pause(3000);
    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll For Prospects"
    );
    console.log(
      "*****validating 1st Inactive coll appear on 1st in Avl Card of coll tray*****"
    );
    await browser.pause(3000);
  });
  it("Verify addition and removal of data items from Collection", async () => {
    console.log(
      "*******Verify addition and removal of data items from Collection test case started"
    );
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await searchPanel.$searchIcon).waitForClickable({ timeout: 10000 });
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Nova Scotia");
    await (await searchPanel.$searchIcon).click();
    await (await searchPanel.$searchBox).moveTo();
    await (await searchPanel.$firstSearchResults).waitForDisplayed();
    await (await searchPanel.$firstSearchResults).moveTo();
    await browser.pause(3000);
    await (await Collections.$Actions).waitForClickable();
    await Collections.$Actions.click();
    await (await Collections.$collectionMenu).moveTo();
    await Collections.$collectionMenu.click();
    await (await Collections.$Add).moveTo();
    await (await Collections.$Add).waitForClickable();
    await Collections.$Add.click();
    await (await Collections.$activeCollections).waitForClickable();
    await Collections.$activeCollections.click();
    await browser.pause(2000);
    await (await Collections.$ResultAdded).waitForDisplayed();
    expectchai(await Collections.$ResultAdded.getText()).to.have.string(
      "Results added."
    );
    expectchai(await Collections.$Seismic3DCount.getText()).to.have.string("5");
    console.log("****result added to active coll");
    await (await Collections.$Actions).waitForClickable();
    await Collections.$Actions.click();
    await Collections.$collectionMenu.click();
    await browser.pause(2000);
    await Collections.$removeFrom.click();
    await Collections.$removeFrom.click();
    console.log("****remove prospect from active coll*****");

    await (
      await Collections.$activeCollections
    ).waitForClickable({ timeout: 80000 });
    await Collections.$activeCollections.click();
    await (await Collections.$ResultRemoved).waitForDisplayed();
    expectchai(await Collections.$Seismic3DCount.getText()).to.have.string("3");
    console.log("****result remove from active coll");
    await browser.pause(3000);
  });

  it("Verify Delete Package", async () => {
    console.log("***Verify Delete Package test started");
    await (await Collections.$MenuButton).waitForDisplayed();
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await Collections.$Deleted).waitForDisplayed();
    console.log("*****one coll is deleted");
    await browser.pause(3000);
    await (await Collections.$MenuButton).waitForDisplayed();
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();

    await (await map.$confrimClear).click();
    await (await Collections.$Deleted).waitForDisplayed();
    console.log("*****2nd coll is deleted");
    await browser.pause(3000);
    await (await Collections.$MenuButton).waitForDisplayed();
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();

    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await Collections.$Deleted).waitForDisplayed();
    console.log("****3rd coll is deletd");
    await browser.pause(3000);
    await (await Collections.$collectionTray).click();
    await browser.pause(4000);
  });
  it("Verify collection can not be created with same name", async () => {
    await (await searchPanel.$crossResult).waitForDisplayed();
    await (await searchPanel.$crossResult).click();
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
    ).setValue("Active Collection_02" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Active Collection_02 Testing Descriptions");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    await (await Collections.$collectionTray).waitForDisplayed();
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await browser.pause(2000);
    await (await Collections.$Resultsaved).waitForDisplayed();
    await browser.pause(3000);
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await searchPanel.$searchBox).waitForClickable({ timeout: 10000 });
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("PEG0906M1000");
    await (await searchPanel.$searchIcon).click();
    await createNewPackage.packageCreation();
    await (
      await Collections.$collectionName
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionName
    ).setValue("Active Collection_02" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Active Collection_02 Testing Descriptions");
    console.log("***save coll*****");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    await (await Collections.$errorToast).waitForDisplayed();
    console.log("****toaster appear");
    expectchai(await Collections.$ToastMessage.getText()).to.have.string(
      "Unable to save results, please try again."
    );

    console.log("****assert pass");
    await browser.pause(3000);
    await (await Collections.$MenuButton).waitForDisplayed();
    await (await Collections.$MenuButton).waitForClickable();
    await (await Collections.$MenuButton).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await Collections.$Deleted).waitForDisplayed();
    console.log("****4th coll is deletd");
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).click();
    console.log("*****COLLECTION FINISHED");
  });
});
