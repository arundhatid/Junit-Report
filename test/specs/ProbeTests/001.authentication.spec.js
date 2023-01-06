const totp = require("totp-generator");
const path = require('path');
var expectchai = require('chai').expect;
const exp = require("constants");
const login= require('../../utils/pageobjects/login.po.js')
const delfi= require('../../utils/methods/Login')
const SearchPanel=require('../../utils/pageobjects/searchPanel.po')
const map=require('../../utils/pageobjects/map.po')

describe('Login for CDD app ', async ()=>{
    it('User should be able to login successfully',async ()=>{
      const USER_ID = 'DELFI-6976-SM-009@slb.com';
      const PASSWORD='Second^12345';
      const URL='https://data.discovery.delfi.slb.com/';
      const SECRET_KEY='fssknsltfkc2sxhy';
      console.log('value of id'+USER_ID+'pass'+PASSWORD+'url'+URL+'secret'+SECRET_KEY);
      await browser.url(URL);

       await delfi.delfiLogin(USER_ID,PASSWORD,SECRET_KEY);
       console.log('title'+await browser.getTitle())
       try {
        await (await login.$CloseBox).waitForDisplayed({timeout:100000})
        await (await login.$CloseBox).click()
       } catch (e) {
        
       }
       
       try{
        await (await SearchPanel.$searchBox).waitForDisplayed({timeout:100000})
       }
       catch(e){

       }
       
    
      expectchai(await SearchPanel.$searchBox.isDisplayed()).to.be.true
      

    })
   
})