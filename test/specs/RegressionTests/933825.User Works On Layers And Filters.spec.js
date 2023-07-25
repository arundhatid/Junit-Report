const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const delfi = require("../../utils/methods/Login.Regre");
const login = require("../../utils/pageobjects/login.po.js");
var expectchai = require("chai").expect;
const summaryCardPo = require("../../utils/pageobjects/summaryCard.po");
const zoomToExtend = require("../../utils/methods/clearAllFilterAndViewMode");
const createNewPackage = require("../../utils/methods/packageCreation");

describe("performs User works on Layers and Filters:", async () => {
  after(async () => {
    await zoomToExtend.removeOldAction();
  });

  it("Verify Search", async () => {
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 10000 });
    await (await searchPanel.$searchIcon).waitForClickable({ timeout: 10000 });
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Cheal");
    await (await searchPanel.$searchIcon).click();
    console.log("*****verify random search");
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(3000);
  });
  it("Verify Hide/Unhide of layers", async () => {
    await (await searchPanel.$crossResult).waitForClickable();
    await (await searchPanel.$crossResult).click();
    await (await layers.$showLayers).click();
    await (await layers.$normalclick).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    //await (await searchPanel.$crossResult).click();
    const cross = await (
      await searchPanel.$backOrClose
    ).getAttribute("data-slb-id");
    console.log(cross)
    if (cross == "side-panel-header-close-button") {
      await (await searchPanel.$crossResult).click();
    } else {
      await (await layers.$backLayerArrow).click();
    }
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (await searchPanel.$noMatchingResults).waitForDisplayed();
    console.log("****verify hide all layer");
    expectchai(await searchPanel.$noMatchingResults.getText()).to.have.string(
      "No matching results"
    );

    await browser.pause(3000);
    await (await layers.$showLayers).click();
    await (await layers.$normalclick).click();
    await (await layers.$globalUnHideLayersBtn).waitForClickable();
    await (await layers.$globalUnHideLayersBtn).click();
    //await (await searchPanel.$crossResult).click();
    // const cross = await (
    //   await searchPanel.$backOrClose
    // ).getAttribute("data-slb-id");
    console.log(cross)
    if (cross == "side-panel-header-close-button") {
      await (await searchPanel.$crossResult).click();
    } else {
      await (await layers.$backLayerArrow).click();
    }
    await (await searchPanel.$searchIcon).click();
    console.log("*****verify unhide layers & blank search");
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });

    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    expectchai(await searchPanel.$2ndSearchResults.isDisplayed()).to.be.true;
    expectchai(await searchPanel.$3rdSearchResults.isDisplayed()).to.be.true;
    expectchai(await searchPanel.$4thSearchResults.isDisplayed()).to.be.true;
    expectchai(await searchPanel.$5thSearchResults.isDisplayed()).to.be.true;
    expectchai(
      await searchPanel.$1stSearchResultsText.getText()
    ).to.have.string("Well Log");
    expectchai(
      await searchPanel.$2ndSearchResultsText.getText()
    ).to.have.string("Seismic 3D Survey");
    expectchai(
      await searchPanel.$3rdSearchResultsText.getText()
    ).to.have.string("Seismic 2D Line");
    expectchai(
      await searchPanel.$4thSearchResultsText.getText()
    ).to.have.string("Petrel Project");
    expectchai(
      await searchPanel.$5thSearchResultsText.getText()
    ).to.have.string("Prospects");
    await browser.pause(3000);
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await browser.pause(3000);
  });
  it("Verify Filters", async () => {
    console.log("*****verify Filter test started");
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await layers.$normalclick).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await browser.pause(3000);
    await (await layers.$Seismic2dHideBtn).waitForClickable();
    await (await layers.$Seismic2dHideBtn).click();
    await (await layers.$Seismic2dDropdown).waitForClickable();
    await (await layers.$Seismic2dDropdown).click();
    await browser.pause(3000);
    await (await layers.$SeismicFilterSearch).waitForClickable();
    await (await layers.$SeismicFilterSearch).click();
    console.log("*****unhide seismic 2D layer & select filter");
    await browser.pause(3000);
    await (await layers.$Seismic3dHideBtn).waitForClickable();
    await (await layers.$Seismic3dHideBtn).click();
    await (await layers.$Seismic3dDropdown).waitForClickable();
    await (await layers.$Seismic3dDropdown).click();
    await browser.pause(3000);
    await (await layers.$SeismicFilterSearch).waitForClickable();
    await (await layers.$SeismicFilterSearch).click();
    console.log("*****unhide seismic 3D layer & select filter");
    const cross = await (
      await searchPanel.$backOrClose
    ).getAttribute("data-slb-id");
    console.log(cross)
    if (cross == "side-panel-header-close-button") {
      await (await searchPanel.$crossResult).click();
    } else {
      await (await layers.$backLayerArrow).click();
    }
    //await (await layers.$backLayerArrow).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await browser.pause(8000);

    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed();
    console.log("*****left panel should shows only 2D & 3D layers");
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    console.log("*****2D");
    expectchai(await searchPanel.$2ndSearchResults.isDisplayed()).to.be.true;
    console.log("*****3D");
    expectchai(
      await searchPanel.$1stSearchResultsText.getText()
    ).to.have.string("Seismic 3D Survey");
    console.log("******Seismic 3D  ");
    expectchai(
      await searchPanel.$2ndSearchResultsText.getText()
    ).to.have.string("Seismic 2D Line");

    console.log("*****Seismic 2D Line ");
    expectchai(await searchPanel.$3rdSearchResults.isDisplayed()).to.be.not
      .true;
    console.log("***should not present");
    expectchai(await searchPanel.$4thSearchResults.isDisplayed()).to.be.not
      .true;
    console.log("***should not present");
    expectchai(await searchPanel.$5thSearchResults.isDisplayed()).to.be.not
      .true;
    console.log("***should not present");
    await browser.pause(3000);
  });
  it("Verify Filter summary", async () => {
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await layers.$normalclick).click();
    console.log("*****click on filter");
    await (await layers.$filterIcon).waitForClickable();
    await (await layers.$filterIcon).click();
    await (await summaryCardPo.$filterSummary3D).waitForDisplayed();
    expectchai(
      await searchPanel.$1stSearchResultsText.getText()
    ).to.have.string("Seismic 3D Survey");
    expectchai(
      await searchPanel.$2ndSearchResultsText.getText()
    ).to.have.string("Seismic 2D Line");
    await browser.pause(3000);
  });
  it("Verify Clear filter for hidden layer", async () => {
    console.log("****8Verify Clear filter for hidden layer test started");
    await (await $("//mat-icon[@data-mat-icon-name='arrow-left-5']")).click();
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await layers.$normalclick).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    console.log("******hide all layers");
    await (await layers.$filterResetbtn).waitForDisplayed();
    console.log(
      "*****verify that reset filter btn is clickable or not for hide layers"
    );
    expectchai(await (await layers.$filterResetbtn).isClickable()).to.be.not
      .true;
    console.log("******reset filter btn should not be clickable to hide layer");
    await browser.pause(3000);
  });

  it("Verify Clear All Filters", async () => {
    console.log("*****Verify Clear All Filters test started");
    await (await layers.$globalUnHideLayersBtn).waitForDisplayed();
    await (await layers.$globalUnHideLayersBtn).waitForClickable();
    await (await layers.$globalUnHideLayersBtn).click();
    console.log("****unhide all layers");
    await (await layers.$filterResetbtn).waitForDisplayed();
    await (await layers.$filterResetbtn).click();
    console.log("*****click on clear all filter btn");
    await (await $("//span[text()=' Yes ']")).click();
    console.log("****all filter are remove");
    await browser.pause(5000);
  });
  it("Verify Hide all layers keeping one open", async () => {
    console.log("*****Hide all layers keeping one open test started");
    await (await searchPanel.$crossResult).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    console.log("******hide all layers");
    await browser.pause(5000);
    await (await layers.$Seismic2dHideBtn).waitForClickable();
    await (await layers.$Seismic2dHideBtn).click();
    const cross = await (
      await searchPanel.$backOrClose
    ).getAttribute("data-slb-id");
    console.log(cross)
    if (cross == "side-panel-header-close-button") {
      await (await searchPanel.$crossResult).click();
    } else {
      await (await layers.$backLayerArrow).click();
    }
    //await (await layers.$backLayerArrow).click();
    console.log("*****unhide 2D");
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await browser.pause(4000);
    await (await map.$map).click();

    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 90000 });
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    console.log("*****2D");
    expectchai(
      await searchPanel.$1stSearchResultsText.getText()
    ).to.have.string("Seismic 2D Line");
    expectchai(await searchPanel.$2ndSearchResults.isDisplayed()).to.be.not
      .true;
    console.log("***should not present");
    expectchai(await searchPanel.$3rdSearchResults.isDisplayed()).to.be.not
      .true;
    console.log("***should not present");
    expectchai(await searchPanel.$4thSearchResults.isDisplayed()).to.be.not
      .true;
    console.log("***should not present");
    expectchai(await searchPanel.$5thSearchResults.isDisplayed()).to.be.not
      .true;
    console.log("***should not present");
    await browser.pause(3000);
  });

  it("Verify Remove of Filter summary", async () => {
    console.log("****Verify Remove of Filter summary test started");
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await browser.pause(3000);

    try {
      await (await searchPanel.$backToResults).waitForClickable({timeout: 5000});
      await (await searchPanel.$backToResults).click();
    } catch (e) {
      console.log("****click on back if back to group result is display");
    }
    console.log("****click on filter");
    await (await layers.$filterIcon).waitForClickable();
    await (await layers.$filterIcon).click();
    console.log("****remove layer***");
    try {
      await (await searchPanel.$backToResults).waitForClickable({timeout: 5000});
      await (await searchPanel.$backToResults).click();
    } catch (e) {
      console.log("****click on back if back to group result is display");
    }
    await (await layers.$filterResetbtn).waitForDisplayed();
    await (await layers.$filterResetbtn).click();
    console.log("*****click on clear all filter btn");
    await (await $("//span[text()=' Yes ']")).click();
    await (await layers.$nofilterApplied).waitForDisplayed();
    expectchai(await layers.$nofilterApplied.isDisplayed()).to.be.true;
    console.log("*****no filters are applied shows");
    await (await layers.$filterIcon).waitForClickable();
    await (await layers.$filterIcon).click();
    console.log("*****FILTER FINISHED");
    await browser.pause(5000);
  });
});
