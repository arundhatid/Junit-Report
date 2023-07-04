const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const SummaryCard = require("../../utils/pageobjects/summaryCard.po");
const delfi = require("../../utils/methods/Login.Regre");
const login = require("../../utils/pageobjects/login.po.js");
const Canvas = require("../../utils/pageobjects/canvas.po.js");

var expectchai = require("chai").expect;

describe("Seismic data in 2D Viewer:", async () => {
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
    await browser.pause(5000);
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
    await browser.pause(2000);
  });
  it(" Vaerify that Seismic 2D layer to be present along with other layers", async () => {
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await browser.pause(8000);
    await (await layers.$layersTitle).waitForDisplayed({ timeout: 80000 });
    await (await layers.$layersPresent).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await layers.$layersPresent).isDisplayed()).to.be.true;
    console.log("*****Seismic 2D layer to be present along with other layers");
    await (await searchPanel.$crossResult).click();
    await browser.pause(5000);
  });

  it("Verify the particular Seismic layer after searching", async () => {
    const mapWebelement = await map.$map;
    await (await searchPanel.$searchBox).click();

    await (await searchPanel.$searchBox).setValue("nz 2D line");
    await (await searchPanel.$searchIcon).click();
    console.log("****8serech particular seismic layer");
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });

    const searchResult = await (
      await $('(//div[@class="search-item-row"]/div)[1]')
    ).getText();
    expect(searchResult).toHaveTextContaining(
      [" Seismic 2D Line "],
      "search Result is not display on left panel"
    );
    console.log("****search result should be appear on left panel");
    await browser.pause(5000);
    await layers.$MoveCheckbox.waitForClickable();
    await (await layers.$MoveCheckbox).click();
    await browser.pause(3000);
    console.log("********click on move check box");
    await mapWebelement.dragAndDrop({ x: 500, y: -300 });
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(10000);
    const searchResultAfterMove = await (
      await $('(//div[@class="search-item-row"]/div)[1]')
    ).getText();
    console.log(searchResultAfterMove);
    expect(searchResultAfterMove).toHaveTextContaining(
      [" Seismic 2D Line  "],
      "search Result is not display on left panel afer chick on update checkBox * move the map"
    );

    await browser.pause(5000);
  });

  it("Verify Results after Applying filters on seismic layer", async () => {
    await (await searchPanel.$crossResult).waitForClickable();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await searchPanel.$searchBox).waitForClickable({ timeout: 10000 });
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("PEG0906M1000");
    await (await searchPanel.$searchIcon).click();

    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (await searchPanel.$firstSearchResults).waitForClickable();
    await (await searchPanel.$firstSearchResults).click();
    await browser.pause(4000);
    try {
      await (await searchPanel.$backToResults).isDisplayed();
      await (await searchPanel.$backToResults).click();
      await (await searchPanel.$firstSearchResults).click();
    } catch (e) {
      console.log("****click on back if back to group result is display");
      await (await searchPanel.$firstSearchResults).click();
    }
    await (
      await SummaryCard.$open2DViewer
    ).waitForDisplayed({ timeout: 80000 });
    const dataCount = await (
      await $("//mat-icon[@title='Open 2D Viewer']/span")
    ).getText();
    console.log(dataCount);
    expect(dataCount).toHaveText(
      ["1"],
      "2D Seismic icon is not shown  as a badge with the number of 2D lines available. "
    );

    await browser.pause(3000);
    await (await SummaryCard.$seismicFirstCard).waitForClickable();
    await (await SummaryCard.$seismicFirstCard).click();
    await (await SummaryCard.$seismicFirstCard).click();

    console.log("****click on 1st Layer to varify summery card");
    await browser.pause(3000);
    await (
      await SummaryCard.$thumbnailImageContainer
    ).waitForDisplayed({ timeout: 80000 });
    console.log("*****checking the card is expandable or not");
    expectchai(
      await (
        await $("//div[@class='gis-thumbnail-image-container']")
      ).isDisplayed()
    ).to.be.true;
    console.log("*****Image container is present");
  });

  it("Validate 2D Viewer ", async () => {
    await (await SummaryCard.$2DViewerBtn).waitForDisplayed({ timeout: 80000 });
    await (await SummaryCard.$2DViewerBtn).waitForClickable({ timeout: 80000 });
    console.log("*****click on 2d viewer btn");
    await (await SummaryCard.$2DViewerBtn).click();
    console.log("*****wait for till canvas open");
    await (await SummaryCard.$viz2DViewercanvas).waitForDisplayed();
    await browser.pause(8000);
    console.log("****canvas is open successully");
    const dataCountOnVierwer = await (
      await $("//span[@class='ng-star-inserted']")
    ).getText();
    console.log(dataCountOnVierwer);
    expect(dataCountOnVierwer).toHaveText(
      ["Record 1"],
      " bulk data is not associated with the card "
    );
    console.log("***verify reset view is prent or not");
    await (await SummaryCard.$ViewerFullScreen).waitForDisplayed();
    await browser.pause(5000);
    await (await SummaryCard.$ViewerFullScreen).waitForClickable();
    await (await SummaryCard.$ViewerFullScreen).click();
    await (await SummaryCard.$resetview).waitForDisplayed();
    expectchai(await (await SummaryCard.$resetview).isDisplayed()).to.be.true;
    console.log("****reset view");
    await (await SummaryCard.$resetAllsetting).waitForDisplayed();
    expectchai(await (await SummaryCard.$resetAllsetting).isDisplayed()).to.be
      .true;
    console.log("*****reset all setting");
    expectchai(await (await SummaryCard.$rubberBandTool).isDisplayed()).to.be
      .true;
    console.log("****rubber band tool");
    expectchai(await (await SummaryCard.$crossHairTool).isDisplayed()).to.be
      .true;
    console.log("*****cross Hair Tool");
    expectchai(await (await SummaryCard.$headersGrids).isDisplayed()).to.be
      .true;
    console.log("*****header grid");
    expectchai(await (await SummaryCard.$scale).isDisplayed()).to.be.true;
    console.log("****scale");
    expectchai(await (await SummaryCard.$colourChangingDropDwn).isDisplayed())
      .to.be.true;
    console.log("******colour chnageing");
    expectchai(await (await SummaryCard.$sliceButton).isDisplayed()).to.be.true;
    console.log("****verify all button on 2D viewer");
    await browser.pause(5000);
  });

  it("Verify Rubber band view button", async () => {
    await (await SummaryCard.$rubberBandTool).waitForDisplayed();
    await (await SummaryCard.$viz2DViewercanvas).waitForDisplayed();
    expectchai(await (await SummaryCard.$rubberBandTool).isDisplayed()).to.be
      .true;
    await browser.pause(3000);
    await (await SummaryCard.$rubberBandTool).waitForClickable();

    await (await SummaryCard.$rubberBandTool).click();
    console.log("****draw rectanale on canvas");
    await SummaryCard.$viz2DViewercanvas.dragAndDrop({ x: 200, y: 100 });
    await browser.pause(10000);

    await (await Canvas.$canvasZoomPlus).waitForClickable();
    await (await Canvas.$canvasZoomPlus).click();
    console.log("****zoom plus");
    await (await SummaryCard.$panningTool).waitForClickable();
    expectchai(await (await SummaryCard.$panningTool).isClickable()).to.be.true;
    await (await SummaryCard.$panningTool).click();
    console.log("*****panning tool");
    await SummaryCard.$viz2DViewercanvas.dragAndDrop({ x: 200, y: 100 });
    await browser.pause(5000);
    await (await Canvas.$canvasZoomminus).click();
    console.log("***zoom minus");
    await browser.pause(3000);
    await (await SummaryCard.$resetview).waitForClickable();
    await (await SummaryCard.$resetview).click();
    await browser.pause(5000);

    await (await SummaryCard.$crossHairTool).waitForClickable();
    await (await SummaryCard.$crossHairTool).click();
    console.log("*****click on cross hair tool");
    await (await SummaryCard.$viz2DViewercanvas).click();
    await (await SummaryCard.$pointDetails).waitForDisplayed();
    console.log("****verify the point detail table appear");
    expectchai(await (await SummaryCard.$pointDetails).isDisplayed()).to.be
      .true;
    await (await SummaryCard.$Trace).waitForDisplayed();
    expectchai(await (await SummaryCard.$Trace).isDisplayed()).to.be.true;
    await browser.pause(5000);

    await (
      await $(
        "//button[@class='crosshair-readouts__button crosshair-readouts__button--close']"
      )
    ).click();
    await (await SummaryCard.$headersGrids).waitForClickable();
    await (await SummaryCard.$headersGrids).click();
    console.log("****click on header grids");
    await browser.pause(3000);
    await (await SummaryCard.$viz2DViewercanvas).waitForDisplayed();
    expectchai(await (await SummaryCard.$viz2DViewercanvas).isDisplayed()).to.be
      .true;
    console.log("*****verify header grid");
    await (await SummaryCard.$headersGrids).waitForClickable();
    await (await SummaryCard.$headersGrids).click();
    console.log("*****close header grid");
    await browser.pause(5000);
  });

  it("Verify Reset settings", async () => {
    await (await SummaryCard.$scaleDropDwn).waitForClickable();
    await (await SummaryCard.$scaleDropDwn).click();
    console.log("*****click on scale drop down");
    await (await SummaryCard.$scalevalue1).click();
    console.log("******select value1 0.3");
    await browser.pause(3000);
    await (await SummaryCard.$scaleDropDwn).click();
    await (await SummaryCard.$scalevalue2).click();
    console.log("******select value2 0.5");
    await browser.pause(3000);
    await (await SummaryCard.$gainIncrease).waitForDisplayed();
    await (await SummaryCard.$gainIncrease).click();

    await browser.pause(3000);
    console.log("*****gain increase");
    await (await SummaryCard.$colourChangingDropDwn).waitForClickable();
    await (await SummaryCard.$colourChangingDropDwn).click();
    console.log("*****click on colour changing drop down");
    await (await SummaryCard.$selectColour).click();
    console.log("*****chnage colour");
    await browser.pause(10000);
    await (await SummaryCard.$gainDecrease).click();
    console.log("*****decrese gain");
    await (await SummaryCard.$resetAllsetting).click();
    await browser.pause(10000);
  });
  it("Verify Go to slice button", async () => {
    await (await SummaryCard.$sliceButton).waitForDisplayed();
    await (await SummaryCard.$sliceButton).click();
    console.log("******click on slice btn");
    await (await SummaryCard.$sliceClickPopUp).waitForDisplayed();
    const sliceClickPopUpMSG = await (
      await $(
        "(//div[@class='ng-star-inserted']//div[@class='ng-star-inserted'])[2]"
      )
    ).getText();
    console.log(sliceClickPopUpMSG);
    expect(sliceClickPopUpMSG).toHaveTextContaining(
      [" Navigation to specific slices is not available for this file. "],
      "pop up is not launch after clicking on slice btn"
    );
    console.log("******Verufy pop up");
    await browser.pause(5000);
    await (await $("(//mat-icon[@svgicon='close'])[2]")).waitForClickable();
    expectchai(
      await (await $("(//mat-icon[@svgicon='close'])[2]")).isClickable()
    ).to.be.true;
    await (await $("(//mat-icon[@svgicon='close'])[2]")).click();
    console.log("*****cross the 2D viewer");
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    console.log("*****SEISMIC 2D FINISHED");
    await browser.pause(3000);
  });
});
