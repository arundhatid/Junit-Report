const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const delfi = require("../../utils/methods/Login.Regre");
const login = require("../../utils/pageobjects/login.po.js");
var expectchai = require("chai").expect;
const summaryCardPo = require("../../utils/pageobjects/summaryCard.po");

describe("performs User works on Layers and Filters:", async () => {
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
      await mapWebelement.waitForDisplayed({ timeout: 90000 });
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

    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await browser.pause(2000);
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
    await browser.pause(2000);
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
    await (await $("//div[@class='layers-panel-header']")).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (await searchPanel.$noMatchingResults).waitForDisplayed();
    console.log("****verify hide all layer");
    const noMatchingresult = await (
      await $("(//div[@class='gis-no-matching-results'])[1]")
    ).getText();
    expect(noMatchingresult).toHaveTextContaining(
      ["No matching results"],
      "result are shows on lest panel even we hide all layers"
    );

    await browser.pause(5000);
    await (await layers.$showLayers).click();
    await (await $("//div[@class='layers-panel-header']")).click();
    await (await layers.$globalUnHideLayersBtn).waitForClickable();
    await (await layers.$globalUnHideLayersBtn).click();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchIcon).click();
    console.log("*****verify unhide layers & blank search");
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
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
    expectchai(
      await $("(//div[@class='search-item-row']/div)[5]").isDisplayed()
    ).to.be.true;

    const elem1 = await $("(//div[@class='search-item-row']/div)[1]/div");
    expect(elem1).toHaveTextContaining(
      [" Petrel  "],
      " Petrel reseult shows wronge on left panel"
    );
    const elem2 = await $("(//div[@class='search-item-row']/div)[2]/div");
    expect(elem2).toHaveTextContaining(
      [" Prospects  "],
      "prospects reseult shows wronge on left panel"
    );
    const elem3 = await $("(//div[@class='search-item-row']/div)[3]/div");
    expect(elem3).toHaveTextContaining(
      [" Seismic 2D Line  "],
      "Seismic 2D reseult shows wronge on left panel"
    );
    const elem4 = await $("(//div[@class='search-item-row']/div)[4]/div");
    expect(elem4).toHaveTextContaining(
      [" Seismic 3D Survey  "],
      "Seismic 3D reseult shows wronge on left panel"
    );
    const elem5 = await $("(//div[@class='search-item-row']/div)[5]/div");
    expect(elem5).toHaveTextContaining(
      [" Well Log  "],
      "Well log reseult shows wronge on left panel"
    );
    await browser.pause(5000);
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await browser.pause(5000);
  });
  it("Verify Filters", async () => {
    console.log("*****verify Filter test started");
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await $("//div[@class='layers-panel-header']")).click();
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
    await (
      await $("//a[@data-slb-id='side-panel-header-back-button']")
    ).click();

    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await browser.pause(8000);
    await (
      await $("(//div[@class='search-icon-label'])[1]")
    ).waitForDisplayed();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 10000 });
    console.log("*****left panel should shows only 2D & 3D layers");
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    console.log("*****2D");
    expectchai(
      await $("(//div[@class='search-item-row']/div)[2]").isDisplayed()
    ).to.be.true;
    console.log("*****3D");

    const elem1 = await (
      await $("(//div[@class='search-item-row']/div)[1]/div")
    ).getText();
    expect(elem1).toHaveTextContaining(
      [" Seismic 2D Line "],
      " Applied filter reseult shows wronge on left panel"
    );
    console.log("******Seismic 2D Line ");
    const elem2 = await $("(//div[@class='search-item-row']/div)[2]/div");
    expect(elem2).toHaveTextContaining(
      [" Seismic 3D Survey "],
      "Applied filter reseult shows wronge on left panel"
    );
    console.log("*****Seismic 3D Survey ");
    expectchai(
      await $("(//div[@class='search-item-row']/div)[3]").isDisplayed()
    ).to.be.not.true;
    console.log("***should not present");
    expectchai(
      await $("(//div[@class='search-item-row']/div)[4]").isDisplayed()
    ).to.be.not.true;
    console.log("***should not present");
    expectchai(
      await $("(//div[@class='search-item-row']/div)[5]").isDisplayed()
    ).to.be.not.true;
    console.log("***should not present");
    await browser.pause(5000);
  });
  it("Verify Filter summary", async () => {
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await $("//div[@class='layers-panel-header']")).click();
    console.log("*****click on filter");
    await (
      await $("//a[@data-slb-id='show-all-filters-button']")
    ).waitForClickable();
    await (await $("//a[@data-slb-id='show-all-filters-button']")).click();
    await (await summaryCardPo.$filterSummary3D).waitForDisplayed();
    const threeDSeismicFilter = await (
      await $("(//label[@class='ng-star-inserted'])[1]")
    ).getText();
    console.log(threeDSeismicFilter);
    expect(threeDSeismicFilter).toHaveText(
      ["Seismic 3D Survey"],
      "Applied filter reseult shows wronge on filter Summaery"
    );
    console.log(threeDSeismicFilter);
    const twoDSeismicFilter = await (
      await $("(//label[@class='ng-star-inserted'])[2]")
    ).getText();
    console.log(twoDSeismicFilter);
    expect(twoDSeismicFilter).toHaveText(
      ["Seismic 2D Line"],
      "Applied filter reseult shows wronge on filter Summaery"
    );
    await browser.pause(5000);
  });
  it("Verify Clear filter for hidden layer", async () => {
    console.log("****8Verify Clear filter for hidden layer test started");
    await (await $("//mat-icon[@data-mat-icon-name='arrow-left-5']")).click();
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await $("//div[@class='layers-panel-header']")).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    console.log("******hide all layers");
    await (await layers.$filterResetbtn).waitForDisplayed();
    console.log(
      "*****verify that reset filter btn is clickable or not for hide layers"
    );
    expectchai(
      await (await $("//mat-icon[@svgicon='filter-reset']")).isClickable()
    ).to.be.not.true;
    console.log("******reset filter btn should not be clickable to hide layer");
    await browser.pause(5000);
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

    await (
      await $("//a[@data-slb-id='side-panel-header-back-button']")
    ).click();
    console.log("*****unhide 2D");
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await browser.pause(4000);
    await (await map.$map).click();
    await (
      await $("(//div[@class='search-icon-label'])[1]")
    ).waitForDisplayed();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 90000 });
    expectchai(await searchPanel.$firstSearchResults.isDisplayed()).to.be.true;
    console.log("*****2D");
    const elem1 = await (
      await $("(//div[@class='search-item-row']/div)[1]/div")
    ).getText();
    expect(elem1).toHaveTextContaining(
      [" Seismic 2D Line "],
      "Seismic 2D Line are not shown on left panel "
    );
    expectchai(
      await $("(//div[@class='search-item-row']/div)[2]").isDisplayed()
    ).to.be.not.true;
    console.log("***should not present");
    expectchai(
      await $("(//div[@class='search-item-row']/div)[3]").isDisplayed()
    ).to.be.not.true;
    console.log("***should not present");
    expectchai(
      await $("(//div[@class='search-item-row']/div)[4]").isDisplayed()
    ).to.be.not.true;
    console.log("***should not present");
    expectchai(
      await $("(//div[@class='search-item-row']/div)[5]").isDisplayed()
    ).to.be.not.true;
    console.log("***should not present");

    await browser.pause(3000);
  });

  it("Verify Remove of Filter summary", async () => {
    console.log("****Verify Remove of Filter summary test started");
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await browser.pause(3000);

    try {
      await (await searchPanel.$backToResults).waitForClickable(timeout);
      await (await searchPanel.$backToResults).click();
    } catch (e) {
      console.log("****click on back if back to group result is display");
    }
    console.log("****click on filter");
    await (await layers.$filterIcon).waitForClickable();
    await (await layers.$filterIcon).click();
    console.log("****remove layer***");
    try {
      await (await searchPanel.$backToResults).waitForClickable();
      await (await searchPanel.$backToResults).click();
    } catch (e) {
      console.log("****click on back if back to group result is display");
    }
    await (await layers.$filterResetbtn).waitForDisplayed();
    await (await layers.$filterResetbtn).click();
    console.log("*****click on clear all filter btn");
    await (await $("//span[text()=' Yes ']")).click();
    await (await $("//p[text()='No filters are applied']")).waitForDisplayed();
    expectchai(
      await (await $("//p[text()='No filters are applied']")).isDisplayed()
    ).to.be.true;
    console.log("*****no filters are applied shows");
    console.log("*****FILTER FINISHED");
    await browser.pause(5000);
  });
});
