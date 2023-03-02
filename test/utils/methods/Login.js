const login = require("../pageobjects/login.po.js");
const totp = require("totp-generator");
const { TimeoutError } = require("puppeteer-core");
const PythonShell = require("python-shell").PythonShell;
class DelfiLogin {
  async delfiLogin(userName, password, tokenValue) {
    await login.$EmailInputBox.waitForDisplayed();
    await login.$EmailInputBox.setValue(userName);
    await login.$SubmitBox.click();
    browser.pause(1000);
    await login.$PasswordInputBox.waitForDisplayed();
    await login.$PasswordInputBox.setValue(password);
    await login.$VerifyPassword.click();

    try {
      await (
        await login.$IncorrectIDOrPass
      ).waitForDisplayed({ timeout: 8000 });
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
    } catch (error) {
      console.log("****userId pass  would be incorrect");
    }

    await browser.pause(5000);
    const token = totp(tokenValue);
    await login.$OTPBox.setValue(token);
    await login.$SignInBox.click();
    await login.$YesBox.waitForDisplayed();
    await login.$YesBox.click();
  }
}
module.exports = new DelfiLogin();
