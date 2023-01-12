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

  const USER_ID = 'DELFI-6976-SM-009@slb.com';
  const PASSWORD='Second^12345';
  const URL='https://evq.discovery.cloud.slb-ds.com/';
  const SECRET_KEY='fssknsltfkc2sxhy';
  console.log('value of id'+USER_ID+'pass'+PASSWORD+'url'+URL+'secret'+SECRET_KEY);
  //await browser.maximizeWindow()
  await browser.url(URL);

   //await browser.maximizeWindow()
   await delfi.delfiLogin(USER_ID,PASSWORD,SECRET_KEY);
   console.log('title'+await browser.getTitle())
   try {
    await (await login.$CloseBox).waitForDisplayed({timeout:100000})
    await (await login.$CloseBox).click()
   } catch (e) {
    
   }
    await (await searchPanel.$searchBox).waitForDisplayed({timeout:100000})
   
});

it('Verify creation and display of Active Well collection',async ()=>{
  await (await searchPanel.$searchBox).waitForDisplayed({timeout:100000})
  await (await layers.$showLayers).waitForClickable();
  await (await layers.$showLayers).click();
  await (await $("//div[@class='layers-panel-header']")).click()
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
  await  Collections.$Actions.click();    
  await  Collections.$Add.click();
  await  Collections.$Add.click();
  await browser.pause(10000);
  await  Collections.$newCollection.click();
  await browser.pause(10000);
  await (await Collections.$collectionName).waitForDisplayed()
  await (await Collections.$collectionName).setValue('Coll for Well Logs')
  await (await Collections.$collectionDiscreption).waitForDisplayed()
  await (await Collections.$collectionDiscreption).setValue('Coll for Well Logs Descriptions')
  await (await Collections.$checkBox).waitForDisplayed()
   await browser.pause(10000)
   await (await Collections.$checkBox).click()
   await browser.pause(10000)
   await (await Collections.$saveButton).click()
   await browser.pause(10000)
   await (await Collections.$collectionTray).waitForDisplayed()
 await (await Collections.$collectionTray).click()
 await browser.pause(10000)
 const activeProbeCard=await $('div.active-cards pioneer-collection-item')
    const cardTitle= await (await activeProbeCard.$('div.collection-container__title h6')).getText()
    expectchai(cardTitle).to.have.string('Well Logs')
    const createdOn= await (await activeProbeCard.$("div[class='detail-display'] label:nth-child(1)")).getText()
    expectchai(createdOn).to.have.string('Created on:')
    await browser.pause(10000)
    const createdBy= await (await activeProbeCard.$("div[class='detail-display'] label:nth-child(2)")).getText()
    expectchai(createdBy).to.have.string('Created by:')
    const wellIcon= await (await activeProbeCard.$("button:nth-child(1) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(wellIcon).to.have.string('Well')
    const twoDLineIcon= await (await activeProbeCard.$("button:nth-child(2) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(twoDLineIcon).to.have.string('2d-line')
    const ThreeDSeismicLineIcon= await (await activeProbeCard.$("button:nth-child(3) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(ThreeDSeismicLineIcon).to.have.string('3d-survey')
    const otherIcon= await (await activeProbeCard.$("button:nth-child(4) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(otherIcon).to.have.string('more')
     await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click()
     const delet= await (await activeProbeCard.$("//button[@role='menuitem']")).getText()
     expectchai(delet).to.have.string('Delete')
     await browser.pause(10000)
    await (await searchPanel.$searchBox).click()
    await (await searchPanel.$searchIcon).click()
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
    //const count= await (await activeProbeCard.$("//div[@class='search-icon']")).getText()
    //const countOnActiveColl= await (await activeProbeCard.$("//mat-card[@class='mat-card mat-focus-indicator collection-container is-activated']//span[@class='mat-badge-content mat-badge-active']")).getText()
    //count.isEqual(countOnActiveColl)
    const  activeCollectionCount = await (await activeProbeCard.$("(//span[@class='mat-badge-content mat-badge-active'])[1]")).getText()
    expectchai(activeCollectionCount).to.have.string('1')
    await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click()
    await (await Collections.$deletButton).waitForDisplayed()
    await browser.pause(10000)
    await (await Collections.$deletButton).click()
  //validate the delete container
   await (await $('mat-dialog-container')).waitForDisplayed()
   await (await $("//span[normalize-space()='Confirm']")).click()
   await (await Collections.$closeCollectionTray).waitForDisplayed()
    await (await Collections.$closeCollectionTray).click();
    await browser.pause(20000)

})


it('Verify creation and display of Seismic2d collection',async ()=>{
  await (await layers.$showLayers).waitForClickable();
  await (await layers.$showLayers).click();
  await (await $("//mat-icon[@svgicon='filter-icon']")).waitForClickable()
  await (await $("//mat-icon[@svgicon='filter-icon']")).click();
  await (await $("//button[text()=' Remove ']")).click();
  await (await searchPanel.$crossResult).click()
  await (await layers.$globalHideLayersBtn).waitForClickable()
  await (await layers.$globalHideLayersBtn).click();
  await browser.pause(10000);
  await (await layers.$Seismic2dHideBtn).waitForClickable()
  await (await layers.$Seismic2dHideBtn).click();
  await browser.pause(10000);
  await (await layers.$Seismic2dDropdown).waitForClickable()
  await (await layers.$Seismic2dDropdown).click();
  await browser.pause(10000);
  await (await layers.$SeismicFilterSearch).waitForClickable()
  await (await layers.$SeismicFilterSearch).click();
  await browser.pause(10000);
  await (await $("//mat-icon[@data-mat-icon-name='arrow-left-5']")).click();
  await (await searchPanel.$searchBox).click()
  await (await searchPanel.$searchIcon).click()
  await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
  await (await searchPanel.$firstSearchResults).waitForClickable()
  await browser.pause(20000);
  await  Collections.$Actions.click();    
  await  Collections.$Add.click();
  await  Collections.$Add.click();
  await browser.pause(10000);
  await  Collections.$newCollection.click();
  await browser.pause(10000);
  await (await Collections.$collectionName).waitForDisplayed()
  await (await Collections.$collectionName).setValue('Coll for Seismic2d Line')
  await (await Collections.$collectionDiscreption).waitForDisplayed()
  await (await Collections.$collectionDiscreption).setValue('Coll for Seismic2d Line Descriptions')
  await (await Collections.$checkBox).waitForDisplayed()
   await browser.pause(10000)
   await (await Collections.$checkBox).click()
   await browser.pause(10000)
   await (await Collections.$saveButton).click()
   await browser.pause(10000)
   await (await Collections.$collectionTray).waitForDisplayed()
 await (await Collections.$collectionTray).click()
 await browser.pause(10000)
 const activeProbeCard=await $('div.active-cards pioneer-collection-item')
    const cardTitle= await (await activeProbeCard.$('div.collection-container__title h6')).getText()
    expectchai(cardTitle).to.have.string('Seismic2d')
    const createdOn= await (await activeProbeCard.$("div[class='detail-display'] label:nth-child(1)")).getText()
    expectchai(createdOn).to.have.string('Created on:')
    await browser.pause(10000)
    const createdBy= await (await activeProbeCard.$("div[class='detail-display'] label:nth-child(2)")).getText()
    expectchai(createdBy).to.have.string('Created by:')
    const wellIcon= await (await activeProbeCard.$("button:nth-child(1) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(wellIcon).to.have.string('Well')
    const twoDLineIcon= await (await activeProbeCard.$("button:nth-child(2) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(twoDLineIcon).to.have.string('2d-line')
    const ThreeDSeismicLineIcon= await (await activeProbeCard.$("button:nth-child(3) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(ThreeDSeismicLineIcon).to.have.string('3d-survey')
    const otherIcon= await (await activeProbeCard.$("button:nth-child(4) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(otherIcon).to.have.string('more')
     await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click()
     const delet= await (await activeProbeCard.$("//button[@role='menuitem']")).getText()
     expectchai(delet).to.have.string('Delete')
     await browser.pause(10000)
    await (await searchPanel.$searchBox).click()
    await (await searchPanel.$searchIcon).click()
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
    await browser.pause(10000)
    const  activeCollectionCount = await (await activeProbeCard.$("(//span[@class='mat-badge-content mat-badge-active'])[1]")).getText()
    expectchai(activeCollectionCount).to.have.string('1')
    await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click()
    await (await Collections.$deletButton).waitForDisplayed()
    await browser.pause(10000)
    await (await Collections.$deletButton).click()
  //validate the delete container
   await (await $('mat-dialog-container')).waitForDisplayed()
   await (await $("//span[normalize-space()='Confirm']")).click()
   await (await Collections.$closeCollectionTray).waitForDisplayed()
    await (await Collections.$closeCollectionTray).click();
    await browser.pause(20000)
  //await (await $("//mat-icon[@svgicon='no-preview']")).click();


})
it('Verify creation and display of Seismic3d collection',async ()=>{
  await (await layers.$showLayers).waitForClickable();
  await (await layers.$showLayers).click();
  await (await $("//mat-icon[@svgicon='filter-icon']")).waitForClickable()
  await (await $("//mat-icon[@svgicon='filter-icon']")).click();
  await (await $("//button[text()=' Remove ']")).click();
  await (await searchPanel.$crossResult).click()
  await (await layers.$globalHideLayersBtn).waitForClickable()
  await (await layers.$globalHideLayersBtn).click();
  await browser.pause(10000);
  await (await layers.$Seismic3dHideBtn).waitForClickable()
  await (await layers.$Seismic3dHideBtn).click();
  await browser.pause(10000);
  await (await layers.$Seismic3dDropdown).waitForClickable()
  await (await layers.$Seismic3dDropdown).click();
  await browser.pause(10000);
  await (await layers.$SeismicFilterSearch).waitForClickable()
  await (await layers.$SeismicFilterSearch).click();
  await browser.pause(10000);
  await (await $("//mat-icon[@data-mat-icon-name='arrow-left-5']")).click();
  await (await searchPanel.$searchBox).click()
  await (await searchPanel.$searchIcon).click()
  await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
  await (await searchPanel.$firstSearchResults).waitForClickable()
  await browser.pause(20000);
  await  Collections.$Actions.click();    
  await  Collections.$Add.click();
  await  Collections.$Add.click();
  await browser.pause(10000);
  await  Collections.$newCollection.click();
  await browser.pause(10000);
  await (await Collections.$collectionName).waitForDisplayed()
  await (await Collections.$collectionName).setValue('Coll for Seismic3d Line')
  await (await Collections.$collectionDiscreption).waitForDisplayed()
  await (await Collections.$collectionDiscreption).setValue('Coll for Seismic3d Line Descriptions')
  await (await Collections.$checkBox).waitForDisplayed()
   await browser.pause(10000)
   await (await Collections.$checkBox).click()
   await browser.pause(10000)
   await (await Collections.$saveButton).click()
   await browser.pause(10000)
   await (await Collections.$collectionTray).waitForDisplayed()
 await (await Collections.$collectionTray).click()
 await browser.pause(40000)
 const activeProbeCard=await $('div.active-cards pioneer-collection-item')
    const cardTitle= await (await activeProbeCard.$('div.collection-container__title h6')).getText()
    expectchai(cardTitle).to.have.string('Seismic3d')
    const createdOn= await (await activeProbeCard.$("div[class='detail-display'] label:nth-child(1)")).getText()
    expectchai(createdOn).to.have.string('Created on:')
    await browser.pause(10000)
    const createdBy= await (await activeProbeCard.$("div[class='detail-display'] label:nth-child(2)")).getText()
    expectchai(createdBy).to.have.string('Created by:')
    const wellIcon= await (await activeProbeCard.$("button:nth-child(1) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(wellIcon).to.have.string('Well')
    const twoDLineIcon= await (await activeProbeCard.$("button:nth-child(2) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(twoDLineIcon).to.have.string('2d-line')
    const ThreeDSeismicLineIcon= await (await activeProbeCard.$("button:nth-child(3) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(ThreeDSeismicLineIcon).to.have.string('3d-survey')
    const otherIcon= await (await activeProbeCard.$("button:nth-child(4) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(otherIcon).to.have.string('more')
     await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click()
     const delet= await (await activeProbeCard.$("//button[@role='menuitem']")).getText()
     expectchai(delet).to.have.string('Delete')
     await browser.pause(10000)

     //const count= await (await activeProbeCard.$("//div[@class='search-icon']")).getText()
   // const countOnActiveColl= await (await activeProbeCard.$("//mat-card[@class='mat-card mat-focus-indicator collection-container is-activated']//span[@class='mat-badge-content mat-badge-active']")).getText()
   // count.isEqual(' Seismic 3D Survey '+'('+countOnActiveColl+')')

    await (await searchPanel.$searchBox).click()
    await (await searchPanel.$searchIcon).click()
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
    await browser.pause(10000)
   // const  activeCollectionCount = await (await activeProbeCard.$("(//span[@class='mat-badge-content mat-badge-active'])[1]")).getText()
   // expectchai(activeCollectionCount).to.have.string('1')
    await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click()
    await (await Collections.$deletButton).waitForDisplayed()
    await browser.pause(10000)
    await (await Collections.$deletButton).click()
  //validate the delete container
   await (await $('mat-dialog-container')).waitForDisplayed()
   await (await $("//span[normalize-space()='Confirm']")).click()
   await (await Collections.$closeCollectionTray).waitForDisplayed()
    await (await Collections.$closeCollectionTray).click();
    await browser.pause(20000)



})

it('Verify creation and display of Prospects collection',async ()=>{
  await (await layers.$showLayers).waitForClickable();
  await (await layers.$showLayers).click();
  await (await $("//mat-icon[@svgicon='filter-icon']")).waitForClickable()
  await (await $("//mat-icon[@svgicon='filter-icon']")).click();
 // await (await $("//button[text()=' Remove ']")).click();
  await (await searchPanel.$crossResult).click()
  await (await layers.$globalHideLayersBtn).waitForClickable()
  await (await layers.$globalHideLayersBtn).click();
  await browser.pause(10000);

  await (await layers.$ProspectHideBtn).waitForClickable()
  await (await layers.$ProspectHideBtn).click();
  await browser.pause(10000);
  await (await layers.$ProspectDropdown).waitForClickable()
  await (await layers.$ProspectDropdown).click();
  await browser.pause(10000);
  await (await layers.$ProspectFilterSearch).waitForClickable()
  await (await layers.$ProspectDropdown).click();
  await browser.pause(10000);
  await (await $("//mat-icon[@data-mat-icon-name='arrow-left-5']")).click();
  await (await searchPanel.$searchBox).click()
  await (await searchPanel.$searchIcon).click()
  await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
  await (await searchPanel.$firstSearchResults).waitForClickable()
  await browser.pause(20000);
  await  Collections.$Actions.click();    
  await  Collections.$Add.click();
  await  Collections.$Add.click();
  await browser.pause(10000);
  await  Collections.$newCollection.click();
  await browser.pause(10000);
  await (await Collections.$collectionName).waitForDisplayed()
  await (await Collections.$collectionName).setValue('Coll for Prospects')
  await (await Collections.$collectionDiscreption).waitForDisplayed()
  await (await Collections.$collectionDiscreption).setValue('Coll for Prospects Descriptions')
  await (await Collections.$checkBox).waitForDisplayed()
   await browser.pause(10000)
   await (await Collections.$checkBox).click()
   await browser.pause(10000)
   await (await Collections.$saveButton).click()
   await browser.pause(10000)
   await (await Collections.$collectionTray).waitForDisplayed()
 await (await Collections.$collectionTray).click()
 await browser.pause(40000)
 const activeProbeCard=await $('div.active-cards pioneer-collection-item')
    const cardTitle= await (await activeProbeCard.$('div.collection-container__title h6')).getText()
    expectchai(cardTitle).to.have.string('Prospects')
    const createdOn= await (await activeProbeCard.$("div[class='detail-display'] label:nth-child(1)")).getText()
    expectchai(createdOn).to.have.string('Created on:')
    await browser.pause(10000)
    const createdBy= await (await activeProbeCard.$("div[class='detail-display'] label:nth-child(2)")).getText()
    expectchai(createdBy).to.have.string('Created by:')
    const wellIcon= await (await activeProbeCard.$("button:nth-child(1) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(wellIcon).to.have.string('Well')
    const twoDLineIcon= await (await activeProbeCard.$("button:nth-child(2) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(twoDLineIcon).to.have.string('2d-line')
    const ThreeDSeismicLineIcon= await (await activeProbeCard.$("button:nth-child(3) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(ThreeDSeismicLineIcon).to.have.string('3d-survey')
    const otherIcon= await (await activeProbeCard.$("button:nth-child(4) span:nth-child(1) div:nth-child(1) mat-icon:nth-child(1)")).getAttribute('data-mat-icon-name')
    expectchai(otherIcon).to.have.string('more')
     await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click()
     const delet= await (await activeProbeCard.$("//button[@role='menuitem']")).getText()
     expectchai(delet).to.have.string('Delete')
     await browser.pause(10000)
    await (await searchPanel.$searchBox).click()
    await (await searchPanel.$searchIcon).click()
    await (await searchPanel.$firstSearchResults).waitForDisplayed({timeout:80000})
    await browser.pause(10000)
    const  activeCollectionCount = await (await activeProbeCard.$("(//span[@class='mat-badge-content mat-badge-active'])[1]")).getText()
    expectchai(activeCollectionCount).to.have.string('1')
    await (await activeProbeCard.$('mat-icon[svgicon="more"]')).click()
    await (await Collections.$deletButton).waitForDisplayed()
    await browser.pause(10000)
    await (await Collections.$deletButton).click()
  //validate the delete container
   await (await $('mat-dialog-container')).waitForDisplayed()
   await (await $("//span[normalize-space()='Confirm']")).click()
   await (await Collections.$closeCollectionTray).waitForDisplayed()
    await (await Collections.$closeCollectionTray).click();
    await browser.pause(20000)

})

});



