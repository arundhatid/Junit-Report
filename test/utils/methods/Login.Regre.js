const login = require("../pageobjects/login.po.js");
const totp = require("totp-generator");
class DelfiLogin {
  async delfiLogin(userName, password, tokenValue, URL) {
    console.log(
      "username" +
        userName +
        "password" +
        password +
        "secret" +
        SECRET_KEY +
        "URL" +
         URL 
        
    );
    try{
      console.log('Launching application')
      await browser.url(URL);
      await browser.pause(10000);
      console.log('browser url which is launched is: ' +  await browser.getUrl())
    }
    catch (e)
    {
      console.log('Failed to launch application')
    }
    
    try
    {
      if (await login.$EmailInputBox.isDisplayed())
      {
        await login.$EmailInputBox.waitForDisplayed();
        await login.$EmailInputBox.setValue(userName);
        await login.$SubmitBox.click();
      }
      else
      {
          console.log("EmailInputBox is not displayed")
      }
      
    }
    catch (e) {
      console.log("Failed to enter Email Id. Please check username");
    }
    
    browser.pause(1000);

    try {
      if (await login.$EnterPassword.isDisplayed())
      {
        await (
          await login.$EnterPassword
        ).setValue(Buffer.from(password, "base64").toString());
        
      }
      else
      {
        console.log("Password is not displayed.");  
      }
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
      const token = totp(Buffer.from(tokenValue, "base64").toString());
      console.log('Secret key is: ' + tokenValue)
      console.log('Secret key unencrypted is: ' + Buffer.from(tokenValue, "base64").toString())
      console.log("TOTP code is: " + token);
      if (await login.$OTPBox.isDisplayed())
      {
        await login.$OTPBox.waitForDisplayed({ timeout: 3000 });
        await login.$OTPBox.setValue(token);
        try{
          await login.$SignInBox.click();
        }
        catch(e)
        {
          console.log('Failed to click on SignIn button after entering otp')
        }
      }
      else
      {
        console.log('OTP Window is not displayed')
      }
    } catch (e) {
      console.log("Failed to enter OTP. Please check password");
    }

    try
    {
      if (await login.$YesBox.isDisplayed())
      {
        await login.$YesBox.waitForDisplayed();
      
        await login.$YesBox.click();
      }
      else{
        console.log('YesNo button is not displayed')
      }
      await browser.pause(10000);
      console.log('Browser title while authenticating for first time is: ' + await browser.getTitle())
    }
    catch(e)
    {}

  }
}
module.exports = new DelfiLogin();
