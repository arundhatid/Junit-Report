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
    get $CloseBox(){
        return $('delfi-gui-data-partition section [data-mat-icon-name="close"] svg')

    }
 

}
module.exports=new Login()