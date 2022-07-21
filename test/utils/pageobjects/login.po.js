const totp = require("totp-generator");
class Login{
    get $SigninAndSignUpButton(){
return $('button[data-slb-id="login"]');
    }
    get $EmailInputBox(){
        return $('#emailInput');
    }
    get $SubmitBox(){
        return $("#submitbutton");
    }
    get $PasswordInputBox(){
        return $('#passwordInput');
    }
    get $VerifyPassword(){
        return $("#submitButton");
    }
    get $OTPBox(){
        return $('#verificationCodeInput')
    }
    get $SignInBox(){
        return  $("#signInButton");
    }
    get $YesBox(){
        return $('[value="Yes"]');
    }
 

}
module.exports=new Login()