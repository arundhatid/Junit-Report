const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const delfi = require("../../utils/methods/Login.Regre");
const zoomToExtend = require("../../utils/methods/clearAllFilterAndViewMode");
const login = require("../../utils/pageobjects/login.po.js");
const SummaryCard = require("../../utils/pageobjects/summaryCard.po");
const Canvas = require("../../utils/pageobjects/canvas.po.js");
const Collections = require("../../utils/pageobjects/collections.po");
const createNewPackage = require("../../utils/methods/packageCreation");

var expectchai = require("chai").expect;

describe("Verify Well Logs associated with Wells :", async () => {
  after(async () => {
    await zoomToExtend.removeOldAction();
  });

  it("Open Discovery app ad hide all layers except Well logs", async () => {
    const layer = "cheal";
    const mapWebelement = await map.$map;
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
    await (await layers.$WellLayerDropdown).click();
    await browser.pause(3000);
    await (await layers.$WellFilter).waitForClickable();
    await (await layers.$WellFilter).click();
    console.log("****well filetr");
    const cross = await (
      await searchPanel.$backOrClose
    ).getAttribute("data-slb-id");
    console.log(cross)
    if (cross == "side-panel-header-close-button") {
      await (await searchPanel.$crossResult).waitForClickable();
      await (await searchPanel.$crossResult).click();
    } else {
      await (await layers.$backLayerArrow).waitForDisplayed();
      await (await layers.$backLayerArrow).click();
      
    }
   // await (await searchPanel.$crossResult).click();
    await browser.pause(3000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await searchPanel.$firstSearchResults).isDisplayed()).to
      .be.true;
    console.log("******verify the filter applied");
    await (await searchPanel.$firstSearchResults).waitForClickable();
    await (await searchPanel.$firstSearchResults).click();

    await (
      await SummaryCard.$wellboreViewerBtn
    ).waitForDisplayed({ timeout: 80000 });
    await (await SummaryCard.$wellboreViewerBtn).moveTo();
    expectchai(await SummaryCard.$wellboreViewerBtn.getText()).to.have.string(
      "37"
    );
    console.log("*****verifly wllbore viewer btn");
    expectchai(
      await (await SummaryCard.$wellboreViewerBtn).getAttribute("title")
    ).to.have.string("Open Wellbore in Log Viewer");

    console.log("******hover");
    await browser.pause(3000);
    await zoomToExtend.removeOldAction();
    await zoomToExtend.zoomToExtend(layer);
    await map.$LineAndCorridor.waitForClickable();
    await map.$LineAndCorridor.click();
    await mapWebelement.dragAndDrop({ x: 100, y: -100 });
    await mapWebelement.click();
    await mapWebelement.click();
    await browser.pause(5000);
    await (
      await Canvas.$willboreViewerCanvas
    ).waitForDisplayed({ timeout: 200000 });
    console.log("****canvas open succefully");
    await browser.pause(10000);
    await (await SummaryCard.$ViewerFullScreen).waitForDisplayed();
    await browser.pause(5000);
    await (await SummaryCard.$ViewerFullScreen).waitForClickable();
    await (await SummaryCard.$ViewerFullScreen).click();
    await browser.pause(5000);
  });

  it("Verify Well log viewer", async () => {
    await (await Canvas.$noMarkers).waitForDisplayed();
    expectchai(await (await Canvas.$noMarkers).isDisplayed()).to.be.true;
    console.log("****No marker");
    await (await Canvas.$noZones).waitForDisplayed();
    expectchai(await (await Canvas.$noZones).isDisplayed()).to.be.true;
    console.log("****No zones");
    await (await Canvas.$MD).waitForDisplayed();
    expectchai(await (await Canvas.$MD).isDisplayed()).to.be.true;
    console.log("****MD");
    await (await Canvas.$MD).click();
    await (await Canvas.$TVD).waitForDisplayed();
    expectchai(await (await Canvas.$TVD).isDisplayed()).to.be.true;
    console.log("***TVD");
    await (await Canvas.$MD).click();
    await (await Canvas.$alignMarkers).waitForDisplayed();
    expectchai(await (await Canvas.$alignMarkers).isDisplayed()).to.be.true;
    console.log("****align Markers");
    await (await Canvas.$autoFitCanvas).waitForDisplayed();
    expectchai(await (await Canvas.$autoFitCanvas).isDisplayed()).to.be.true;
    console.log("****auto fit canvas");
    await (await Canvas.$LQC).waitForDisplayed();
    expectchai(await (await Canvas.$LQC).isDisplayed()).to.be.true;
    console.log("****LQC");
    await (await Canvas.$indexProperties).waitForDisplayed();
    expectchai(await (await Canvas.$indexProperties).isDisplayed()).to.be.true;
    console.log("****Edit Index properties");
    await (await Canvas.$edit).waitForDisplayed();
    expectchai(await (await Canvas.$edit).isDisplayed()).to.be.true;
    console.log("****Edit");
    await browser.pause(5000);
  });
  it("Verify LQC parameter", async () => {
    const canvasWebelement = await Canvas.$willboreViewerCanvas;
    await (await Canvas.$LQC).waitForDisplayed();
    await (await Canvas.$LQC).waitForClickable();
    await (await Canvas.$LQC).click();
    await (await Canvas.$currentParameter).waitForDisplayed();
    await (await Canvas.$LQCChnageBtn).waitForDisplayed();
    expectchai(await (await Canvas.$LQCChnageBtn).isDisplayed()).to.be.true;
    console.log("****LQC chnage btn");
    await (await Canvas.$saveAsBtn).waitForDisplayed();
    expectchai(await (await Canvas.$saveAsBtn).isDisplayed()).to.be.true;
    console.log("****save as btn");
    await (await Canvas.$showAllBtn).waitForDisplayed();
    expectchai(await (await Canvas.$showAllBtn).isDisplayed()).to.be.true;
    console.log("****shows all btn");
    await (await Canvas.$hideAllBtn).waitForDisplayed();
    expectchai(await (await Canvas.$hideAllBtn).isDisplayed()).to.be.true;
    console.log("****hide all btn");
    await (await Canvas.$hideAllBtn).waitForClickable();
    await (await Canvas.$hideAllBtn).click();
    console.log("****click on hide all");
    await browser.pause(8000);
    await (await Canvas.$showAllBtn).waitForClickable();
    await (await Canvas.$showAllBtn).click();
    await browser.pause(5000);
    await (await Canvas.$LQCChnageBtn).waitForClickable();
    await (await Canvas.$LQCChnageBtn).click();
    await (await Canvas.$myTemplates).waitForDisplayed();
    expectchai(await (await Canvas.$myTemplates).isDisplayed()).to.be.true;
    console.log("****My templates");
    await (await Canvas.$shareWithMe).waitForDisplayed();
    expectchai(await (await Canvas.$shareWithMe).isDisplayed()).to.be.true;
    console.log("****share with me");
    await (await Canvas.$uploadIcon).waitForDisplayed();
    expectchai(await (await Canvas.$uploadIcon).isClickable()).to.be.true;
    await (await Canvas.$LQC).waitForClickable();
    await (await Canvas.$LQC).click();
    await canvasWebelement.dragAndDrop({ x: -200, y: 100 });
    await canvasWebelement.click();
    console.log("***width" + (await canvasWebelement.getSize("width")));
    console.log("****height" + (await canvasWebelement.getSize("height")));
    await browser.pause(5000);
  });

  it("Verify Edit Index Properties parameter", async () => {
    console.log("****Verify Edit Index Properties parameter started");
    await (await Canvas.$indexProperties).waitForDisplayed();
    await (await Canvas.$indexProperties).click();
    await (await Canvas.$indexTrackProperties).waitForDisplayed();
    await (await Canvas.$custom).waitForClickable();
    await (await Canvas.$custom).click();
    await (await $("//span[text()=' 1:2000 ']")).click();
    await (await $("//span[text()=' Ok ']")).waitForClickable();
    await (await $("//span[text()=' Ok ']")).click();

    await browser.pause(5000);
  });

  it("Verify at a time only 40 wellogs can be viewed in Well Log viewer", async () => {
    const mapWebelement = await map.$map;
    console.log(
      "******Verify at a time only 40 wellogs can be viewed in Well Log viewer"
    );
    await (await Canvas.$closelogViewer).waitForClickable();
    await (await Canvas.$closelogViewer).click();
    await browser.pause(5000);
    await map.$LineAndCorridor.waitForClickable();
    await map.$LineAndCorridor.click();
    await mapWebelement.dragAndDrop({ x: 100, y: -50 });
    await mapWebelement.click();
    await mapWebelement.click();
    await browser.pause(5000);
    await (await map.$SliderBar).waitForDisplayed({ timeout: 200000 });
    await (await map.$SliderRang).click();
    await browser.pause(2000);
    await (
      await Collections.$ToastMessage
    ).waitForDisplayed({ timeout: 200000 });
    expectchai(await Collections.$ToastMessage.getText()).to.have.string(
      "Unable to send selection, please try again."
    );
    expectchai(await Canvas.$errorMessage.getText()).to.have.string(
      "100 selected items. The limit is 40."
    );

    await (
      await Canvas.$willboreViewerCanvas
    ).waitForDisplayed({ timeout: 200000 });
    await (await Canvas.$closelogViewer).waitForClickable();
    await (await Canvas.$closelogViewer).click();
    await browser.pause(3000);
    
    console.log('WELL LOG VIEWER FINISHED')
    await browser.pause(5000);
  });
});
