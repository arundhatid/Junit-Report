const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const delfi = require("../../utils/methods/Login.Regre");
const zoomToExtend = require("../../utils/methods/zoomToExtend");
const login = require("../../utils/pageobjects/login.po.js");
var expectchai = require("chai").expect;
const canvasPo = require("../../utils/pageobjects/canvas.po.js");

describe("performs Basic Map and GIS toolbox features:", async () => {
  before(async () => {
    const URL = "https://evq.discovery.cloud.slb-ds.com/";
    const mapWebelement = await map.$map;
    var USER_ID = process.env["TESTUSER1"];
    var PASSWORD = process.env["TESTUSERPASSWORD1"];
    var SECRET_KEY = process.env["SECRET_KEY1"];

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

    try {
      await (await searchPanel.$crossResult).isDisplayed();
      await (await searchPanel.$crossResult).click();
    } catch (e) {}
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await browser.pause(2000);
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await browser.pause(2000);
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
    await browser.pause(2000);
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
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
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
      [" Prospects  "],
      "rect result is wronge"
    );
    const elem2 = await $("(//div[@class='search-item-row']/div)[2]/div");
    expect(elem2).toHaveTextContaining(
      [" Seismic 2D Line  "],
      "rect result is wronge"
    );
    const elem3 = await $("(//div[@class='search-item-row']/div)[3]/div");
    expect(elem3).toHaveTextContaining(
      [" Seismic 3D Survey  "],
      "rect result is wronge"
    );
    const elem4 = await $("(//div[@class='search-item-row']/div)[4]/div");
    expect(elem4).toHaveTextContaining(
      [" Well Log  "],
      "rect result is wronge"
    );
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
    await (await $("//div[@class='layers-panel-header']")).click();
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
    await (await $("(//mat-icon[@svgicon='close'])[2]")).click();

    await (await searchPanel.$sidePanel).waitForClickable();
    await (await searchPanel.$sidePanel).waitForClickable();

    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    const elem1 = await $("(//div[@class='search-item-row']/div)[1]/div");
    expect(elem1).toHaveTextContaining(
      [" Well Log (5) "],
      "line & corridor selection result is wronge"
    );
    await browser.pause(3000);
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
    await browser.pause(5000);
  });

  it("Verify Update Results when map moves checkbox", async () => {
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await $("//div[@class='layers-panel-header']")).click();
    await browser.pause(5000);
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await (await $("//mat-icon[@svgicon='no-preview']")).click();
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
    await browser.pause(8000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 100000 });
    const totalSearchCount = await $("(//div[@class='search-icon-label'])[1]");
    expect(totalSearchCount).toHaveTextContaining(
      [" Showing 6156 Results "],
      " Update Results when map moves result is wronge"
    );

    await browser.pause(5000);
  });

  it("BasemapClickOnBasemap", async () => {
    await (await searchPanel.$crossResult).click();
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
    await browser.pause(3000);
    await map.$BasemapSelection.waitForClickable({ timeout: 80000 });
    await browser.pause(3000);
    await map.$BasemapSelection.click();
    await (await $("//span[normalize-space()='Roadmap']")).waitForDisplayed();
    expectchai(
      await (await $("//span[normalize-space()='Roadmap']")).isDisplayed()
    ).to.be.true;
    await (await $("//span[normalize-space()='Roadmap']")).click();
    await browser.pause(2000);
    await (await $("//span[normalize-space()='Hybrid']")).waitForDisplayed();
    expectchai(
      await (await $("//span[normalize-space()='Hybrid']")).isDisplayed()
    ).to.be.true;
    await (await $("//span[normalize-space()='Hybrid']")).click();
    await browser.pause(2000);
    await (await $("//span[normalize-space()='Satellite']")).waitForDisplayed();
    expectchai(
      await (await $("//span[normalize-space()='Satellite']")).isDisplayed()
    ).to.be.true;
    await (await $("//span[normalize-space()='Satellite']")).click();
    await browser.pause(2000);
    await (await $("//span[normalize-space()='Terrain']")).waitForDisplayed();
    expectchai(
      await (await $("//span[normalize-space()='Terrain']")).isDisplayed()
    ).to.be.true;
    await (await $("//span[normalize-space()='Terrain']")).click();
    console.log("*****GIS FINISHED");
    await browser.pause(5000);
  });
});
