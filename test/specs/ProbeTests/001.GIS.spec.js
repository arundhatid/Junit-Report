var expectchai = require("chai").expect;
const delfi = require("../../utils/methods/Login");
const SearchPanel = require("../../utils/pageobjects/searchPanel.po");
const map = require("../../utils/pageobjects/map.po");
const PythonShell = require("python-shell").PythonShell;
//****for image comaprison******
//const ImageComparisonHelper = require("../../helpers/image-comparator");
//const ImageComparisonHelper = require("../../helpers/image-helpers");

describe("Login for CDD app ", async () => {
  //const folderName ='Basic-GIS';

  it("User should be able to login successfully and GIS Map should be loaded correctly", async () => {
    const mapWebelement = await map.$map;
    const USER_ID = "DELFI-6976-SM-009@slb.com";
    const PASSWORD = "Second^12345";
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
    var startSeconds = Math.abs(+a[0] * 60 * 60 + +a[1] * 60 + +a[2]);
    var startMinitus = startSeconds / 60;
    console.log("****minitus = " + startMinitus);
    console.log("***seconds = " + startSeconds);

    console.log("title =" + (await browser.getTitle()));
    let titleMatch = (await browser.getTitle()).localeCompare("Data Discovery");
    console.log(titleMatch + "*********");
    console.log("****checking the Authentication******");
    if (titleMatch == 0) {
      // Prepare object to be passed into Python Shell
      var options = {
        mode: "text",
        pythonPath: "python",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_auth_gis",
          200,
          "User login to GIS map successfully",
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
        pythonPath: "python",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_auth_gis",
          500,
          "error User failed to login on GIS map ",
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
        pythonPath: "python",
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

    await (await SearchPanel.$searchBox).waitForDisplayed({ timeout: 90000 });
    console.log("*****checking prmotheus matrics for search box****");
    if ((await SearchPanel.$searchBox).isDisplayed()) {
      expectchai(await SearchPanel.$searchBox.isDisplayed()).to.be.true;
      var options = {
        mode: "text",
        pythonPath: "python",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_auth_gis",
          200,
          "User is able to see Search Box successfully",
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
        pythonPath: "python",
        pythonOptions: ["-u"],
        args: [
          "prometheus_metrics_auth_gis",
          500,
          "error Search box is not shown, map is not loaded completly ",
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
        pythonPath: "python",
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

    await (await mapWebelement).waitForDisplayed({ timeout: 90000 });
    expectchai(await mapWebelement.isDisplayed()).to.be.true;
    var options = {
      mode: "text",
      pythonPath: "python",
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
    //******below work would be for of latency*****/

    //const match = await ImageComparisonHelper.compareImages(folderName,'UnitySession')
    //expect(match).toBe(true);

    //var today = new Date();
    //var finishTime =
    //  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //console.log("*****finish time=" + finishTime);
    // var b = finishTime.toString().split(":");
    // var finishSeconds = Math.abs(+b[0] * 60 * 60 + +b[1] * 60 + +b[2]);
    // var finishMinitus = finishSeconds / 60;
    // console.log("****finish minitus = " + finishMinitus);
    //console.log("***finish seconds = " + finishSeconds);
    //var totalMinitus = Math.abs(finishMinitus - startMinitus);
    //var totalSeconds = Math.abs(finishSeconds - startSeconds);
    //console.log("****total minitus =" + totalMinitus);
    //console.log("*****total seconds =" + totalSeconds);
    //console.log(
    //  "*****Total Time for page load - " + totalMinitus + ":" + totalSeconds
    // );
  });
});
