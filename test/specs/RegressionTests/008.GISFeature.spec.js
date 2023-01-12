const searchData = require("../../testData/searchPanel.json");
const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi = require("../../utils/methods/Login");
const login = require("../../utils/pageobjects/login.po.js");

var expectchai = require("chai").expect;
const webdriverio = require("webdriverio");
const path = require("path");
const fs = require("fs");
const { createJSHandle } = require("puppeteer-core");
var multiResultsflag = false;
var singleResultflag = false;
describe("performs Basic Map and GIS toolbox features:", async () => {
  before(async () => {
    const USER_ID = "DELFI-6976-SM-009@slb.com";
    const PASSWORD = "Second^12345";
    const URL = "https://evq.discovery.cloud.slb-ds.com/";
    const SECRET_KEY = "fssknsltfkc2sxhy";
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
    //await browser.maximizeWindow()
    await browser.url(URL);

    //await browser.maximizeWindow()
    await delfi.delfiLogin(USER_ID, PASSWORD, SECRET_KEY);
    console.log("title" + (await browser.getTitle()));
    try {
      await (await login.$CloseBox).waitForDisplayed({ timeout: 100000 });
      await (await login.$CloseBox).click();
    } catch (e) {}

    try {
      await (
        await searchPanel.$searchBox
      ).waitForDisplayed({ timeout: 100000 });
    } catch (e) {}
  });

  it("Verify Zoom In using mouse wheel, (+) icon", async () => {
    const mapWebelement = await map.$map;
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    const zoomPlus = await map.$zoomplus;
    expect(zoomPlus).toBeClickable();
    await browser.pause(10000);
    //pan through
    await mapWebelement.dragAndDrop({ x: 50, y: 50 });
    //zoom minus
    await (await map.$zoomMinus).waitForClickable();
    await (await map.$zoomMinus).click();
    const zoomMinus = await map.$zoomMinus;
    expect(zoomMinus).toBeClickable();
    await browser.pause(10000);
    //await mapWebelement.dragAndDrop({ x: 400, y: 200})
    //await  browser.pause(10000);
  });

  it("Zoom to World View", async () => {
    const mapWebelement = await map.$map;
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
    const zoomToWorldView = await map.$zoomToWorldView;
    expect(zoomToWorldView).toBeClickable();
    await browser.pause(10000);
    // await mapWebelement.dragAndDrop({ x: 300, y: 300})
    //await  browser.pause(10000);
    //await (await map.$zoomplus).waitForClickable()
    // await (await map.$zoomplus).click();
  });

  it("Rectangular selection", async () => {
    const mapWebelement = await map.$map;
    const mapWidth = await mapWebelement.getSize("width");
    const mapHeight = await mapWebelement.getSize("height");
    console.log("mapheight" + mapHeight);
    console.log("mapwidth" + mapWidth);
    await browser.pause(20000);
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await searchPanel.$searchIcon).waitForClickable({ timeout: 10000 });
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Cheal");
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (await searchPanel.$firstSearchResults).waitForClickable();
    await browser.pause(10000);
    await (await searchPanel.$firstSearchResults).click();
    await browser.pause(10000);
    await (
      await $(
        "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
      )
    ).waitForDisplayed();
    await (await $("(//mat-icon[@role='img'])[79]")).click();
    await (await searchPanel.$crossResult).click();
    await browser.pause(10000);
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
    await browser.pause(10000);
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    //await mapWebelement.dragAndDrop({ x: 400, y: 200})
    //click on rect selection
    await map.$rectSelect.waitForClickable();
    await map.$rectSelect.click();
    const rectSelect = await map.$rectSelect;
    expect(rectSelect).toBeClickable();
    await browser.pause(20000);
    //await mapWebelement.dragAndDrop({ x: mapWidth, y: mapHeight})
    await mapWebelement.dragAndDrop({ x: 200, y: 100 });
    // await mapWebelement.dragAndDrop({ x: 200, y: 500})
    //Rubberband zoom
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
      [" Prospects (78) "],
      "rect result is wronge"
    );
    const elem2 = await $("(//div[@class='search-item-row']/div)[2]/div");
    expect(elem2).toHaveTextContaining(
      [" Seismic 2D Line (669) "],
      "rect result is wronge"
    );
    const elem3 = await $("(//div[@class='search-item-row']/div)[3]/div");
    expect(elem3).toHaveTextContaining(
      [" Seismic 3D Survey (2) "],
      "rect result is wronge"
    );
    const elem4 = await $("(//div[@class='search-item-row']/div)[4]/div");
    expect(elem4).toHaveTextContaining(
      [" Well Log (167) "],
      "rect result is wronge"
    );
    await map.$RubberbandZoom.waitForClickable();
    await map.$RubberbandZoom.click();
    await browser.pause(10000);
    await mapWebelement.dragAndDrop({ x: 10, y: 10 });
    await browser.pause(40000);
  });

  it("Verify GIS tools - Polygon Selection", async () => {
    await (await searchPanel.$crossResult).click();
    const mapWebelement = await map.$map;
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    await browser.pause(10000);
    await map.$PolygonSelection.waitForClickable();
    await map.$PolygonSelection.click();
    const PolgonSelection = await map.$PolygonSelection;
    expect(PolgonSelection).toBeClickable();
    await mapWebelement.dragAndDrop({ x: 200, y: 100 });
    await mapWebelement.dragAndDrop({ x: -200, y: 100 });
    await mapWebelement.click();
    await mapWebelement.click();
    await browser.pause(20000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(10000);
    await (await map.$zoomMinus).waitForClickable();
    await (await map.$zoomMinus).click();
    await (await map.$zoomMinus).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (
      await $("(//div[@class='search-item-row']/div)[2]")
    ).waitForDisplayed();
    await (
      await $("(//div[@class='search-item-row']/div)[3]")
    ).waitForDisplayed();
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    expectchai(
      await $("(//div[@class='search-item-row']/div)[2]").isDisplayed()
    ).to.be.true;
    expectchai(
      await $("(//div[@class='search-item-row']/div)[3]").isDisplayed()
    ).to.be.true;
    const elem1 = await $("(//div[@class='search-item-row']/div)[1]/div");
    expect(elem1).toHaveTextContaining(
      [" Prospects "],
      "polygon selection result is wronge"
    );
    const elem2 = await $("(//div[@class='search-item-row']/div)[2]/div");
    expect(elem2).toHaveTextContaining(
      [" Seismic 2D Line "],
      "polygon selection result is wronge"
    );
    const elem3 = await $("(//div[@class='search-item-row']/div)[3]/div");
    expect(elem3).toHaveTextContaining(
      [" Well Log "],
      "polygon selection result is wronge"
    );
    await (await searchPanel.$crossResult).click();
    await browser.pause(40000);
  });

  it("Verify GIS tools - Lasso Selection", async () => {
    //await (await searchPanel.$crossResult).click()
    const mapWebelement = await map.$map;
    var screen = await $("#MLSvg1003");
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    await map.$LassoSelection.waitForClickable({ timeout: 80000 });
    await map.$LassoSelection.click();
    const LassoSelection = await map.$LassoSelection;
    expect(LassoSelection).toBeClickable();
    //mapWebelement.moveTo({ x: 100, y: 100})
    //browser.buttonDown()
    //mapWebelement.moveTo({ x: 50, y: 50});
    //browser.buttonUp(0);

    await mapWebelement.dragAndDrop({ x: 200, y: 200, x: -100 });
    browser.touchAction({
      action: "moveTo",
      x: 100,
      y: 200,
      selector: map.$screen,
    });

    // await mapWebelement.moveTo({ x: 100, y: 100})
    //await mapWebelement.click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(40000);
  });
  it(" Line and Corridor tool", async () => {
    await (await searchPanel.$crossResult).click();
    const mapWebelement = await map.$map;
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
    await browser.pause(10000);
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await $("//div[@class='layers-panel-header']")).click();
    await browser.pause(10000);
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await browser.pause(10000);
    await (await layers.$WellLayerHideBtn).waitForClickable();
    await (await layers.$WellLayerHideBtn).click();
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    // await mapWebelement.dragAndDrop({ x: -400, y: -100})
    await browser.pause(10000);
    await map.$LineAndCorridor.waitForClickable();
    await map.$LineAndCorridor.click();
    const LineAndCorridor = await map.$LineAndCorridor;
    expect(LineAndCorridor).toBeClickable();
    await mapWebelement.dragAndDrop({ x: 100, y: -100 });
    await mapWebelement.click();
    await mapWebelement.click();
    await browser.pause(10000);
    await (await map.$SliderBar).waitForDisplayed({ timeout: 100000 });
    await (await map.$SliderRang).waitForDisplayed({ timeout: 100000 });
    await (await map.$SliderRang).click();
    await browser.pause(40000);
    await (await $("//div[@class='grey']//canvas")).waitForDisplayed();
    await browser.pause(10000);
    await (await $("(//mat-icon[@svgicon='close'])[2]")).click();
    await (
      await $(
        "(//mat-icon[contains(@class,'mat-icon notranslate mat-tooltip-trigger side')])"
      )
    ).waitForClickable();
    await (
      await $(
        "(//mat-icon[contains(@class,'mat-icon notranslate mat-tooltip-trigger side')])"
      )
    ).click();
    //await  browser.pause(20000);
    await (
      await $("//pioneer-resizable-container[@class='ng-star-inserted']")
    ).waitForClickable();
    await (
      await $("//pioneer-resizable-container[@class='ng-star-inserted']")
    ).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    const elem1 = await $("(//div[@class='search-item-row']/div)[1]/div");
    expect(elem1).toHaveTextContaining(
      [" Well Log (5) "],
      "line & corridor selection result is wronge"
    );
    await browser.pause(20000);
    await (
      await $(
        "//pioneer-resizable-container[@class='ng-star-inserted']//mat-icon[2]"
      )
    ).waitForClickable();
    await (
      await $(
        "//pioneer-resizable-container[@class='ng-star-inserted']//mat-icon[2]"
      )
    ).click();
    await browser.pause(40000);
  });

  it("Verify Update Results when map moves checkbox", async () => {
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await $("//div[@class='layers-panel-header']")).click();
    await browser.pause(10000);
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await (await $("//mat-icon[@svgicon='no-preview']")).click();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    const mapWebelement = await map.$map;
    await browser.pause(20000);
    await layers.$MoveCheckbox.waitForClickable();
    await (await layers.$MoveCheckbox).click();
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    await mapWebelement.dragAndDrop({ x: 200, y: 100 });
    await mapWebelement.click();
    await browser.pause(20000);
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
    await (
      await $("(//div[@class='search-item-row']/div)[5]")
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
    expectchai(
      await $("(//div[@class='search-item-row']/div)[5]").isDisplayed()
    ).to.be.true;

    const elem1 = await $("(//div[@class='search-item-row']/div)[1]/div");
    expect(elem1).toHaveTextContaining(
      [" Petrel (1) "],
      " Update Results when map moves result is wronge"
    );
    const elem2 = await $("(//div[@class='search-item-row']/div)[2]/div");
    expect(elem2).toHaveTextContaining(
      [" Prospects (588) "],
      "Update Results when map moves result is wronge"
    );
    const elem3 = await $("(//div[@class='search-item-row']/div)[3]/div");
    expect(elem3).toHaveTextContaining(
      [" Seismic 2D Line (10833) "],
      "Update Results when map moves result is wronge"
    );
    const elem4 = await $("(//div[@class='search-item-row']/div)[4]/div");
    expect(elem4).toHaveTextContaining(
      [" Seismic 3D Survey (16) "],
      "Update Results when map moves result is wronge"
    );
    const elem5 = await $("(//div[@class='search-item-row']/div)[5]/div");
    expect(elem5).toHaveTextContaining(
      [" Well Log (1203) "],
      "Update Results when map moves result is wronge"
    );
    await browser.pause(20000);
  });

  it("BasemapClickOnBasemap", async () => {
    await (await searchPanel.$crossResult).click();
    const mapWebelement = await map.$map;
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
    await browser.pause(10000);
    await map.$BasemapSelection.waitForClickable({ timeout: 80000 });
    await browser.pause(10000);
    await map.$BasemapSelection.click();
    await (await $("//span[normalize-space()='Roadmap']")).waitForDisplayed();
    await (await $("//span[normalize-space()='Hybrid']")).waitForDisplayed();
    await (await $("//span[normalize-space()='Satellite']")).waitForDisplayed();
    await (await $("//span[normalize-space()='Terrain']")).waitForDisplayed();
    await (await $("//span[normalize-space()='Terrain']")).click();
    await browser.pause(20000);
  });
});
