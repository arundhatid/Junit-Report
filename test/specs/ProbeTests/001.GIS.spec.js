var expectchai = require("chai").expect;
const delfi = require("../../utils/methods/Login");
const SearchPanel = require("../../utils/pageobjects/searchPanel.po");
const map = require("../../utils/pageobjects/map.po");
const PythonShell = require("python-shell").PythonShell;

describe("Login for CDD app ", async () => {
  it("User should be able to login successfully and GIS Map should be loaded correctly", async () => {
    const mapWebelement = await map.$map;
    const USER_ID = "DELFI-6976-SM-009@slb.com";
    const PASSWORD = "AD@pi2023!";
    const URL = "https://data.discovery.delfi.slb.com/";
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
    var today = new Date();
    await browser.url(URL);
    console.log("****enter userid, pass, secret key***");
    await delfi.delfiLogin(USER_ID, PASSWORD, SECRET_KEY);
    var startTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("*****start time=" + startTime);
    var a = startTime.toString().split(":");
    var startSeconds = parseFloat(+a[0] * 60 * 60 + +a[1] * 60 + +a[2]);
    console.log("***start seconds = " + startSeconds);
    console.log("title =" + (await browser.getTitle()));
    let titleMatch = (await browser.getTitle()).localeCompare("Data Discovery");
    console.log(titleMatch + "*********");
    console.log("****checking the Authentication******");
    if (titleMatch == 0) {
      // Prepare object to be passed into Python Shell
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_auth_gis",
          200,
          "User login to Data Discovery app successfully",
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
      // Prepare object to be passed into Python Shell
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_auth_gis",
          500,
          "error User failed to login on  Data Discovery app ",
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
        args: ["prometheus_probe_auth_gis_status", 500, "Failed"],
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

    try {
      await (await login.$CloseBox).waitForDisplayed();
      await (await login.$CloseBox).click();
    } catch (e) {
      console.log("closed box is not appear for this test User account");
    }

    await mapWebelement.waitForDisplayed({ timeout: 100000 });
    console.log("*****checking prmotheus matrics for GIS map element****");
    if (await mapWebelement.isDisplayed()) {
      await (
        await SearchPanel.$searchIcon
      ).waitForDisplayed({ timeout: 90000 });
      await (
        await SearchPanel.$searchIcon
      ).waitForClickable({ timeout: 90000 });
      await (await SearchPanel.$searchIcon).click();
      await (
        await SearchPanel.$firstSearchResults
      ).waitForDisplayed({ timeout: 100000 });
      console.log("***search panel Results are diplayed or not***");
      expectchai(
        await $("(//div[@class='search-icon-label'])[1]").isDisplayed()
      ).to.be.true;

      var today = new Date();
      var finishTime =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      console.log("*****finish time=" + finishTime);
      var b = finishTime.toString().split(":");
      var finishSeconds = parseFloat(+b[0] * 60 * 60 + +b[1] * 60 + +b[2]);
      console.log("***finish seconds = " + finishSeconds);
      var totalSeconds = finishSeconds - startSeconds;
      console.log("*****total seconds =" + totalSeconds);
      expectchai(await mapWebelement.isDisplayed()).to.be.true;
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_auth_gis",
          200,
          "User is able to visible GIS map element successfully",
        ],
      };

      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("finished");
          console.log("***if block");
        }
      );

      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_probe_latency",
          200,
          "User login to GIS map successfully",
          totalSeconds,
        ],
      };
      // Pass into Python shell
      PythonShell.run(
        `${process.cwd()}/probe-deployment/files/metrics.py`,
        options,
        function (err) {
          if (err) throw err;
          console.log("***latency");
          console.log("finished");
        }
      );
    } else {
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_auth_gis",
          500,
          "error GIS map element is not shown, map is not loaded completly ",
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

      //prometheus status
      var options = {
        mode: "text",
        pythonOptions: ["-u"],
        args: ["prometheus_probe_auth_gis_status", 500, "Failed"],
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

    var options = {
      mode: "text",
      pythonOptions: ["-u"],
      args: ["prometheus_probe_auth_gis_status", 200, "Success"],
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
    await (await SearchPanel.$flexBox).waitForDisplayed({ timeout: 90000 });
  });
});
