const searchData = require("../../testData/searchPanel.json");
const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const Collections = require("../../utils/pageobjects/collections.po");
const delfi= require('../../utils/methods/Login')
const login= require('../../utils/pageobjects/login.po.js')


var expectchai = require("chai").expect;
const webdriverio = require('webdriverio');
const path = require('path')
const fs = require('fs');
const { createJSHandle } = require("puppeteer-core");
var multiResultsflag=false;
var singleResultflag=false;
describe("performs Basic Map and GIS toolbox features:", async () => {

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
  const mapWebelement =await  map.$map
  await (await searchPanel.$searchBox).waitForDisplayed({timeout:100000})
  await (await map.$zoomplus).waitForClickable()
  await (await map.$zoomplus).click();
  await browser.pause(10000);
  //pan through
  await mapWebelement.dragAndDrop({ x: 50, y: 50})
  //zoom minus
  await (await map.$zoomMinus).waitForClickable()
  await (await map.$zoomMinus).click()
  await browser.pause(10000);
  //await mapWebelement.dragAndDrop({ x: 400, y: 200})
  //await  browser.pause(10000);
  
})

it('Zoom to World View',async ()=>{
  const mapWebelement =await  map.$map
  await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
  await map.$zoomToWorldView.click();
  await browser.pause(10000);
 // await mapWebelement.dragAndDrop({ x: 300, y: 300})
   //await  browser.pause(10000);
   await (await map.$zoomplus).waitForClickable()
  await (await map.$zoomplus).click();
  

})

it("Rectangular selection",async () => {
  const mapWebelement =await  map.$map
  const mapWidth = await mapWebelement.getSize("width");
  const mapHeight =await mapWebelement.getSize("height");
  console.log("mapheight" + mapHeight);
  console.log("mapwidth" + mapWidth);
  await mapWebelement.dragAndDrop({ x: 400, y: 200})
  //await mapWebelement.dragAndDrop({ x: -400, y: -700})
  //click on rect selection
  await map.$rectSelect.waitForClickable();
  await map.$rectSelect.click();
  await  browser.pause(40000);
  //await mapWebelement.dragAndDrop({ x: mapWidth, y: mapHeight})
  await mapWebelement.dragAndDrop({ x: 200, y: 100});
  await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
 // await mapWebelement.dragAndDrop({ x: 200, y: 500})
 //Rubberband zoom
  await map.$RubberbandZoom.waitForClickable();
  await map.$RubberbandZoom.click();
  await  browser.pause(10000);
  await mapWebelement.dragAndDrop({ x: 10, y: 10})
 await  browser.pause(40000);

})
it('Verify GIS tools - Polygon Selection',async ()=>{
  await (await searchPanel.$crossResult).click()
  const mapWebelement =await  map.$map
  await (await map.$zoomMinus).waitForClickable()
  await (await map.$zoomMinus).click()
  await (await map.$zoomMinus).click()
  await mapWebelement.dragAndDrop({ x: -400, y: -100})
  await map.$PolygonSelection.waitForClickable();
  await map.$PolygonSelection.click();
  await mapWebelement.dragAndDrop({ x: 400, y: 200})
  await mapWebelement.dragAndDrop({ x: -400, y: 200})
  await mapWebelement.click();
  await mapWebelement.click();
  await  browser.pause(20000);
  await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
  await  browser.pause(40000);
  await (await map.$zoomMinus).waitForClickable()
  await (await map.$zoomMinus).click()
  await (await map.$zoomMinus).click()
  await  browser.pause(10000);
})

  it('Verify Update Results when map moves checkbox',async ()=>{
  const mapWebelement =await  map.$map
  await layers.$MoveCheckbox.waitForClickable();
  await (await layers.$MoveCheckbox).click()
  await mapWebelement.dragAndDrop({ x: 200, y: 100})
  await mapWebelement.click();
  await mapWebelement.click();
  await  browser.pause(40000);
  await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
  await  browser.pause(40000);
  await (await searchPanel.$crossResult).click()
  await  browser.pause(10000);
})

it('Verify GIS tools - Lasso Selection',async ()=>{
  const mapWebelement =await  map.$map
  await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
  await map.$zoomToWorldView.click();
  await (await map.$zoomplus).waitForClickable()
  await (await map.$zoomplus).click();
  await mapWebelement.dragAndDrop({ x: -400, y: -200})
  await map.$LassoSelection.waitForClickable({timeout:80000})
  await map.$LassoSelection.click();
  await mapWebelement.dragAndDrop({ x: 200, y: 200})
  //await mapWebelement.dragAndDrop({ x: -200, y: 200})
  await mapWebelement.click();
  await mapWebelement.click();
  await  browser.pause(20000);
  await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
  await  browser.pause(40000);
  

})
it(' Line and Corridor tool',async ()=>{
  await (await searchPanel.$crossResult).click()
  const mapWebelement =await  map.$map
  await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
  await map.$zoomToWorldView.click();
  await browser.pause(10000);
  await (await searchPanel.$searchBox).waitForDisplayed({timeout:100000})
  await (await layers.$showLayers).waitForClickable();
  await (await layers.$showLayers).click();
  await (await $("//div[@class='layers-panel-header']")).click()
  await browser.pause(10000);
  await (await layers.$globalHideLayersBtn).waitForClickable()
  await (await layers.$globalHideLayersBtn).click();
  await browser.pause(10000);
  await (await layers.$WellLayerHideBtn).waitForClickable()
  await (await layers.$WellLayerHideBtn).click();
   await (await map.$zoomplus).waitForClickable()
  await (await map.$zoomplus).click();
  await (await map.$zoomplus).click();
  await mapWebelement.dragAndDrop({ x: -400, y: -100})
  await browser.pause(10000);
  await map.$LineAndCorridor.waitForClickable();
  await map.$LineAndCorridor.click();
  await mapWebelement.dragAndDrop({ x: 100, y: -20})
  await mapWebelement.click();
  await mapWebelement.click();
  await browser.pause(10000);
  await (await map.$SliderBar).waitForDisplayed({timeout:100000})
  await (await map.$SliderRang).waitForDisplayed({timeout:100000})
  await (await map.$SliderRang).click();
  await  browser.pause(40000);
  await (await $("//div[@class='grey']//canvas")).waitForDisplayed();
  await  browser.pause(40000);
  await (await $("(//mat-icon[@svgicon='close'])[2]")).click()
  await  browser.pause(20000);
  await (await $("(//mat-icon[@svgicon='close'])[3]")).click()
  await  browser.pause(40000);
 
  

})

it('BasemapClickOnBasemap',async ()=>{
  await (await searchPanel.$crossResult).click()
  const mapWebelement =await  map.$map
  await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
  await map.$zoomToWorldView.click();
  await browser.pause(10000);
  await map.$BasemapSelection.waitForClickable({timeout:80000})
  await  browser.pause(20000);
  await map.$BasemapSelection.click();
  await (await $("//span[normalize-space()='Roadmap']")).waitForDisplayed()
  await (await $("//span[normalize-space()='Hybrid']")).waitForDisplayed()
  await (await $("//span[normalize-space()='Satellite']")).waitForDisplayed()
  await (await $("//span[normalize-space()='Terrain']")).waitForDisplayed()
  await (await $("//span[normalize-space()='Terrain']")).click();
  await  browser.pause(40000);
  
})
});