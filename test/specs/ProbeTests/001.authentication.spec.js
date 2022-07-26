const totp = require("totp-generator");
const path = require('path');
var expectchai = require('chai').expect;
const exp = require("constants");
const login= require('../../utils/pageobjects/login.po.js')
const delfi= require('../../utils/methods/Login')
const SearchPanel=require('../../utils/pageobjects/searchPanel.po')
const map=require('../../utils/pageobjects/map.po')

describe('Login for CDD app', async ()=>{
    it('User should be able to login successfully',async ()=>{
      const USER_ID = '';
      const PASSWORD='';
      const URL='';
      const SECRET_KEY='';
      console.log('value of id'+USER_ID+'pass'+PASSWORD+'url'+URL+'secret'+SECRET_KEY);
      await browser.url(URL);
       await browser.maximizeWindow()
       await delfi.delfiLogin(USER_ID,PASSWORD,SECRET_KEY);
       console.log('title'+await browser.getTitle())
       await browser.pause(10000)
       //Closes green information box  
      //expectchai(await map.$infoBox.isDisplayed()).to.be.true 
      //expectchai(await map.$infoIcon.isDisplayed()).to.be.true  
      //expectchai(await map.$closeIcon.isDisplayed()).to.be.true  
      //await  map.$closeIcon.click(); 
      expectchai(await SearchPanel.$searchBox.isDisplayed()).to.be.true

    })
   
})