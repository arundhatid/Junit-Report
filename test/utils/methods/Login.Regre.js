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
        tokenValue +
        "URL" +
         URL 
        
    );
    try{
      console.log('Launching application')
      await browser.url(URL);
      await browser.pause(10000);
      
    }
    catch (e)
    {
      console.log('Failed to launch application')
    }
    
    try
    {
      await login.$EmailInputBox.waitForDisplayed({ timeout: 5000 });
      if (await login.$EmailInputBox.isDisplayed())
      {
        console.log('Entering Email')
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
    
    
    try {
      //browser.pause(5000);
      await login.$EnterPassword.waitForDisplayed({ timeout: 5000 });
      if (await login.$EnterPassword.isDisplayed())
      {
        console.log('Entering Password')
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
      await login.$SingIn.waitForDisplayed({ timeout: 5000 });
      if (await login.$SingIn.isDisplayed())
      {
        console.log('Clicking SignIn Button')
        await login.$SingIn.click();
        console.log('Pause 3000')
        await browser.pause(3000);
      }
    }
    catch(e)
    {
      console.log("Failed to click on SignIn button.");
    }

    
    try {
      console.log('Entering OTP')
      if (await login.$OTPBox.isDisplayed())
      {
        console.log("Generating TOTP code");
        const token = totp(Buffer.from(tokenValue, "base64").toString());        
        
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
      
      console.log("Clicking Yes Button");
      if (await login.$YesBox.isDisplayed())      
      {     
        await login.$YesBox.click();
      }
      else{
        console.log('YesNo button is not displayed')
      }
      console.log('pause again')
      await browser.pause(10000);
      console.log('Browser title while authenticating for first time is: ' + await browser.getTitle())
    }
    catch(e)
    {}

  }
}
module.exports = new DelfiLogin();
