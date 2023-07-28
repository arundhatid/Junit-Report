const login = require("../pageobjects/login.po.js");
const totp = require("totp-generator");
class DelfiLogin {
  async delfiLogin(userName, password, tokenValue) {
    try {
      await login.$EmailInputBox.waitForDisplayed();
      await login.$EmailInputBox.setValue(userName);
      await login.$SubmitBox.click();
    } catch (e) {
      console.log("Failed to enter Email Id. Please check username");
    }
    
    browser.pause(1000);

    try {
      await (
        await login.$EnterPassword
      ).setValue(Buffer.from(password, "base64").toString());
      await login.$SingIn.click();
    } catch (e) {
      console.log("Failed to enter Password. Trying again.");
      await (
        await login.$EnterPassword
      ).setValue(Buffer.from(password, "base64").toString());
      
    }
    try{
      await login.$SingIn.click();
      await browser.pause(3000);
    }
    catch(e)
    {
      console.log("Failed to click on SignIn button.");
    }

    
    try {
      console.log("Generating TOTP code");
      const token = totp(tokenValue);
      console.log("TOTP code is: " + token);
      await login.$OTPBox.waitForDisplayed({ timeout: 3000 });
      await login.$OTPBox.setValue(token);
      await login.$SignInBox.click();
    } catch (e) {
      console.log("Failed to enter OTP. Please check password");
    }

    await login.$YesBox.waitForDisplayed();
    await login.$YesBox.click();
  }
}
module.exports = new DelfiLogin();
