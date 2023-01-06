const login = require("../pageobjects/login.po.js");
const totp = require("totp-generator");
class DelfiLogin {
  async delfiLogin(userName, password, tokenValue) {
    await login.$EmailInputBox.waitForDisplayed();
    await login.$EmailInputBox.setValue(userName);
    await login.$SubmitBox.click();
    browser.pause(1000);
    await login.$PasswordInputBox.waitForDisplayed();
    await login.$PasswordInputBox.setValue(password);
    await login.$VerifyPassword.click();
    await browser.pause(5000);
    const token = totp(tokenValue);
    await login.$OTPBox.setValue(token);
    await login.$SignInBox.click();
    await login.$YesBox.waitForDisplayed();
    await login.$YesBox.click();
  }
}
module.exports = new DelfiLogin();
