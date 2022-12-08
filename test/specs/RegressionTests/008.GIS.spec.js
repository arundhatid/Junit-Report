const searchData = require("../../testData/searchPanel.json");
const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi= require('../../utils/methods/Login')
const login= require('../../utils/pageobjects/login.po.js')


var expectchai = require("chai").expect;
const path = require('path')
const fs = require('fs');
const { createJSHandle } = require("puppeteer-core");
var multiResultsflag=false;
var singleResultflag=false;
describe("Create a collection:", async () => {

before(async () => {

  const USER_ID = 'DELFI-6976-SM-008@slb.com';
  const PASSWORD='First^12345';
  const URL='https://evq.discovery.cloud.slb-ds.com/';
  const SECRET_KEY='6gqld7mbpmhjpzgv';
  console.log('value of id'+USER_ID+'pass'+PASSWORD+'url'+URL+'secret'+SECRET_KEY);
  //await browser.maximizeWindow()
  await browser.url(URL);

   //await browser.maximizeWindow()
   await delfi.delfiLogin(USER_ID,PASSWORD,SECRET_KEY);
   console.log('title'+await browser.getTitle())
   await (await login.$CloseBox).waitForDisplayed({timeout:100000})
   await (await login.$CloseBox).click()
   try{
    await (await SearchPanel.$searchBox).waitForDisplayed({timeout:100000})
   }
   catch(e){

   }
   

});


  it('Verify Zoom In using mouse wheel, (+) icon',async ()=>{

    console.log('Verify Zoom In using mouse wheel, (+) icon');

})
});