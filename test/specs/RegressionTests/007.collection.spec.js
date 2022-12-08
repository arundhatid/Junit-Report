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

it('Verify creation and display of Active Well collection',async ()=>{
  try {
    await (await searchPanel.$searchBox).waitForDisplayed({timeout:100000})
  await (await layers.$showLayers).waitForClickable();
  await (await layers.$showLayers).click();
  await (await $("//div[@class='layers-panel-header']")).click()
  } catch (e) {
    
  }
  
  await (await layers.$globalHideLayersBtn).waitForClickable()
  await (await layers.$globalHideLayersBtn).click();
  await browser.pause(10000);
  await (await layers.$WellLayerHideBtn).waitForClickable()
  await (await layers.$WellLayerHideBtn).click();
  await (await layers.$WellLayerDropdown).click();
  await browser.pause(10000);
  await (await layers.$WellFilterSearch).waitForClickable();
  await (await layers.$WellFilterSearch).click();
  await browser.pause(10000);
 // await (await $("(//div[contains(text(),'(1)')])[1]")).waitForClickable()
  //await (await $("(//div[contains(text(),'(1)')])[1]")).click()
 // await (await $("(//div[contains(text(),'(1)')])[2]")).waitForClickable()
 // await (await $("(//div[contains(text(),'(1)')])[2]")).click()
 // await (await $("(//div[contains(text(),'(1)')])[3]")).waitForClickable()
  //await (await $("(//div[contains(text(),'(1)')])[3]")).click()
  //await (await $("(//div[contains(text(),'(1)')])[4]")).waitForClickable()
  //await (await $("(//div[contains(text(),'(1)')])[4]")).click()
  //await (await $("(//div[contains(text(),'(1)')])[5]")).waitForClickable()
 // await (await $("(//div[contains(text(),'(1)')])[5]")).click()
  //await (await $("(//div[contains(text(),'(1)')])[6]")).waitForClickable()
  //await (await $("(//div[contains(text(),'(1)')])[6]")).click()
  await (await $("//mat-chip[contains(text(),'Unspecified')]")).waitForClickable()
  await (await $("//mat-chip[contains(text(),'Unspecified')]")).click()
  await (await searchPanel.$crossResult).click()
  await browser.pause(10000);
  await (await searchPanel.$searchBox).click()
  await (await searchPanel.$searchIcon).click()
  await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
  await (await searchPanel.$firstSearchResults).waitForClickable()
  await browser.pause(20000);



 

})


});



