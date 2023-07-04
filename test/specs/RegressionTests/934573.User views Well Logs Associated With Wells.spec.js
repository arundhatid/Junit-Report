const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const delfi = require("../../utils/methods/Login.Regre");
const zoomToExtend = require("../../utils/methods/zoomToExtend");
const login = require("../../utils/pageobjects/login.po.js");
const SummaryCard = require("../../utils/pageobjects/summaryCard.po");
const Canvas = require("../../utils/pageobjects/canvas.po.js");

var expectchai = require("chai").expect;

describe("Verify Well Logs associated with Wells :", async () => {
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
    try {
      await (await searchPanel.$crossResult).isDisplayed();
      await (await searchPanel.$crossResult).click();
    } catch (e) {
      console.log("****if coll tray is up by default than close it 1st");
    }
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await browser.pause(2000);
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await browser.pause(8000);
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
    await browser.pause(2000);
  });

  it("Open Discovery app ad hide all layers except Well logs", async () => {
    const layer = "cheal";
    const mapWebelement = await map.$map;
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await $("//div[@class='layers-panel-header']")).click();
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
    await (await searchPanel.$crossResult).click();
    await browser.pause(3000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await searchPanel.$firstSearchResults).isDisplayed()).to
      .be.true;
    expect(
      await (await $('(//div[@class="search-item-row"]/div)[1]')).getText()
    ).toHaveTextContaining("Well Log");
    console.log("******verify the filter applied");
    await (await searchPanel.$firstSearchResults).waitForClickable();
    await (await searchPanel.$firstSearchResults).click();

    await (
      await SummaryCard.$wellboreViewerBtn
    ).waitForDisplayed({ timeout: 80000 });
    expect(
      await (
        await $("(//mat-icon[@title='Open Wellbore in Log Viewer'])[1]")
      ).getText()
    ).toHaveText("37");
    console.log("*****verifly wllbore viewer btn");
    await (await SummaryCard.$wellboreViewerBtn).moveTo();
    expect(
      await (
        await $("(//mat-icon[@title='Open Wellbore in Log Viewer'])[1]")
      ).getText()
    ).toHaveText("Open Wellbore in Log Viewer");
    console.log("******hover");
    await browser.pause(3000);
    await zoomToExtend.zoomToExtend(layer);
    await browser.pause(3000);
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
    await (await $("(//mat-icon[@svgicon='close'])[3]")).waitForClickable();
    await (await $("(//mat-icon[@svgicon='close'])[3]")).click();
    await browser.pause(5000);
    await map.$LineAndCorridor.waitForClickable();
    await map.$LineAndCorridor.click();
    await mapWebelement.dragAndDrop({ x: 100, y: -50 });
    await mapWebelement.click();
    await mapWebelement.click();
    await browser.pause(5000);
    await (await map.$SliderBar).waitForDisplayed({ timeout: 100000 });
    await (await map.$SliderRang).waitForDisplayed({ timeout: 100000 });
    await (await map.$SliderRang).click();
    await browser.pause(2000);
    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    const toasterError = await (
      await $("//div[@class='dls-content']")
    ).getText();
    console.log(toasterError);
    expect(toasterError).toHaveTextContaining([
      "Unable to send selection, please try again.",
    ]);
    expect(toasterError).toHaveTextContaining([
      "100 seleted item. The limit is 40",
    ]);

    await (
      await Canvas.$willboreViewerCanvas
    ).waitForDisplayed({ timeout: 200000 });
    await (await $("(//mat-icon[@svgicon='close'])[3]")).waitForClickable();
    await (await $("(//mat-icon[@svgicon='close'])[3]")).click();
    await browser.pause(3000);
    try {
      await (await layers.$showLayers).waitForClickable();
      await (await layers.$showLayers).click();
    } catch (e) {
      await (await layers.$showLayers).waitForClickable();
      await (await layers.$showLayers).click();
    }
    await browser.pause(2000);
    console.log("****click on filter");
    await (await $("//mat-icon[@svgicon='filter-icon']")).waitForClickable();
    await (await $("//mat-icon[@svgicon='filter-icon']")).click();
    console.log("****remove layer***");
    try {
      await (await searchPanel.$backToResults).waitForClickable();
      await (await searchPanel.$backToResults).click();
    } catch (e) {
      console.log("****click on back if back to group result is display");
    }
    await (await $("//mat-icon[@svgicon='filter-reset']")).waitForClickable();
    await (await $("//mat-icon[@svgicon='filter-reset']")).click();
    await (await $("//span[text()=' Yes ']")).click();
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await browser.pause(5000);
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await browser.pause(5000);
  });
});
