const searchData = require("../../testData/searchPanel.json");
const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const layers = require("../../utils/pageobjects/layers.po");
const map = require("../../utils/pageobjects/map.po");
const Collections = require("../../utils/pageobjects/collections.po");

var expectchai = require("chai").expect;
const path = require('path')
const fs = require('fs')
var multiResultsflag=false;
var singleResultflag=false;
describe("Create a collection:", async () => {

  it('View all search results and click on the first result',async ()=>{

    await (await searchPanel.$searchBox).waitForDisplayed({timeout:100000})
    await (await searchPanel.$searchIcon).waitForClickable()
    await (await searchPanel.$searchIcon).click()
    await browser.pause(10000)
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
    

    

  })



  it('Data Selection',async ()=>{
 
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
    await (await searchPanel.$firstSearchResults).waitForClickable()
    await (await searchPanel.$firstSearchResults).click()
     await browser.pause(10000);
     //click on layer
    
    await (await $('//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]')).waitForDisplayed()
     await (await $('//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]')).click()
    // await (await $('(//gis-search-result-header[1]//section[1]//mat-checkbox[1]//span[1]//input)[1]')).click()
     await  Collections.$Actions.click();    
     await  Collections.$Add.click(); 
     await  Collections.$newCollection.click();
  
 
     //close left panel
    // await layers.$closeLayersBtn.waitForClickable();
    // await layers.$closeLayersBtn.click();
    // await browser.pause(1000);

  })

  it('Create Collection',async ()=>{

    //enter collection name
    await (await $('(//form//input)[1]')).waitForDisplayed()
    await (await $('(//form//input)[1]')).setValue('Probe Testing')
     //enter description 
     await (await $('(//form//input)[2]')).waitForDisplayed()
     await (await $('(//form//input)[2]')).setValue('Probe Testing Descriptions')
     //make it active collection
      //enter description 
      await (await $("(//span[@class='mat-checkbox-inner-container']//input)[3]")).click()
      await (await $("//span[normalize-space()='Save']")).click()




  })

  it('Validate Collection',async ()=>{
    await browser.pause(10000)
    await (await map.$collectionTray).waitForClickable();
    await (await map.$collectionTray).click();
    //validating if collection card is present of not
    const activeProbeCard=await $('div.active-cards pioneer-collection-item')
    const cardTitle= await (await activeProbeCard.$('div.collection-container__title h6')).getText()
    expectchai(cardTitle).to.have.string('Probe Testing')

  })

  it('Delete the collection',async ()=>{
    const activeProbeCard=await $('div.active-cards pioneer-collection-item')
     await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click()
   await (await $("//button[normalize-space()='Delete']")).waitForDisplayed()
   await (await $("//button[normalize-space()='Delete']")).click()
   //validate the delete container
   await (await $('mat-dialog-container')).waitForDisplayed()
   await (await $("//span[normalize-space()='Confirm']")).click()
   await browser.pause(10000)

   expectchai(await (await $('div.active-cards pioneer-collection-item')).isDisplayed()).to.be.not.true

  })
});



//await Collections.$addTo.click();