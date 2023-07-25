const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const delfi = require("../../utils/methods/Login.Regre");
const zoomToExtend = require("../../utils/methods/clearAllFilterAndViewMode");
const login = require("../../utils/pageobjects/login.po.js");
var expectchai = require("chai").expect;
const canvasPo = require("../../utils/pageobjects/canvas.po.js");


describe("performs Basic Map and GIS toolbox features:", async () => {
  after(async () => {
     await zoomToExtend.removeOldAction();
  });

  it("Verify Zoom In using mouse wheel, (+) icon", async () => {
    const mapWebelement = await map.$map;
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    console.log("***zoom plus");
    const zoomPlus = await map.$zoomplus;
    expect(zoomPlus).toBeClickable();
    await browser.pause(5000);
    //pan through
    await mapWebelement.dragAndDrop({ x: 50, y: 50 });
    //zoom minus
    console.log("***zoom minus");
    await (await map.$zoomMinus).waitForClickable();
    await (await map.$zoomMinus).click();
    const zoomMinus = await map.$zoomMinus;
    expect(zoomMinus).toBeClickable();
    await browser.pause(3000);
  });

  it("Zoom to World View", async () => {
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    console.log("****zoom to world view");
    await map.$zoomToWorldView.click();
    const zoomToWorldView = await map.$zoomToWorldView;
    expect(zoomToWorldView).toBeClickable();
    await browser.pause(5000);
  });

  it("Rectangular selection", async () => {
    
    const layer = "cheal";
    const mapWebelement = await map.$map;
    const mapWidth = await mapWebelement.getSize("width");
    const mapHeight = await mapWebelement.getSize("height");
    console.log("mapheight" + mapHeight);
    console.log("mapwidth" + mapWidth);
    await zoomToExtend.zoomToExtend(layer);
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    //click on rect selection
    console.log("****8*rectangular selection");
    await map.$rectSelect.waitForClickable();
    await map.$rectSelect.click();
    const rectSelect = await map.$rectSelect;
    expect(rectSelect).toBeClickable();
    await browser.pause(20000);
    await mapWebelement.dragAndDrop({ x: 200, y: 100 });
    //Rubberband zoom
    await (await searchPanel.$firstSearchResults).waitForDisplayed();
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    expectchai(await searchPanel.$2ndSearchResults.isDisplayed()).to.be.true;
    expectchai(await searchPanel.$3rdSearchResults.isDisplayed()).to.be.true;
    expectchai(await searchPanel.$4thSearchResults.isDisplayed()).to.be.true;
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
    ).to.have.string("Prospects");

    console.log("****rubberband zoom");
    await map.$RubberbandZoom.waitForClickable();
    await map.$RubberbandZoom.click();
    await browser.pause(5000);
    await mapWebelement.dragAndDrop({ x: 10, y: 10 });
    await browser.pause(5000);
  });

  it("Verify GIS tools - Polygon Selection", async () => {
    console.log("****polygon Selection test started");
    await (await searchPanel.$crossResult).click();
    const mapWebelement = await map.$map;
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    await browser.pause(5000);
    await map.$PolygonSelection.waitForClickable();
    await map.$PolygonSelection.click();
    const PolgonSelection = await map.$PolygonSelection;
    expect(PolgonSelection).toBeClickable();
    await mapWebelement.dragAndDrop({ x: 200, y: 100 });
    await mapWebelement.dragAndDrop({ x: -200, y: 100 });
    await mapWebelement.click();
    await mapWebelement.click();
    await browser.pause(8000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    expectchai(await searchPanel.$2ndSearchResults.isDisplayed()).to.be.true;
    expectchai(await searchPanel.$3rdSearchResults.isDisplayed()).to.be.true;
     expectchai(
      await searchPanel.$1stSearchResultsText.getText()
    ).to.have.string("Well Log");
    expectchai(
      await searchPanel.$2ndSearchResultsText.getText()
    ).to.have.string("Seismic 2D Line");
    expectchai(
      await searchPanel.$3rdSearchResultsText.getText()
    ).to.have.string("Prospects");
     await (await map.$zoomMinus).waitForClickable();
    await (await map.$zoomMinus).click();
    await (await map.$zoomMinus).click();
    await browser.pause(2000);
    await (await searchPanel.$crossResult).click();
    await browser.pause(5000);
  });

  it("Verify GIS tools - Lasso Selection", async () => {
    console.log("****Lasso selection test started");
    const mapWebelement = await map.$map;
    var screen = await $("#MLSvg1003");
    await map.$zoomToWorldView.waitForDisplayed();
    await map.$zoomToWorldView.click();
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    await map.$LassoSelection.waitForClickable();
    await map.$LassoSelection.click();
    const LassoSelection = await map.$LassoSelection;
    expect(LassoSelection).toBeClickable();

    await mapWebelement.dragAndDrop({ x: 200, y: 200, x: -100 });
    await mapWebelement.moveTo(200, -100);
    //browser.buttonUp();
    browser.touchAction(
      { action: "press", x: 200, y: 200, selector: screen },

      {
        action: "moveTo",
        x: 100,
        y: 200,
        selector: screen,
      }
    );

    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    expectchai(await searchPanel.$2ndSearchResults.isDisplayed()).to.be.true;
    expectchai(
      await searchPanel.$1stSearchResultsText.getText()
    ).to.have.string("Well Log");
    expectchai(
      await searchPanel.$2ndSearchResultsText.getText()
    ).to.have.string("Seismic 2D Line");
    await browser.pause(5000);
  });
  it(" Line and Corridor tool", async () => {
    console.log("***line & Corridor test started");
    await (await searchPanel.$crossResult).click();
    const mapWebelement = await map.$map;
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
    await browser.pause(3000);
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await layers.$normalclick).click();
    await browser.pause(3000);
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await browser.pause(3000);
    await (await layers.$WellLayerHideBtn).waitForClickable();
    await (await layers.$WellLayerHideBtn).click();
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    await browser.pause(5000);
    await map.$LineAndCorridor.waitForClickable();
    await map.$LineAndCorridor.click();
    const LineAndCorridor = await map.$LineAndCorridor;
    expect(LineAndCorridor).toBeClickable();
    await mapWebelement.dragAndDrop({ x: 100, y: -100 });
    await mapWebelement.click();
    await mapWebelement.click();
    await browser.pause(5000);
    await (await map.$SliderBar).waitForDisplayed({ timeout: 100000 });
    await (await map.$SliderRang).waitForDisplayed({ timeout: 100000 });
    await (await map.$SliderRang).click();
    await browser.pause(5000);
    await (await canvasPo.$willboreViewerCanvas).waitForDisplayed();
    await browser.pause(5000);
    await (await canvasPo.$bufferRadiusClose).click();
    await (await searchPanel.$sidePanel).waitForClickable();

    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    expectchai(
      await searchPanel.$1stSearchResultsText.getText()
    ).to.have.string("Well Log");
    await browser.pause(3000);
    await (await canvasPo.$closeCanvas).waitForClickable();
    await (await canvasPo.$closeCanvas).click();

    await browser.pause(5000);
  });

  it("Verify Update Results when map moves checkbox", async () => {
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await layers.$normalclick).click();
    await browser.pause(5000);
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await (await layers.$nopreview).click();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    const mapWebelement = await map.$map;
    await browser.pause(5000);
    try {
      await layers.$MoveCheckbox.waitForClickable();
      await (await layers.$MoveCheckbox).click();
    } catch (e) {
      await layers.$MoveCheckbox.waitForClickable();
      await (await layers.$MoveCheckbox).click();
    }
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    await (await map.$zoomplus).click();
    await mapWebelement.dragAndDrop({ x: 300, y: 100 });
    await mapWebelement.click();
    await (await searchPanel.$firstSearchResults).waitForDisplayed();
     await browser.pause(3000);
  });

  it("BasemapClickOnBasemap", async () => {
    await (await searchPanel.$crossResult).click();
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
    await browser.pause(3000);
    await map.$BasemapSelection.waitForClickable({ timeout: 80000 });
    await browser.pause(3000);
    await map.$BasemapSelection.click();
    await (await map.$Roadmap).waitForDisplayed();
    expectchai(await map.$Roadmap.isDisplayed()).to.be.true;
    await (await map.$Roadmap).click();
    await browser.pause(2000);
    await (await map.$Hybrid).waitForDisplayed();
    expectchai(await map.$Hybrid.isDisplayed()).to.be.true;
    await (await map.$Hybrid).click();
    await browser.pause(2000);
    await (await map.$Satellite).waitForDisplayed();
    expectchai(await map.$Satellite.isDisplayed()).to.be.true;
    await (await map.$Satellite).click();
    await browser.pause(2000);
    await (await map.$Terrain).waitForDisplayed();
    expectchai(await map.$Terrain.isDisplayed()).to.be.true;
    await (await map.$Terrain).click();
    await browser.pause(2000);
    await (await map.$Satellite).waitForClickable();
    await (await map.$Satellite).click();
    await browser.pause(1000);
    await (await map.$closeBaseMap).waitForClickable();
    await (await map.$closeBaseMap).click();
    console.log("*****GIS FINISHED");
    await browser.pause(3000);
  });
});
