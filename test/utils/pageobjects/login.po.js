const totp = require("totp-generator");
class Login {
    get $SigninAndSignUpButton() {
        return $('button[data-slb-id="login"]');
    }
    get $EmailInputBox() {
        return $("//input[@id='emailInput']");
    }
    get $SubmitBox() {
        return $("//input[@id='submitbutton']");
    }
    get $EnterPassword() {
        return $("//input[@type='password']");
    }
    get $SingIn() {
        return $("//input[@type='submit']");
    }

    get $OTPBox() {
        return $('#verificationCodeInput')
    }
    get $SignInBox() {
        return $("#signInButton");
    }
    get $YesBox() {
        return $('[value="Yes"]');
    }
    get $CloseBox() {
        return $('delfi-gui-data-partition section [data-mat-icon-name="close"] svg')

    }
    get $IncorrectIDOrPass() {
        return $("//span[@id='errorText']");
    }


  get $OTPBox() {
    return $("#verificationCodeInput");
  }
  get $SignInBox() {
    return $("#signInButton");
  }
  get $YesBox() {
    return $('[value="Yes"]');
  }
  get $CloseBox() {
    return $(
      'delfi-gui-data-partition section [data-mat-icon-name="close"] svg'
    );
  }
  get $IncorrectIDOrPass() {
    return $("//div[@id='passwordError']");
  }
}
module.exports = new Login();
