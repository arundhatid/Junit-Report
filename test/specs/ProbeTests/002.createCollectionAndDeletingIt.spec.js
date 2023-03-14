const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi = require("../../utils/methods/Login");
const login = require("../../utils/pageobjects/login.po.js");
const PythonShell = require("python-shell").PythonShell;
var expectchai = require("chai").expect;

var expectchai = require("chai").expect;
describe("Create a collection and Deleting it:", async () => {
  before(async () => {
    const USER_ID = "DELFI-6976-SM-009@slb.com";
    const PASSWORD = "Machine^123456";
    const URL = "https://data.discovery.delfi.slb.com/";
    const SECRET_KEY = "fssknsltfkc2sxhy";
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
      await (
        await searchPanel.$searchBox
      ).waitForDisplayed({ timeout: 200000 });

      try {
        await (await Collections.$closeCollectionTray).isDisplayed();
        await (await Collections.$closeCollectionTray).click();
      } catch (e) {
        console.log("****if coll tray is up by default than close it 1st");
      }
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

    console.log("****checking  visibility of search box******");
    if ((await searchPanel.$searchBox).waitForClickable({ timeout: 200000 })) {
      expectchai(await searchPanel.$searchBox.isDisplayed()).to.be.true;
      // Prepare object to be passed into Python Shell
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_create_delete_collec",
          200,
          "User ia able to see search box ",
        ],
      };

      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("finished");
          console.log("****if block");
        }
      );
    } else {
      // Prepare object to be passed into Python Shell
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_create_delete_collec",
          500,
          "error search box is not displayed ",
        ],
      };

      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("failed");
        }
      );
      //Prometheus status
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: ["prometheus_probe_create_delete_collec_status", 500, "Failed"],
      };

      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("failed");
        }
      );
    }
  });

  it("Data Selection , create & delet the simple collection", async () => {
    await (await searchPanel.$searchIcon).waitForClickable({ timeout: 40000 });
    await (await searchPanel.$searchIcon).click();
    try {
      await (
        await searchPanel.$firstSearchResults
      ).waitForDisplayed({ timeout: 100000 });
      await (
        await searchPanel.$firstSearchResults
      ).waitForClickable({ timeout: 90000 });
    } catch (e) {
      await (
        await searchPanel.$firstSearchResults
      ).waitForDisplayed({ timeout: 100000 });
      await (
        await searchPanel.$firstSearchResults
      ).waitForClickable({ timeout: 90000 });
      console.log("*****retry the First Search Result");
    }
    await browser.pause(3000);
    await (await searchPanel.$firstSearchResults).click();
    console.log("******click on layer******");
    await (
      await $(
        "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
      )
    ).waitForClickable({ timeout: 80000 });
    await (
      await $(
        "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
      )
    ).click();
    await (await Collections.$Actions).waitForClickable({ timeout: 80000 });
    await Collections.$Actions.click();
    await Collections.$Add.click();
    await Collections.$Add.click();
    await (
      await Collections.$newCollection
    ).waitForClickable({ timeout: 80000 });
    await Collections.$newCollection.click();
    console.log("******Create Collection******");

    await (await $("(//form//input)[1]")).waitForDisplayed({ timeout: 80000 });
    await browser.pause(2000);
    await (await Collections.$collectionName).waitForDisplayed();
    await (
      await Collections.$collectionName
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$collectionName).setValue("Probe Testing Coll");
    console.log("*****enter collection name****");
    await (await Collections.$collectionDiscreption).waitForDisplayed();
    await (
      await Collections.$collectionDiscreption
    ).waitForClickable({ timeout: 80000 });
    await (
      await Collections.$collectionDiscreption
    ).setValue("Probe Testing Descriptions");
    console.log("*****enter description*****");
    await (await Collections.$checkBox).waitForDisplayed();
    await (await Collections.$checkBox).waitForClickable({ timeout: 80000 });
    await (await Collections.$checkBox).click();
    console.log("*******make it active collection*******");
    await (await Collections.$saveButton).waitForClickable({ timeout: 80000 });
    await (await Collections.$saveButton).click();
    console.log("****saved coll****");

    await (await $("//button[@class='button-pin-tray']")).waitForDisplayed();
    await (await $("//button[@class='button-pin-tray']")).click();

    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    const toasterSave1 = await (
      await $("//div[@class='dls-content']")
    ).getText();
    console.log(toasterSave1);
    await browser.pause(4000);
    await (await $("//div[@class='dls-content']")).waitForDisplayed();
    const toasterSave2 = await (
      await $("//div[@class='dls-content']")
    ).getText();
    console.log(toasterSave2);

    try {
      const activeProbeCard = await $(
        "div.active-cards pioneer-collection-item"
      );
      const cardTitle = await (
        await activeProbeCard.$("div.collection-container__title h6")
      ).getText();
      expectchai(cardTitle).to.have.string("Probe Testing Coll_01");
      console.log("*****Validate Collection*******");
    } catch (e) {
      console.log("*****waiting for collection save successfully");
      console.log(
        "*****get failed metrices as failed to create new coll because coll name already exit"
      );
    }

    await browser.pause(5000);
    if (toasterSave1 == "Records saved" || toasterSave2 == "Records saved") {
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_create_delete_collec",
          200,
          "collection created successfully",
        ],
      };

      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("finished");
        }
      );
    } else {
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_create_delete_collec",
          500,
          "error create collection failed ",
        ],
      };

      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("failed");
        }
      );
      //Prometheus status
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: ["prometheus_probe_create_delete_collec_status", 500, "Failed"],
      };

      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("failed");
        }
      );
    }

    const activeProbeCard = await $("div.active-cards pioneer-collection-item");
    await (
      await activeProbeCard.$('mat-icon[svgicon="more"]')
    ).waitForClickable({ timeout: 80000 });
    await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click();
    await (
      await $("//button[text()='Delete']")
    ).waitForClickable({ timeout: 80000 });

    await (await $("//button[text()='Delete']")).click();
    console.log("*****Delete the collection*******");

    await (
      await $("mat-dialog-container")
    ).waitForClickable({ timeout: 80000 });
    await (await $("//span[normalize-space()='Confirm']")).click();
    console.log("*******validate the delete colllection******");
    await (await $("//div[text()='Collection deleted.']")).waitForDisplayed();
    await browser.pause(2000);
    const toasterDelete = await (
      await $("//div[contains(text(),'Collection deleted.')]")
    ).getText();
    console.log(toasterDelete);

    await browser.pause(5000);
    if (activeProbeCard !== "Probe Testing") {
      expectchai(
        await (
          await $("div.active-cards pioneer-collection-item")
        ).isDisplayed()
      ).to.be.not.true;
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_create_delete_collec",
          200,
          "collection deleted successfully",
        ],
      };

      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("finished");
        }
      );
    } else {
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_create_delete_collec",
          500,
          "error delete collection failed ",
        ],
      };

      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("failed");
        }
      );
      //Prometheus status
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: ["prometheus_probe_create_delete_collec_status", 500, "Failed"],
      };

      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("failed");
        }
      );
    }

    await (await Collections.$closeCollectionTray).waitForDisplayed();
    await (
      await Collections.$closeCollectionTray
    ).waitForClickable({ timeout: 80000 });
    await (await Collections.$closeCollectionTray).click();
    var options = {
      mode: "text",
      pythonOptions: ["-u"],
      args: ["prometheus_probe_create_delete_collec_status", 200, "Success"],
    };

    // Pass into Python shell
    PythonShell.run(
      `${process.cwd()}/probe-deployment/files/metrics.py`,
      options,
      function (err) {
        if (err) throw err;
        console.log("finished");
      }
    );
    await browser.pause(3000);
  });
});
