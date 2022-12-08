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


  it('Create Collection by well log',async ()=>{
    await (await searchPanel.$searchBox).waitForDisplayed({timeout:100000})
    await (await searchPanel.$searchIcon).waitForClickable({timeout:10000})
    await (await searchPanel.$searchBox).click()
    await (await searchPanel.$searchBox).setValue('Cheal')
    await (await searchPanel.$searchIcon).click()
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
    if (await (await searchPanel.$firstSearchResults).isDisplayed) {
    await browser.pause(10000);
    await  Collections.$Actions.click();    
     await  Collections.$Add.click();
     await  Collections.$Add.click();
     await browser.pause(10000);
     await  Collections.$newCollection.click();
     await browser.pause(10000);
     await (await Collections.$collectionName).waitForDisplayed()
     await (await Collections.$collectionName).setValue('Coll for Probe Testing')
     await (await Collections.$collectionDiscreption).waitForDisplayed()
     await (await Collections.$collectionDiscreption).setValue('Coll for Probe Testing Descriptions')
     await (await Collections.$checkBox).waitForDisplayed()
      await browser.pause(20000)
      await (await Collections.$checkBox).click()
      await browser.pause(20000)
      await (await Collections.$saveButton).click()
      await browser.pause(10000)
      await (await Collections.$collectionTray).waitForDisplayed()
    await (await Collections.$collectionTray).click()
    await browser.pause(10000)
  } else {
      console.log('cheal well log is not avl');
  }
   // const activeProbeCard=await $('div.active-cards pioneer-collection-item')
   // const numOfWell= await  (await activeProbeCard.$("//span[@id='mat-badge-content-0']")).getText()
    //console.log("*********"+numofWell+"************");
    //expectchai(numOfWell).to.have.string('1')
    
    
  
  
  })

  it('Validate Collection',async ()=>{
    
    //validating if collection card is present of not
    const activeProbeCard=await $('div.active-cards pioneer-collection-item')
    const cardTitle= await (await activeProbeCard.$('div.collection-container__title h6')).getText()
    expectchai(cardTitle).to.have.string('Probe Testing')
    await browser.pause(20000)
    
  })

  it('Adding 3D Seismic in Active collection',async ()=>{
    await (await searchPanel.$crossResult).click()
    await (await searchPanel.$searchBox).click()
    await (await searchPanel.$searchBox).setValue('BO_3D')
    await (await searchPanel.$searchIcon).click()
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
   if (await (await searchPanel.$firstSearchResults).isDisplayed) {
    await (await searchPanel.$firstSearchResults).waitForClickable()
    await browser.pause(10000);
    await (await searchPanel.$firstSearchResults).click()
    await (await $('//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]')).waitForDisplayed()
    await (await $('//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]')).click()
    await browser.pause(10000);
    await  Collections.$Actions.click();     
     await  Collections.$Add.click();
     await  Collections.$Add.click();
     await browser.pause(10000)
     await  Collections.$activeCollections.click(); 
    await browser.pause(10000);
  } else {
    console.log('BO_3D 3D Seismic is not avl');
  }
    //const activeProbeCard=await $('div.active-cards pioneer-collection-item')
    //const numOf3DSeismic= await  (await activeProbeCard.$('#mat-badge-content-189')).getText()
   // expectchai(numOfWell).to.have.string('1')
    
  })


  it('Adding 2D Seismic Line in Active collection',async ()=>{
    await (await searchPanel.$crossResult).click()
    await (await searchPanel.$searchBox).click()
    await (await searchPanel.$searchBox).setValue('PEG0909M1000')
    await (await searchPanel.$searchIcon).click()
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
    if (await (await searchPanel.$firstSearchResults).isDisplayed) {
    await (await searchPanel.$firstSearchResults).waitForClickable()
    await browser.pause(10000);
    await (await searchPanel.$firstSearchResults).click()
    await (await $('//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]')).waitForDisplayed()
    await (await $('//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]')).click()
    await browser.pause(10000);
    await  Collections.$Actions.click();    
     await  Collections.$Add.click();
     await  Collections.$Add.click();
     await browser.pause(10000);
     await  Collections.$activeCollections.click();
     await browser.pause(10000);
    } else {
      console.log('PEG0909M1000 2D Seismic is not avl');
    }
     

  })

  it('Adding Prospects in Active collection',async ()=>{
    await (await searchPanel.$crossResult).click()
    await (await searchPanel.$searchBox).click()
    await (await searchPanel.$searchBox).setValue('Hector')
    await (await searchPanel.$searchIcon).click()
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
    if (await (await searchPanel.$firstSearchResults).isDisplayed) {
    await (await searchPanel.$firstSearchResults).waitForClickable()
    await browser.pause(10000);
    await (await searchPanel.$firstSearchResults).click()
    await (await $('//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]')).waitForDisplayed()
    await (await $('//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]')).click()
    await browser.pause(10000);
    await  Collections.$Actions.click();    
     await  Collections.$Add.click();
     await  Collections.$Add.click();
     await browser.pause(10000);
     await  Collections.$activeCollections.click();
     await browser.pause(10000);
     await (await Collections.$closeCollectionTray).waitForDisplayed()
    await (await Collections.$closeCollectionTray).click();
    await (await searchPanel.$crossResult).click()
    await browser.pause(20000);
    } else {
      console.log('Hector Prospects is not avl');
    }
  

  })

  it('Enable focus mode & remove one layer from active collection ',async ()=>{
    await (await $("//mat-icon[@data-mat-icon-name='target-icon']")).click()
    await browser.pause(10000);
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
    await (await searchPanel.$firstSearchResults).waitForClickable()
    await browser.pause(10000);
    await (await searchPanel.$firstSearchResults).click()
    await (await $('//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]')).waitForDisplayed()
    await (await $('//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]')).click()
    await browser.pause(10000);
    await  Collections.$Actions.click(); 
     await  Collections.$removeFrom.click();
     await  Collections.$removeFrom.click();
     await browser.pause(10000); 
     await  Collections.$activeCollections.click();
     await browser.pause(10000);
    
    //await (await $('#MLRect1009')).dragAndDrop($("//p[@class='gm-style-mot']"))
     
  })
  it('Delete the collection',async ()=>{
    await (await Collections.$collectionTray).waitForDisplayed()
    await (await Collections.$collectionTray).click()
    await browser.pause(10000);
     const activeProbeCard=await $('div.active-cards pioneer-collection-item')
     await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click()
   await (await Collections.$deletButton).waitForDisplayed()
   await browser.pause(10000)
   await (await Collections.$deletButton).click()
   //validate the delete container
   await (await $('mat-dialog-container')).waitForDisplayed()
   await (await $("//span[normalize-space()='Confirm']")).click()
   await browser.pause(10000);
   expectchai(await (await $('div.active-cards pioneer-collection-item')).isDisplayed()).to.be.not.true

  })

});