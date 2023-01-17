
var expectchai = require("chai").expect;
const login = require("../../utils/pageobjects/login.po.js");
const delfi = require("../../utils/methods/Login");
const SearchPanel = require("../../utils/pageobjects/searchPanel.po");
const map = require("../../utils/pageobjects/map.po");
const PythonShell = require('python-shell').PythonShell

describe("Login for CDD app ", async () => {
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
    try {
      await (await login.$CloseBox).isDisplayed();
      await (await login.$CloseBox).waitForDisplayed();
      await (await login.$CloseBox).click();
    } catch (e) {
      console.log(
        "****closed box is not appear for this test User account****"
      );
    }
    await (await SearchPanel.$searchBox).waitForDisplayed({ timeout: 90000 });
    expectchai(await SearchPanel.$searchBox.isDisplayed()).to.be.true;
    await (await map.$map).waitForDisplayed({ timeout: 90000 });
    expectchai(await map.$map.isDisplayed()).to.be.true;

    // Prepare object to be passed into Python Shell
    var options = {
      mode: 'text',
      pythonOptions: ['-u'],
      args: ['prometheus_metrics', 200, "good"]
    };

    // Pass into Python shell
    PythonShell.run(`${process.cwd()}/probe-deployment/files/metrics.py`, options, function (err) {
      if (err) throw err;
      console.log('finished');
    });

    var today = new Date();
    var finishTime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("*****finish time=" + finishTime);
    var b = finishTime.toString().split(":");
    var finishSeconds = Math.abs(+b[0] * 60 * 60 + +b[1] * 60 + +b[2]);
    var finishMinitus = finishSeconds / 60;
    console.log("****finish minitus = " + finishMinitus);
    console.log("***finish seconds = " + finishSeconds);
    var totalMinitus = Math.abs(finishMinitus - startMinitus);
    var totalSeconds = Math.abs(finishSeconds - startSeconds);
    console.log("****total minitus =" + totalMinitus);
    console.log("*****total seconds =" + totalSeconds);
    console.log(
      "*****Total Time for page load - " + totalMinitus + ":" + totalSeconds
    );
  });
});