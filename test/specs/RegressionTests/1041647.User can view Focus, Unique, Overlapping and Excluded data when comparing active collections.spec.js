const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const map = require("../../utils/pageobjects/map.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi = require("../../utils/methods/Login.Regre");
const login = require("../../utils/pageobjects/login.po.js");
const layers = require("../../utils/pageobjects/layers.po");
const zoomToExtend = require("../../utils/methods/zoomToExtend");

var expectchai = require("chai").expect;

describe("Verify Focus, Unique, Overlapping and Excluded data when comparing active collections:", async () => {
  before(async () => {
    var USER_ID = process.env["TESTUSER1"];
    var PASSWORD = process.env["TESTUSERPASSWORD1"];
    var SECRET_KEY = process.env["SECRET_KEY1"];
    const URL = "https://evq.discovery.cloud.slb-ds.com/";

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
      const mapWebelement = await map.$map;
      await mapWebelement.waitForDisplayed();
      console.log("*******title =" + (await browser.getTitle()));

      let titleMatch = (await browser.getTitle()).localeCompare(
        "Data Discovery"
      );
      console.log("***checking Authentication****");
      expectchai(
        (await browser.getTitle()).localeCompare("Data Discovery")
      ).to.be.equals(+0);
      console.log("*****" + titleMatch);
    }
    try {
      await (await map.$clear).waitForClickable();
      await (await map.$clear).click();
      await (await map.$confrimClear).waitForDisplayed();
      await (await map.$confrimClear).click();
      await browser.pause(2000);
      await (await map.$zoomToWorldView).waitForClickable();
      await map.$zoomToWorldView.click();
      await browser.pause(2000);
    } catch (e) {
      await (await map.$clear).waitForClickable();
      await (await map.$clear).click();
      await (await map.$confrimClear).waitForDisplayed();
      await (await map.$confrimClear).click();
      await browser.pause(2000);
      await (await map.$zoomToWorldView).waitForClickable();
      await map.$zoomToWorldView.click();
    }
    await browser.pause(5000);
  });

  it("Verify toolbar tools activation", async () => {
    const layer = "cheal";
    const mapWebelement = await map.$map;
    try {
      await (await searchPanel.$crossResult).isDisplayed();
      await (await searchPanel.$crossResult).click();
    } catch (e) {
      console.log("****if layer are shown than click on cross");
    }
    await browser.pause(5000);
    await zoomToExtend.zoomToExtend(layer);
    await browser.pause(3000);
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();

    //click on rect selection
    console.log("*****rectangular selection");
    await map.$rectSelect.waitForClickable();
    await map.$rectSelect.click();
    const rectSelect = await map.$rectSelect;
    expect(rectSelect).toBeClickable();
    await browser.pause(5000);
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
    await (
      await Collections.$collectionName
    ).setValue("Coll For Toolbar tools Testing" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll For Toolbar tools Testing Descriptions");
    await (await Collections.$checkBox).waitForDisplayed();
    await (await Collections.$checkBox).waitForClickable({ timeout: 80000 });
    await (await Collections.$checkBox).click();
    console.log("***save coll*****");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();

    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    const toasterSave1 = await (
      await $("//div[@class='dls-content']")
    ).getText();
    console.log(toasterSave1);
    await browser.pause(2000);
    const toasterSave2 = await (
      await $("//div[@class='dls-content']")
    ).getText();
    console.log(toasterSave2);
    await browser.pause(4000);
    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    const toasterSave3 = await (
      await $("//div[@class='dls-content']")
    ).getText();
    console.log(toasterSave3);

    await (await Collections.$collectionTray).waitForDisplayed();
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await browser.pause(10000);
    console.log("****Verify Inactivating of Active Collections ");
    await (
      await $(
        "(//div[@class='container is-activated']//mat-icon[@data-mat-icon-name='arrow-right-5'])[1]"
      )
    ).click();
    console.log("***uncheck the active checkbox");
    await browser.pause(3000);
    expectchai(await (await Collections.$modeViewToolbar).isDisplayed()).to.be
      .not.true;
    console.log("***modes are not display");

    await (await Collections.$activeCollCheckBox).waitForDisplayed();
    await (await Collections.$activeCollCheckBox).click();
    expectchai(await (await Collections.$modeViewToolbar).isDisplayed()).to.be
      .true;
    await browser.pause(5000);
    await (await Collections.$focusMode).moveTo();
    await (await $("(//div[text()='Focus'])[2]")).waitForDisplayed();
    expect(await (await $("(//div[text()='Focus'])[2]")).getText()).toHaveText(
      "Focus"
    );
    console.log("*****hover");
    await browser.pause(3000);
    await (await Collections.$overlapMode).moveTo();
    await (await $("(//div[text()='Overlap'])[2]")).waitForDisplayed();
    expect(
      await (await $("(//div[text()='Overlap'])[2]")).getText()
    ).toHaveText("Overlap");
    await (await Collections.$uniqueMode).moveTo();
    await browser.pause(3000);
    await (await $("(//div[text()='Unique'])[2]")).waitForDisplayed();
    expect(await (await $("(//div[text()='Unique'])[2]")).getText()).toHaveText(
      "Unique"
    );
    await (await Collections.$excludeMode).moveTo();
    await browser.pause(3000);
    await (await $("(//div[text()='Exclude'])[2]")).waitForDisplayed();
    expect(
      await (await $("(//div[text()='Exclude'])[2]")).getText()
    ).toHaveText("Exclude");
    await browser.pause(3000);
  });

  it("Verify behavior when User selects clicks on Focus", async () => {
    console.log(
      "*****Verify behavior when User selects clicks on Focus test strated"
    );
    await (await Collections.$focusMode).waitForDisplayed();
    await (await Collections.$focusMode).waitForClickable();
    await (await Collections.$focusMode).click();
    console.log("***click on focus mode");
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await searchPanel.$firstSearchResults).isDisplayed()).to
      .be.true;
    console.log("****verify result panel");
    await browser.pause(3000);
  });
  it("Verify behavior when User selects clicks on Overlapping", async () => {
    console.log(
      "*****Verify behavior when User selects clicks on Overlapping test strated"
    );
    const mapWebelement = await map.$map;
    await mapWebelement.dragAndDrop({ x: 50, y: 50 });
    await map.$rectSelect.waitForClickable();
    await map.$rectSelect.click();
    console.log("*****rectangular selection");
    const rectSelect = await map.$rectSelect;
    expect(rectSelect).toBeClickable();
    await browser.pause(9000);
    await mapWebelement.dragAndDrop({ x: 120, y: 70 });
    await browser.pause(10000);
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
    await (
      await Collections.$collectionName
    ).setValue("Coll For Overlap tools Testing" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll For Overlap tools Testing Descriptions");
    await (await Collections.$checkBox).waitForDisplayed();
    await (await Collections.$checkBox).waitForClickable({ timeout: 80000 });
    await (await Collections.$checkBox).click();
    console.log("***save coll*****");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    await (await Collections.$collectionTray).click();
    await (await $("//div[text()='Results saved.']")).waitForDisplayed();
    await (await Collections.$overlapMode).waitForDisplayed();
    await (await Collections.$overlapMode).waitForClickable();
    await (await Collections.$overlapMode).click();
    console.log("*****click on overlap mode");
    await browser.pause(3000);
    await (await Collections.$collectionTray).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await browser.pause(8000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await searchPanel.$firstSearchResults).isDisplayed()).to
      .be.true;
    console.log("*****verify result panel");
    await (await Collections.$collectionTray).click();
    await browser.pause(4000);
  });

  it("Verify behavior when User selects clicks on Unique", async () => {
    console.log(
      "*******Verify behavior when User selects clicks on Unique test started"
    );
    await (await Collections.$uniqueMode).waitForDisplayed();
    await (await Collections.$uniqueMode).waitForClickable();
    await (await Collections.$uniqueMode).click();
    console.log("*****click on unique mode");
    await browser.pause(3000);
    await (await Collections.$collectionTray).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await browser.pause(3000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await searchPanel.$firstSearchResults).isDisplayed()).to
      .be.true;
    console.log("****verify result panel");
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);
  });

  it("Verify behavior when User selects clicks on Excluded", async () => {
    const mapWebelement = await map.$map;
    console.log(
      "******Verify behavior when User selects clicks on Excluded test started"
    );
    const activeProbeCard = await $("div.active-cards pioneer-collection-item");
    await (await Collections.$excludeMode).waitForDisplayed();
    await (await Collections.$excludeMode).waitForClickable();
    await (await Collections.$excludeMode).click();
    console.log("****click on Exclude mode");
    await browser.pause(15000);
    await (await Collections.$collectionTray).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await browser.pause(9000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    expectchai(await (await searchPanel.$firstSearchResults).isDisplayed()).to
      .be.true;
    console.log("*****verify result panel");
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);
    await (await Collections.$excludeMode).waitForDisplayed();
    await (await Collections.$excludeMode).waitForClickable();
    await (await Collections.$excludeMode).click();
    await browser.pause(3000);
    console.log("******update result when map move ");
    await (await Collections.$focusMode).moveTo();
    await (await Collections.$focusMode).click();
    await browser.pause(5000);
    await (await Collections.$collectionTray).click();
    await layers.$MoveCheckbox.waitForClickable();
    await (await layers.$MoveCheckbox).click();
    await (await map.$zoomplus).waitForClickable();
    await (await map.$zoomplus).click();
    await browser.pause(5000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 100000 });
    expectchai(await $("(//div[@class='search-icon-label'])[1]").isDisplayed())
      .to.be.true;

    await (await map.$zoomplus).click();
    await browser.pause(3000);
    await mapWebelement.dragAndDrop({ x: -200, y: -100 });
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 100000 });

    await (await map.$zoomMinus).click();
    await browser.pause(3000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 100000 });
    await browser.pause(3000);
    await (await Collections.$collectionTray).click();
    await (await Collections.$focusMode).waitForClickable();
    await (await Collections.$focusMode).click();
    await (
      await activeProbeCard.$("(//button[@data-slb-id='card-menu'])[2]")
    ).waitForDisplayed();

    await (
      await activeProbeCard.$("(//button[@data-slb-id='card-menu'])[2]")
    ).waitForClickable();
    await (
      await activeProbeCard.$("(//button[@data-slb-id='card-menu'])[2]")
    ).click();
    await (await Collections.$deletButton).waitForClickable();
    await (await Collections.$deletButton).click();
    await browser.pause(3000);
    console.log("*****click on delete coll");
    await (await $("mat-dialog-container")).waitForDisplayed();
    await browser.pause(3000);
    await (await map.$confrimClear).click();
    await browser.pause(3000);
    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();
    await browser.pause(3000);
  });

  it("Verify Map and results panel updates when:Users  add/remove data from active collections", async () => {
    await (await searchPanel.$searchBox).waitForDisplayed({ timeout: 100000 });
    await (await searchPanel.$searchIcon).waitForClickable({ timeout: 10000 });
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Nova Scotia");
    await (await searchPanel.$searchIcon).click();
    console.log("***Search 3d ****");
    await (await searchPanel.$searchBox).moveTo();
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
      await Collections.$activeCollections
    ).waitForClickable({ timeout: 80000 });
    await Collections.$activeCollections.click();
    console.log("****3D are added to active coll");
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
      ["4"],
      "num of layers increase are not reflecting on active coll card"
    );
    console.log("****result added to active coll");
    await browser.pause(3000);
    await (await searchPanel.$searchIcon).click();
    console.log("***Search Nova Scotia ****");
    await (await Collections.$Actions).waitForClickable({ timeout: 90000 });
    await Collections.$Actions.click();
    await Collections.$collectionMenu.click();
    await (await Collections.$removeFrom).waitForClickable({ timeout: 80000 });
    await Collections.$removeFrom.click();
    await (
      await Collections.$activeCollections
    ).waitForClickable({ timeout: 80000 });
    await Collections.$activeCollections.click();
    console.log("*****well log are remove from active coll");
    await browser.pause(2000);
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
      ["2"],
      "num of layers decrease are not reflecting on active coll card"
    );
    console.log("****result remove from active coll");
    await browser.pause(4000);
  });
  it("Verify Map and results panel updates when:Users  search/filter/select", async () => {
    console.log("***Users  search/filter/select test started");
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
    console.log("***unheck the check Box");
    await (
      await Collections.$collSearchBox
    ).waitForClickable({ timeout: 90000 });
    await (await Collections.$collSearchBox).click();
    console.log("***click on coll search box");
    await (await Collections.$collSearchBox).setValue("Toolbar");
    await (await Collections.$collSearchIcon).waitForClickable();
    await (await Collections.$collSearchIcon).click();

    console.log(
      await (await $("div.collection-container__header h6")).getText()
    );
    await expect(
      await $("div.collection-container__header h6")
    ).toHaveTextContaining("Toolbar");
    console.log("****verify Search/Filter/select for collection");
    await browser.pause(5000);
  });
  it("Verify deletion of Active Collections and any of the mode is enabled", async () => {
    console.log(
      "*****Verify deletion of Active Collections and any of the mode is enabled test started"
    );
    const activeProbeCard = await $("div.active-cards pioneer-collection-item");
    await (await Collections.$collClearSearch).waitForDisplayed();
    await (await Collections.$collClearSearch).waitForClickable();
    await (await Collections.$collClearSearch).click();
    console.log("*****clear coll search filter");
    await browser.pause(5000);
    await (await Collections.$activeCollCheckBox).waitForDisplayed();
    await (await Collections.$activeCollCheckBox).click();
    console.log("*****8click on active coll check box");
    await (await Collections.$focusMode).moveTo();
    await browser.pause(5000);
    await (
      await activeProbeCard.$("//button[@data-slb-id='card-menu']")
    ).waitForDisplayed();
    await (
      await activeProbeCard.$("//button[@data-slb-id='card-menu']")
    ).waitForClickable();
    await (
      await activeProbeCard.$("//button[@data-slb-id='card-menu']")
    ).click();
    console.log("*****click on 3 dots");
    await (await Collections.$deletButton).waitForDisplayed();
    await (await Collections.$deletButton).waitForClickable();
    await (await Collections.$deletButton).click();

    console.log("*****click on delete coll");
    await (await $("mat-dialog-container")).waitForDisplayed();

    await (await map.$confrimClear).click();

    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();

    await browser.pause(3000);
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await Collections.$collectionTray).click();
    console.log("****FOCUS FINISHED");
    await browser.pause(5000);
  });
});
