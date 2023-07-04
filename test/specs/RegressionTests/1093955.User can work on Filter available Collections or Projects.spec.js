const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const map = require("../../utils/pageobjects/map.po");
const delfi = require("../../utils/methods/Login.Regre");
const zoomToExtend = require("../../utils/methods/zoomToExtend");
const login = require("../../utils/pageobjects/login.po.js");
const SummaryCard = require("../../utils/pageobjects/summaryCard.po");
const Canvas = require("../../utils/pageobjects/canvas.po.js");
const Collections = require("../../utils/pageobjects/collections.po");

var expectchai = require("chai").expect;
const { log } = require("console");
describe("Verify User can work on Filter available Collections/Projects :", async () => {
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
    }
    try {
      await (await searchPanel.$crossResult).isDisplayed();
      await (await searchPanel.$crossResult).click();
      await (await map.$clear).waitForClickable();
      await (await map.$clear).click();
      await (await map.$confrimClear).waitForDisplayed();
      await (await map.$confrimClear).click();
      await browser.pause(8000);
      await (await map.$zoomToWorldView).waitForClickable();
      await map.$zoomToWorldView.click();
      await browser.pause(2000);
    } catch (e) {
      await (await map.$clear).waitForClickable();
      await (await map.$clear).click();
      await (await map.$confrimClear).waitForDisplayed();
      await (await map.$confrimClear).click();
      await browser.pause(8000);
      await (await map.$zoomToWorldView).waitForClickable();
      await map.$zoomToWorldView.click();
      await browser.pause(2000);
    }
  });
  it("Verify Filter available Collections/Projects icon on Summary card", async () => {
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
    await (await searchPanel.$firstSearchResults).moveTo();
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
    ).setValue("coll_Avaliable cards" + change);
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
    await (
      await Collections.$collectionName
    ).setValue("Coll For Text_Search" + change);
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

    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    console.log("***save coll*****");
    await (await Collections.$collectionTray).waitForDisplayed();
    await (
      await Collections.$collectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionTray).click();
    await (await $("//div[text()='Results saved.']")).waitForDisplayed();
    await browser.pause(3000);

    await (await Collections.$collectionTray).click();
    // await (await Collections.$eyeUnhideIcon).click();
    await (await searchPanel.$searchBox).waitForDisplayed();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue("nz 2d line");
    await (await searchPanel.$searchIcon).click();
    console.log("***Search result without well log****");
    await (await searchPanel.$firstSearchResults).waitForDisplayed();
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
    await (
      await Collections.$collectionName
    ).setValue("Coll with no well present" + change);
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Coll with no well present Testing Descriptions");

    console.log("***save coll*****");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    await (await Collections.$collectionTray).waitForClickable();
    await (await Collections.$collectionTray).click();

    await (await $("//div[text()='Results saved.']")).waitForDisplayed();
    console.log("**** filter collection icon is display");
    await (await Collections.$collectionTray).click();
    await browser.pause(2000);
  });

  it("Click on Filter available Collections/Projects icon", async () => {
    console.log(
      "**** Click on Filter available Collections/Projects icon started"
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
    await (await Collections.$collectionTray).click();
    expectchai(
      await (
        await searchPanel.$filterAvailableCollectionsProjects
      ).isDisplayed()
    ).to.be.true;
    try {
      await (
        await searchPanel.$filterAvailableCollectionsProjects
      ).waitForClickable();
      await (await searchPanel.$filterAvailableCollectionsProjects).click();
      await (await searchPanel.$filterAvailableCollectionsProjects).click();
    } catch (e) {
      await (
        await searchPanel.$filterAvailableCollectionsProjects
      ).waitForClickable();
      await (await searchPanel.$filterAvailableCollectionsProjects).click();
      await (await searchPanel.$filterAvailableCollectionsProjects).click();
    }

    console.log("****click on filter avl coll/ project");
    await browser.pause(3000);
    expectchai(await Collections.$customChip.getText()).to.have.string(
      "Cheal-A6 ST1"
    );
    expectchai(await (await Collections.$closeCustomChip).isDisplayed()).to.be
      .true;
    console.log("****filtetr avl coll/ project with cross visible in coll try");
    await browser.pause(3000);
    const collectionChip = await (
      await Collections.$collectionChip
    ).getAttribute("aria-disabled");
    console.log(collectionChip);
    expect(collectionChip).toHaveAttribute(
      ["false"],
      "collection chip is not highlighted "
    );
    console.log(
      await (
        await $(
          "(//div[@class='active-cards ng-star-inserted']//div[@class='collection-container__header'])[1]"
        )
      ).getText()
    );

    expectchai(await Collections.$activeCardColl.getText()).to.have.string(
      "Coll For Text_Search"
    );
    console.log("****verify Active Cards section is remain as it is");
    await browser.pause(3000);
    console.log(
      "**** for verify Active card when un selected , if associated with selected data item filter, then it should appear in Available Cards section"
    );
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
    console.log("****Inactive the TEXT_serch coll");
    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll For Text_Search"
    );

    await (await Collections.$activeCollCheckBox).waitForClickable();
    await (await Collections.$activeCollCheckBox).click();
    console.log("**active the Search_text coll");
  });
  it("Verify clicking on cross (x) of Filtered available collections/projects chip", async () => {
    console.log(
      "****Verify clicking on cross (x) of Filtered available collections/projects chip started"
    );
    await (await Collections.$closeCustomChip).waitForClickable();
    await (await Collections.$closeCustomChip).click();
    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll With No Well Present"
    );
    await browser.pause(3000);
  });
  it("Verify behavior of Active cards section", async () => {
    console.log("*****Verify behavior of Active cards section started");
    console.log("****Verify Inactivating of Active Collections ");
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
    await (
      await $("(//mat-icon[@data-mat-icon-name='arrow-left-5'])[3]")
    ).waitForClickable();
    await (
      await $("(//mat-icon[@data-mat-icon-name='arrow-left-5'])[3]")
    ).click();
    console.log("*****active no well coll");
    await (await Collections.$collectionTray).click();
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
    await browser.pause(5000);
    await (await searchPanel.$filterAvailableCollectionsProjects).click();
    await (await searchPanel.$filterAvailableCollectionsProjects).click();
    await browser.pause(5000);
    await (
      await $(
        "(//div[@class='container is-activated']//mat-icon[@data-mat-icon-name='arrow-right-5'])[1]"
      )
    ).click();
    console.log("****inactive no well coll");
    expectchai(await Collections.$avaliableColl.getText()).to.have.string(
      "Coll For Text_Search"
    );

    console.log("**** no well coll is not present");
    await browser.pause(3000);
    await (await Collections.$closeCustomChip).waitForClickable();
    await (await Collections.$closeCustomChip).click();
    await browser.pause(2000);
    await (await Collections.$collectionTray).waitForClickable();
    await (await Collections.$collectionTray).click();
  });
  it("Verify Open Viewer when Filter Available collections/projects selected", async () => {
    await (await searchPanel.$crossResult).waitForClickable();
    await (await searchPanel.$crossResult).click();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchIcon).click();
    await (
      await searchPanel.$firstSearchResults
    ).waitForDisplayed({ timeout: 80000 });
    await (
      await searchPanel.$firstSearchResults
    ).waitForClickable({ timeout: 90000 });
    await (await searchPanel.$firstSearchResults).click();
    try {
      await (await searchPanel.$backToResults).click();
      await (await searchPanel.$firstSearchResults).click();
    } catch (e) {
      console.log("****click on back if back to group result is display");
    }
    await (await SummaryCard.$wellboreViewerBtn).waitForClickable();
    await (await SummaryCard.$wellboreViewerBtn).click();
    await browser.pause(2000);

    await (
      await Canvas.$willboreViewerCanvas
    ).waitForDisplayed({ timeout: 200000 });
    console.log("****canvas open succefully");

    await (await searchPanel.$sidePanel).waitForClickable();
    await (await searchPanel.$sidePanel).click();
    await (
      await searchPanel.$filterAvailableCollectionsProjects
    ).waitForClickable();
    await (await searchPanel.$filterAvailableCollectionsProjects).click();
    expectchai(await (await Canvas.$willboreViewerCanvas).isDisplayed()).to.be
      .true;
    console.log("****viewer should not close");

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
    console.log("***1 coll delete");
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
    await browser.pause(3000);
    await (await Collections.$closeCustomChip).waitForClickable();
    await (await Collections.$closeCustomChip).click();
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
    await (await Collections.$collectionTray).click();
    await browser.pause(3000);
    console.log("*****FILTER AVL CARD FINISHED");
  });
});
