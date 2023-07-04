const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi = require("../../utils/methods/Login.Regre");
const login = require("../../utils/pageobjects/login.po.js");
const zoomToExtend = require("../../utils/methods/zoomToExtend");

var expectchai = require("chai").expect;

describe("Create a collections:", async () => {
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
    } catch (e) {}
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await browser.pause(2000);
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
    await browser.pause(2000);
  });

  it("Verify creation and display of Active Well collection", async () => {
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
    await (await layers.$WellLayerDropdown).waitForClickable();
    await (await layers.$WellLayerDropdown).click();
    await browser.pause(3000);
    console.log("****well filetr");

    await (
      await $("//span[contains(text(),'Unspecified')]")
    ).waitForClickable();
    await (await $("//span[contains(text(),'Unspecified')]")).click();

    await (await searchPanel.$crossResult).click();
    await browser.pause(3000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (await searchPanel.$firstSearchResults).moveTo();

    try {
      await Collections.$Actions.click();
      await Collections.$collectionMenu.click();
      await Collections.$Add.click();
      await (await Collections.$newCollection).waitForClickable();
      await Collections.$newCollection.click();
    } catch (e) {
      await Collections.$Actions.click();
      await Collections.$collectionMenu.click();
      await Collections.$Add.click();
      await (await Collections.$newCollection).waitForClickable();
      await Collections.$newCollection.click();
    }

    await browser.pause(3000);
    await (await Collections.$collectionName).waitForDisplayed();
    var ts = String(new Date().getTime());
    var k = "value";
    var i = 0;
    for (i = 1; i < ts.length; i++) {
      eval("var " + k + i + "= " + i + ";");
    }
    var change = ts++;
    console.log("change =" + change);
    await (await Collections.$collectionName).setValue("Well Logs Coll" + change);
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
    const activeProbeCard = await $("div.active-cards pioneer-collection-item");
    const cardTitle = await (
      await activeProbeCard.$("//div[@class='collection-container__header']")
    ).getText();
    //await (await Collections.$eyeUnhideIcon).click();
    expectchai(cardTitle).to.have.string("Well Logs");
    console.log("***verify coll Title");
    const createdOn = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='datetime']")
    ).getAttribute("svgicon");
    expectchai(createdOn).to.have.string("datetime");
    console.log("****created on");
    await browser.pause(8000);
    const createdBy = await (
      await activeProbeCard.$("//span[@class='creator']")
    ).getAttribute("class");
    expectchai(createdBy).to.have.string("creator");
    console.log("***created By");
    const wellIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='Well']")
    ).getAttribute("data-mat-icon-name");
    expectchai(wellIcon).to.have.string("Well");
    console.log("****1st icon should be well");
    const twoDLineIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='2d-line']")
    ).getAttribute("data-mat-icon-name");
    expectchai(twoDLineIcon).to.have.string("2d-line");
    console.log("*****2nd icon 2D icon");
    const ThreeDSeismicLineIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='3d-survey']")
    ).getAttribute("data-mat-icon-name");
    expectchai(ThreeDSeismicLineIcon).to.have.string("3d-survey");
    console.log("****3rd icon 3d survey");
    const otherIcon = await (
      await activeProbeCard.$("(//mat-icon[@data-mat-icon-name='more'])[2]")
    ).getAttribute("data-mat-icon-name");
    expectchai(otherIcon).to.have.string("more");
    console.log("*****4th icon others");
    await (
      await activeProbeCard.$("//button[@data-slb-id='card-menu']")
    ).click();
    const delet = await (
      await activeProbeCard.$("//button[@data-slb-id='delete']")
    ).getText();
    expectchai(delet).to.have.string("Delete");
    console.log("*****delete button should be visible after clicking 3 dots");
    await browser.pause(5000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });

    const activeCollectionCount = await (
      await activeProbeCard.$(
        "//span[@class='mdc-evolution-chip__text-label mat-mdc-chip-action-label'][normalize-space()='1']"
      )
    ).getText();
    expectchai(activeCollectionCount).to.have.string("1");
    console.log("******active coll num should be reflected on search bar");
    await (
      await activeProbeCard.$("//button[@data-slb-id='card-menu']")
    ).click();
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
    await (await $("//button[text()=' Remove ']")).click();
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
    await (
      await $("//a[@data-slb-id='side-panel-header-back-button']")
    ).waitForClickable();
    await (
      await $("//a[@data-slb-id='side-panel-header-back-button']")
    ).click();

    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await browser.pause(3000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(3000);
    await Collections.$Actions.click();
    await Collections.$collectionMenu.click();
    await Collections.$Add.click();
    await browser.pause(3000);
    await Collections.$newCollection.click();
    await browser.pause(3000);
    await (await Collections.$collectionName).waitForDisplayed();
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
    console.log("***checking active collection title");
    const activeProbeCard = await $("div.active-cards pioneer-collection-item");
    const cardTitle = await (
      await activeProbeCard.$("//div[@class='collection-container__header']")
    ).getText();
    //await (await Collections.$eyeUnhideIcon).click();
    expectchai(cardTitle).to.have.string("Seismic2d");
    const createdOn = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='datetime']")
    ).getAttribute("svgicon");
    expectchai(createdOn).to.have.string("datetime");
    console.log("****created on");
    await browser.pause(3000);
    const createdBy = await (
      await activeProbeCard.$("//span[@class='creator']")
    ).getAttribute("class");
    expectchai(createdBy).to.have.string("creator");
    console.log("*****created by***");
    const wellIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='Well']")
    ).getAttribute("data-mat-icon-name");
    expectchai(wellIcon).to.have.string("Well");
    console.log("****well");
    const twoDLineIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='2d-line']")
    ).getAttribute("data-mat-icon-name");
    expectchai(twoDLineIcon).to.have.string("2d-line");
    console.log("*****2nd icon 2-d line");
    const ThreeDSeismicLineIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='3d-survey']")
    ).getAttribute("data-mat-icon-name");
    expectchai(ThreeDSeismicLineIcon).to.have.string("3d-survey");
    console.log("***3rd icon 3d-survey");
    const otherIcon = await (
      await activeProbeCard.$("(//mat-icon[@data-mat-icon-name='more'])[2]")
    ).getAttribute("data-mat-icon-name");
    expectchai(otherIcon).to.have.string("more");
    console.log("*****4th icon more");
    await (
      await activeProbeCard.$("//button[@data-slb-id='card-menu']")
    ).click();
    const delet = await (
      await activeProbeCard.$("//button[@data-slb-id='delete']")
    ).getText();
    expectchai(delet).to.have.string("Delete");
    console.log("*****ckick on 3 dots & check delet");
    await browser.pause(3000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(8000);
    const activeCollectionCount = await (
      await activeProbeCard.$(
        "//span[@class='mdc-evolution-chip__text-label mat-mdc-chip-action-label'][normalize-space()='1']"
      )
    ).getText();
    console.log("******check active coll num on serch bar");
    expectchai(activeCollectionCount).to.have.string("1");

    await browser.pause(2000);
    await (
      await activeProbeCard.$("//button[@data-slb-id='card-menu']")
    ).click();
    await browser.pause(2000);
    await (await Collections.$deletButton).waitForDisplayed();
    await (await Collections.$deletButton).click();
    console.log("****delet coll");
    //validate the delete container
    await (await $("mat-dialog-container")).waitForDisplayed();

    await (await map.$confrimClear).click();
    console.log("*****checking the delete toaster");
    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();

    await (await Collections.$collectionTray).waitForClickable();
    await (await Collections.$collectionTray).click();
    await browser.pause(5000);
  });

  it("Verify creation and display of Seismic3d collection", async () => {
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    console.log("*****click on filter");
    await (await layers.$filterIcon).waitForClickable();
    await (await layers.$filterIcon).click();
    console.log("****remove layer***");
    await (await $("//button[text()=' Remove ']")).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await (await layers.$globalUnHideLayersBtn).waitForClickable();
    await (await layers.$globalUnHideLayersBtn).click();
    await browser.pause(2000);
    await (
      await $("//a[@data-slb-id='side-panel-header-back-button']")
    ).click();
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await searchPanel.$searchIcon).waitForClickable({ timeout: 10000 });
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Nova Scotia");
    await (await searchPanel.$searchIcon).click();

    // await (await layers.$Seismic3dHideBtn).waitForClickable();
    // await (await layers.$Seismic3dHideBtn).click();
    // await browser.pause(3000);
    // await (await layers.$Seismic3dDropdown).waitForClickable();
    // await (await layers.$Seismic3dDropdown).click();
    // await browser.pause(3000);
    // console.log("****click on seismic 3d filter");
    // await (await layers.$SeismicFilterSearch).waitForClickable();
    // await (await layers.$SeismicFilterSearch).click();
    // await browser.pause(3000);
    // console.log("****cross or back");

    // await (
    //   await $("//a[@data-slb-id='side-panel-header-back-button']")
    // ).click();

    // await (await searchPanel.$searchBox).click();
    // await (await searchPanel.$searchIcon).click();
    // await browser.pause(3000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(8000);
    await Collections.$Actions.click();
    await Collections.$collectionMenu.click();
    await Collections.$Add.click();
    await browser.pause(3000);
    await Collections.$newCollection.click();
    await browser.pause(3000);
    await (await Collections.$collectionName).waitForDisplayed();
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
    ).setValue("Coll for Seismic3d Line" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll for Seismic3d Line Descriptions");
    await (await Collections.$checkBox).waitForDisplayed();
    await browser.pause(3000);
    await (await Collections.$checkBox).click();
    await browser.pause(3000);
    await (await Collections.$saveButton).click();
    await browser.pause(3000);
    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).click();
    await browser.pause(8000);
    const activeProbeCard = await $("div.active-cards pioneer-collection-item");
    const cardTitle = await (
      await activeProbeCard.$("//div[@class='collection-container__header']")
    ).getText();
    //await (await Collections.$eyeUnhideIcon).click();
    expectchai(cardTitle).to.have.string("Seismic3d");
    console.log("****validate coll title");
    const createdOn = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='datetime']")
    ).getAttribute("svgicon");
    expectchai(createdOn).to.have.string("datetime");
    console.log("****created on");
    const createdBy = await (
      await activeProbeCard.$("//span[@class='creator']")
    ).getAttribute("class");
    expectchai(createdBy).to.have.string("creator");
    console.log("******created by");
    const wellIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='Well']")
    ).getAttribute("data-mat-icon-name");
    expectchai(wellIcon).to.have.string("Well");
    console.log("****1st icon should be well");
    const twoDLineIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='2d-line']")
    ).getAttribute("data-mat-icon-name");
    expectchai(twoDLineIcon).to.have.string("2d-line");
    console.log("****2nd icon 2d-line");
    const ThreeDSeismicLineIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='3d-survey']")
    ).getAttribute("data-mat-icon-name");
    expectchai(ThreeDSeismicLineIcon).to.have.string("3d-survey");
    console.log("*****3rd icon 3d-survey");
    const otherIcon = await (
      await activeProbeCard.$("(//mat-icon[@data-mat-icon-name='more'])[2]")
    ).getAttribute("data-mat-icon-name");
    expectchai(otherIcon).to.have.string("more");
    console.log("*****4th icon others");
    await (
      await activeProbeCard.$("//button[@data-slb-id='card-menu']")
    ).click();
    const delet = await (
      await activeProbeCard.$("//button[@data-slb-id='delete']")
    ).getText();
    expectchai(delet).to.have.string("Delete");
    console.log("****click on 3 dots & validate delete");
    await browser.pause(3000);

    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(5000);
    const activeCollectionCount = await (
      await activeProbeCard.$(
        "//span[@class='mdc-evolution-chip__text-label mat-mdc-chip-action-label'][normalize-space()='1']"
      )
    ).getText();
    expectchai(activeCollectionCount).to.have.string("1");
    console.log("****validate active coll num in serch bar");
    await (
      await activeProbeCard.$("//button[@data-slb-id='card-menu']")
    ).click();

    await browser.pause(5000);
    await (await Collections.$deletButton).click();
    //validate the delete container
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).click();
    console.log("*****checking the delete toaster");

    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();
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
    // console.log("***remove old filter");
    // await (await $("//button[text()=' Remove ']")).click();
    // await (await searchPanel.$crossResult).waitForClickable();
    // await (await searchPanel.$crossResult).click();
    // await browser.pause(3000);

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
      await (
        await $("(//input[@placeholder='Search attributes'])[5]")
      ).waitForClickable();
      await (await $("(//input[@placeholder='Search attributes'])[5]")).click();
    } catch (e) {
      await (
        await $("(//input[@placeholder='Search attributes'])[5]")
      ).waitForClickable();
      await (await $("(//input[@placeholder='Search attributes'])[5]")).click();
    }

    await (await $("//span[text()=' 003/06A (1) ']")).waitForClickable();
    await (await $("//span[text()=' 003/06A (1) ']")).click();
    await (
      await $("//span[contains(text(),' 003/13A (1) ')]")
    ).waitForClickable();
    await (await $("//span[contains(text(),' 003/13A (1) ')]")).click();
    await (
      await $("//span[contains(text(),' 003/23A (1) ')]")
    ).waitForClickable();
    await (await $("//span[contains(text(),' 003/23A (1) ')]")).click();
    await (
      await $("//span[contains(text(),' 003/23B (1) ')]")
    ).waitForClickable();
    await (await $("//span[contains(text(),' 003/23B (1) ')]")).click();
    await (
      await $("//span[contains(text(),' 003/24A (1) ')]")
    ).waitForClickable();
    await (await $("//span[contains(text(),' 003/24A (1) ')]")).click();
    await (
      await $("//span[contains(text(),' 003/24B (1) ')]")
    ).waitForClickable();
    await (await $("//span[contains(text(),' 003/24B (1) ')]")).click();

    console.log("****click on seach attributes for selectiong the layer");
    await browser.pause(5000);

    await (
      await $("//a[@data-slb-id='side-panel-header-back-button']")
    ).click();
    
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await browser.pause(3000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (await searchPanel.$firstSearchResults).waitForClickable();
    await browser.pause(8000);
    await Collections.$Actions.click();
    await Collections.$collectionMenu.click();
    await Collections.$Add.click();
    await browser.pause(3000);
    await Collections.$newCollection.click();
    await browser.pause(3000);
    await (await Collections.$collectionName).waitForDisplayed();
    var ts = String(new Date().getTime());
    var k = "value";
    var i = 0;
    for (i = 1; i < ts.length; i++) {
      eval("var " + k + i + "= " + i + ";");
    }
    var change = ts++;
    console.log("change =" + change);
    await (await Collections.$collectionName).setValue("Coll for Prospects" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll for Prospects Descriptions");
    await browser.pause(3000);
    await (await Collections.$checkBox).waitForDisplayed();
    await (await Collections.$checkBox).click();
    await browser.pause(2000);
    await (await Collections.$saveButton).click();
    await browser.pause(3000);
    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).click();
    await browser.pause(8000);
    const activeProbeCard = await $("div.active-cards pioneer-collection-item");
    const cardTitle = await (
      await activeProbeCard.$("//div[@class='collection-container__header']")
    ).getText();
    //await (await Collections.$eyeUnhideIcon).click();
    expectchai(cardTitle).to.have.string("Prospects");
    console.log("***cheching card title");
    const createdOn = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='datetime']")
    ).getAttribute("svgicon");
    expectchai(createdOn).to.have.string("datetime");
    console.log("****create on");

    const createdBy = await (
      await activeProbeCard.$("//span[@class='creator']")
    ).getAttribute("class");
    expectchai(createdBy).to.have.string("creator");
    console.log("*****creadted by");
    const wellIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='Well']")
    ).getAttribute("data-mat-icon-name");
    expectchai(wellIcon).to.have.string("Well");
    console.log("*****1st icon should be well");
    const twoDLineIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='2d-line']")
    ).getAttribute("data-mat-icon-name");
    expectchai(twoDLineIcon).to.have.string("2d-line");
    console.log("*****2nd icon 2d-line");
    const ThreeDSeismicLineIcon = await (
      await activeProbeCard.$("//mat-icon[@data-mat-icon-name='3d-survey']")
    ).getAttribute("data-mat-icon-name");
    expectchai(ThreeDSeismicLineIcon).to.have.string("3d-survey");
    console.log("*****3rd icon 3d-survey");
    const otherIcon = await (
      await activeProbeCard.$("(//mat-icon[@data-mat-icon-name='more'])[2]")
    ).getAttribute("data-mat-icon-name");
    expectchai(otherIcon).to.have.string("more");
    console.log("***4th icon others");
    await (
      await activeProbeCard.$("//button[@data-slb-id='card-menu']")
    ).click();
    const delet = await (
      await activeProbeCard.$("//button[@data-slb-id='delete']")
    ).getText();
    expectchai(delet).to.have.string("Delete");
    console.log("****click on 3 dots, validate delete");
    await browser.pause(3000);
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(3000);
    const activeCollectionCount = await (
      await activeProbeCard.$(
        "//span[@class='mdc-evolution-chip__text-label mat-mdc-chip-action-label'][normalize-space()='1']"
      )
    ).getText();
    expectchai(activeCollectionCount).to.have.string("1");
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
    await (await $("//button[text()=' Remove ']")).click();

    await (await $("//mat-icon[@svgicon='close']")).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await (await layers.$globalUnHideLayersBtn).waitForClickable();
    await (await layers.$globalUnHideLayersBtn).click();

    await (await $("//mat-icon[@data-mat-icon-name='arrow-left-5']")).click();
  });

  it("Create Four Collection", async () => {
    const layer = "cheal";
    const mapWebelement = await map.$map;
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Cheal");
    await (await searchPanel.$searchIcon).click();
    console.log("***Search cheal well log****");
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(3000);
    await (await Collections.$Actions).waitForClickable({ timeout: 90000 });
    await Collections.$Actions.click();
    await Collections.$collectionMenu.click();
    await (await Collections.$Add).waitForClickable({ timeout: 80000 });
    await Collections.$Add.click();
    await (
      await Collections.$newCollection
    ).waitForClickable({ timeout: 80000 });
    await Collections.$newCollection.click();
    console.log("****Creating collection****");
    await (await Collections.$collectionName).waitForDisplayed();
    await browser.pause(3000);
    await (
      await Collections.$collectionName
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionName).setValue("Active Collection_02");
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
    await (await $("//div[text()='Results saved.']")).waitForDisplayed();
    await browser.pause(3000);
    console.log("*****creat 3rd coll");

    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();

    await zoomToExtend.zoomToExtend(layer);
    await browser.pause(5000);
    // await (await map.$zoomplus).waitForClickable();
    // await (await map.$zoomplus).click();

    //click on rect selection
    console.log("*****rectangular selection");
    await map.$rectSelect.waitForClickable();
    await map.$rectSelect.click();
    const rectSelect = await map.$rectSelect;
    expect(rectSelect).toBeClickable();
    await browser.pause(9000);

    await mapWebelement.dragAndDrop({ x: 100, y: 50 });

    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (await Collections.$Actions).waitForClickable({ timeout: 90000 });
    await Collections.$Actions.click();
    await Collections.$collectionMenu.click();
    await (await Collections.$Add).waitForClickable({ timeout: 80000 });
    await Collections.$Add.click();
    await (
      await Collections.$newCollection
    ).waitForClickable({ timeout: 80000 });
    await Collections.$newCollection.click();
    console.log("****Creating collection****");
    await (await Collections.$collectionName).waitForDisplayed();
    await browser.pause(3000);
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
    await (await Collections.$collectionName).setValue("Active Collection_03" + change);
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
    await (await $("//div[text()='Results saved.']")).waitForDisplayed();
    console.log("****for coll num 4");
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    // await mapWebelement.dragAndDrop({ x: 20, y: 50 });
    console.log("*****rectangular selection");
    await map.$rectSelect.waitForClickable();
    await map.$rectSelect.click();
    await browser.pause(9000);
    await mapWebelement.dragAndDrop({ x: 200, y: 80 });

    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (await Collections.$Actions).waitForClickable({ timeout: 90000 });
    await Collections.$Actions.click();
    await Collections.$collectionMenu.click();
    await (await Collections.$Add).waitForClickable({ timeout: 80000 });
    await Collections.$Add.click();
    await (
      await Collections.$newCollection
    ).waitForClickable({ timeout: 80000 });
    await Collections.$newCollection.click();
    console.log("****Creating collection****");
    await (await Collections.$collectionName).waitForDisplayed();
    await browser.pause(3000);
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
    await (await Collections.$collectionName).setValue("Active Collection_04" + change);
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
    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    await (await $("//div[text()='Results saved.']")).waitForDisplayed();
    //await (await Collections.$eyeUnhideIcon).click();
    console.log("****four active coll created");
    await browser.pause(5000);
  });
  it("Verify Active Collection to appear on right side on Collection Tray", async () => {
    console.log(
      "****Active Collection to appear on right side on Collection Tray test case staerd"
    );

    const cardTitle1 = await (
      await $(
        "(//div[@class='container is-activated']//h6[@class='mat-mdc-tooltip-trigger'])[1]"
      )
    ).getText();
    expectchai(cardTitle1).to.have.string("Coll For Prospects");
    console.log(
      "*****validating active coll appear on right side of coll tray*****"
    );

    const cardTitle2 = await (
      await $(
        "(//div[@class='container is-activated']//h6[@class='mat-mdc-tooltip-trigger'])[2]"
      )
    ).getText();
    expectchai(cardTitle2).to.have.string("Active Collection_04");
    console.log(
      "*****validating 2nd active coll appear on 1st side of coll tray*****"
    );
    await browser.pause(5000);

    await (
      await $(
        "(//div[@class='container is-activated']//mat-icon[@data-mat-icon-name='arrow-right-5'])[1]"
      )
    ).waitForClickable();
    await (
      await $(
        "(//div[@class='container is-activated']//mat-icon[@data-mat-icon-name='arrow-right-5'])[1]"
      )
    ).click();
    console.log("****inactive the coll for Prospect");
    await browser.pause(5000);
    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll For Prospects"
    );
    console.log(
      "*****validating 1st Inactive coll appear on 1st in Avl Card of coll tray*****"
    );
    await browser.pause(5000);
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
    await browser.pause(5000);
    await (await searchPanel.$firstSearchResults).waitForDisplayed();
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
    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    const toasterSave1 = await (
      await $("//div[@class='dls-content']")
    ).getText();
    console.log(toasterSave1);
    await browser.pause(2000);
    await (await $("//div[text()='Results added.']")).waitForDisplayed();
    const toasterSave2 = await (
      await $("//div[text()='Results added.']")
    ).getText();
    console.log(toasterSave2);
    expect(toasterSave2).toHaveTextContaining(
      ["Results added."],
      "result is not added to active coll"
    );
    const countOnActiveColl = await $(
      "(//div[@class='container is-activated']//div[@class='count'])[3]"
    );

    await expect(countOnActiveColl).toHaveText(
      ["5"],
      "num of layers increase are not reflecting on active coll card"
    );
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
    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    const toasterRemove1 = await (
      await $("//div[@class='dls-content']")
    ).getText();
    console.log(toasterRemove1);
    await browser.pause(2000);
    await (await $("//div[text()='Results removed.']")).waitForDisplayed();
    const toasterRemove2 = await (
      await $("//div[text()='Results removed.']")
    ).getText();
    console.log(toasterRemove2);
    expect(toasterSave2).toHaveTextContaining(
      ["Results removed."],
      "result is not removed from active coll"
    );
    await browser.pause(3000);
    const countOnActiveCollRemove = await $(
      "(//div[@class='container is-activated']//div[@class='count'])[3]"
    );

    await expect(countOnActiveCollRemove).toHaveText(
      ["3"],
      "num of layers decrease are not reflecting on active coll card"
    );
    console.log("****result remove from active coll");
    await browser.pause(3000);
    await (
      await $("(//button[@data-slb-id='card-menu'])[1]")
    ).waitForDisplayed();
    await (
      await $("(//button[@data-slb-id='card-menu'])[1]")
    ).waitForClickable();
    await (await $("(//button[@data-slb-id='card-menu'])[1]")).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();

    await (await map.$confrimClear).click();
    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();
    console.log("*****one coll is deleted");
    await browser.pause(3000);
    await (
      await $("(//button[@data-slb-id='card-menu'])[1]")
    ).waitForDisplayed();
    await (
      await $("(//button[@data-slb-id='card-menu'])[1]")
    ).waitForClickable();
    await (await $("(//button[@data-slb-id='card-menu'])[1]")).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();

    await (await map.$confrimClear).click();
    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();
    console.log("*****2nd coll is deleted");
    await browser.pause(3000);
    await (
      await $("(//button[@data-slb-id='card-menu'])[1]")
    ).waitForDisplayed();
    await (
      await $("(//button[@data-slb-id='card-menu'])[1]")
    ).waitForClickable();
    await (await $("(//button[@data-slb-id='card-menu'])[1]")).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();

    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();
    console.log("****3rd coll is deletd");
    await browser.pause(3000);
    await (await Collections.$collectionTray).click();

    await browser.pause(4000);
  });
  it("Verify collection can not be created with same name", async () => {
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await searchPanel.$searchBox).waitForClickable({ timeout: 10000 });
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("PEG0906M1000");
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (await searchPanel.$firstSearchResults).moveTo();
    await browser.pause(3000);
    await (await Collections.$Actions).waitForClickable({ timeout: 90000 });
    await Collections.$Actions.click();
    await (await Collections.$collectionMenu).click();
    await (await Collections.$Add).waitForClickable({ timeout: 80000 });
    await Collections.$Add.click();
    await (
      await Collections.$newCollection
    ).waitForClickable({ timeout: 80000 });
    await Collections.$newCollection.click();
    console.log("****Creating collection****");
    await (await Collections.$collectionName).waitForDisplayed();
    await browser.pause(3000);
    await (
      await Collections.$collectionName
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionName).setValue("Active Collection_02");
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
    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    await browser.pause(3000);
    console.log("****checking the erroem message");
    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    console.log("****toaster appear");
    const toasterSaveError = await (
      await $("//div[contains(text(),'Unable to save results')]")
    ).getText();
    console.log("****unable to save");
    expectchai(toasterSaveError).to.have.string(
      "Unable to save results, please try again."
    );
    console.log("****assert pass");
    await (await Collections.$collectionTray).waitForClickable();
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);
    await (
      await $("(//button[@data-slb-id='card-menu'])[1]")
    ).waitForDisplayed();
    await (
      await $("(//button[@data-slb-id='card-menu'])[1]")
    ).waitForClickable();
    await (await $("(//button[@data-slb-id='card-menu'])[1]")).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();
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
