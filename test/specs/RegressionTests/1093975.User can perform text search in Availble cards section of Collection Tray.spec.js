const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const map = require("../../utils/pageobjects/map.po");
const delfi = require("../../utils/methods/Login.Regre");
const zoomToExtend = require("../../utils/methods/zoomToExtend");
const login = require("../../utils/pageobjects/login.po.js");
const Collections = require("../../utils/pageobjects/collections.po");

var expectchai = require("chai").expect;

describe(" Perform text search in Availble cards section of Collection Tray :", async () => {
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
    await browser.pause(5000);
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await browser.pause(3000);
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
    await browser.pause(2000);
  });
  it("Verify Text search in Collection Tray when none of the filter is selected", async () => {
    const layer = "cheal";
    const mapWebelement = await map.$map;
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("Cheal");
    await (await searchPanel.$searchIcon).click();

    console.log("***Search cheal well log****");
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (await searchPanel.$firstSearchResults).moveTo();
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
    await (await Collections.$collectionName).setValue("coll_Avaliable cards" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("coll_Avaliable cards Testing Descriptions");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    await (await Collections.$collectionTray).waitForDisplayed();
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await (await $("//div[text()='Results saved.']")).waitForDisplayed();
    await browser.pause(3000);
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();

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
    await (await Collections.$collectionName).setValue("Coll For Text_Search" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll Coll For Text_Search Testing Descriptions");
    await (await Collections.$checkBox).waitForDisplayed();
    await (await Collections.$checkBox).waitForClickable({ timeout: 80000 });
    await (await Collections.$checkBox).click();
    console.log("***save coll*****");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    await (await Collections.$collectionTray).waitForDisplayed();
    await (await Collections.$collectionTray).waitForClickable();
    await (await Collections.$collectionTray).click();
    await (await $("//div[text()='Results saved.']")).waitForDisplayed();
    //await (await Collections.$eyeUnhideIcon).click();
    await (
      await Collections.$collSearchBox
    ).waitForClickable({ timeout: 90000 });
    await (await Collections.$collSearchBox).click();
    console.log("***click on coll search box");
    await (await Collections.$collSearchBox).setValue("Available cards");
    await (await Collections.$collSearchIcon).waitForClickable();
    await (await Collections.$collSearchIcon).click();

    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll_Avaliable Cards"
    );
    console.log("*****entered text is appear in Available Cards");
    await browser.pause(3000);
    console.log(
      await (await $("div.collection-container__header h6")).getText()
    );

    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Text_Search"
    );
    console.log("****verify Active Cards section is remain as it is");

    await browser.pause(3000);
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await browser.pause(5000);
  });

  it("Verify Text search in Collection Tray when Collections filter is selected", async () => {
    console.log(
      "**** Verify Text search in Collection Tray when Collections filter is selected started"
    );
    await (await Collections.$collectionTray).click();
    await (await Collections.$collectionChip).waitForClickable();
    await (await Collections.$projectChip).click();
    await (
      await Collections.$collSearchBox
    ).waitForClickable({ timeout: 90000 });
    await (await Collections.$collSearchBox).click();
    console.log("***click on coll search box");
    await (await Collections.$collSearchBox).setValue("Available cards");
    await (await Collections.$collSearchIcon).waitForClickable();
    await (await Collections.$collSearchIcon).click();

    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll_Avaliable Cards"
    );
    console.log("*****entered text is appear in Available Cards");
    await browser.pause(4000);
    console.log(
      await (await $("div.collection-container__header h6")).getText()
    );

    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Text_Search"
    );
    console.log("****verify Active Cards section is remain as it is");
    await browser.pause(2000);
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await browser.pause(5000);
  });

  it("Verify Text search in Collection Tray when Filter available Collections/Projects filter is selected", async () => {
    console.log(
      "******Verify Text search in Collection Tray when Filter available Collections/Projects filter is selected started"
    );
    await (await searchPanel.$crossResult).waitForClickable();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await browser.pause(3000);
    await (
      await searchPanel.$firstSearchResults
    ).waitForClickable({ timeout: 90000 });
    await (await searchPanel.$firstSearchResults).click();
    console.log("******click on layer******");
    await browser.pause(3000);
    await (
      await searchPanel.$filterAvailableCollectionsProjects
    ).waitForClickable();
    await (await searchPanel.$filterAvailableCollectionsProjects).click();
    console.log("****click on filter avl coll/ project");
    await browser.pause(3000);

    expectchai(await Collections.$customChip.getText()).to.have.string(
      "Cheal-A6 ST1"
    );
    await browser.pause(3000);

    const collectionChip = await (
      await Collections.$collectionChip
    ).getAttribute("class");
    console.log(collectionChip);
    expect(collectionChip).toHaveAttribute(
      [
        "mat-mdc-chip mat-mdc-tooltip-trigger mat-primary mdc-evolution-chip mat-mdc-standard-chip filter-selected",
      ],
      "collection chip is not highlighted "
    );
    await (
      await Collections.$collSearchBox
    ).waitForClickable({ timeout: 90000 });
    await (await Collections.$collSearchBox).click();
    console.log("***click on coll search box");
    await (await Collections.$collSearchBox).setValue("Available cards");
    await (await Collections.$collSearchIcon).waitForClickable();
    await (await Collections.$collSearchIcon).click();

    console.log(
      await (await $("div.collection-container__header h6")).getText()
    );

    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Text_Search"
    );
    console.log("****verify Active Cards section is remain as it is");
    await browser.pause(3000);

    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll_Avaliable Cards"
    );
    console.log("*****entered text is appear in Available Cards");
    await browser.pause(2000);
  });

  it("Verify 'No Collections and Projects available' message", async () => {
    console.log(
      "Verify 'No Collections and Projects available' message test started"
    );
    await (await Collections.$collSearchBox).setValue("toolbar");
    await (await Collections.$collSearchIcon).waitForClickable();
    await (await Collections.$collSearchIcon).click();
    await (await Collections.$noCollAvl).waitForDisplayed();
    expectchai(await Collections.$noCollAvl.getText()).to.have.string(
      "No Collections or Projects Available"
    );
    console.log("No Collections or Projects Available is display");
    await browser.pause(4000);
    console.log(
      await (await $("div.collection-container__header h6")).getText()
    );

    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Text_Search"
    );
    console.log("****verify Active Cards section is remain as it is");
    await (await Collections.$collSearchBox).click();
    await (await $("(//mat-icon[@svgicon='more'])[1]")).waitForDisplayed();
    await (await $("(//mat-icon[@svgicon='more'])[1]")).waitForClickable();
    await (await $("(//mat-icon[@svgicon='more'])[1]")).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();
    console.log("***1 coll delete");
    await browser.pause(3000);
    await (await $("(//mat-icon[@svgicon='more'])[1]")).waitForDisplayed();
    await (await $("(//mat-icon[@svgicon='more'])[1]")).waitForClickable();
    await (await $("(//mat-icon[@svgicon='more'])[1]")).click();
    await (await Collections.$deletButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$deletButton).click();
    await (await $("mat-dialog-container")).waitForDisplayed();
    await (await map.$confrimClear).click();
    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();
    await (await Collections.$closeCustomChip).waitForClickable();
    await (await Collections.$closeCustomChip).click();
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await zoomToExtend.removeOldAction();
    await browser.pause(3000);
    console.log("******AVL CARD FINISHED");
    await browser.pause(3000);
  });
});
