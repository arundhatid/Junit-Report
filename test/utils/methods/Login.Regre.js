const login = require("../pageobjects/login.po.js");
const totp = require("totp-generator");
class DelfiLogin {
  async delfiLogin(userName, password, tokenValue) {
    await login.$EmailInputBox.waitForDisplayed();
    await login.$EmailInputBox.setValue(userName);
    await login.$SubmitBox.click();
    browser.pause(1000);

    try {
      await (
        await login.$EnterPassword
      ).setValue(Buffer.from(password, "base64").toString());
      await login.$SingIn.click();
    } catch (e) {
      await (
        await login.$EnterPassword
      ).setValue(Buffer.from(password, "base64").toString());
      await login.$SingIn.click();
    }

    await browser.pause(3000);
    const token = totp(tokenValue);
    try {
      await login.$OTPBox.waitForDisplayed({ timeout: 3000 });
      await login.$OTPBox.setValue(token);
      await login.$SignInBox.click();
    } catch (e) {
      console.log("***OTP");
    }

    await login.$YesBox.waitForDisplayed();
    await login.$YesBox.click();
  }
}
module.exports = new DelfiLogin();
