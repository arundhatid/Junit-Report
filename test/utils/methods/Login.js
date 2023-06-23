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
    await login.$EnterPassword.waitForDisplayed();
    await login.$EnterPassword.setValue(password);
    await login.$SingIn.click();

    try {
      await (
        await login.$IncorrectIDOrPass
      ).waitForDisplayed({ timeout: 5000 });
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

    await browser.pause(3000);
    const token = totp(tokenValue);
    try {
    await login.$OTPBox.waitForDisplayed({ timeout: 3000 })
    await login.$OTPBox.setValue(token);
    await login.$SignInBox.click();
    } catch (e) {
      console.log('***OTP')
    }
    
    await login.$YesBox.waitForDisplayed();
    await login.$YesBox.click();
  }
}
module.exports = new DelfiLogin();
