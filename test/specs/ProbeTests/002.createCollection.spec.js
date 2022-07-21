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

  it("Unhide the layers", async () => {
    //layeys panel icon
   await layers.$showLayers.waitForDisplayed({ timeout: 25000 });
   await  layers.$showLayers.click();
    await browser.pause(10000);
    //if in hide mode unhide it
    if (await layers.$globalUnHideLayersBtn.isDisplayed()) {
        await layers.$globalUnHideLayersBtn.click();
    }

    //close left panel
   await layers.$closeLayersBtn.waitForClickable();
   await layers.$closeLayersBtn.click();
   await browser.pause(1000);
  });

  it("Zoom out to world view ", async () => {
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
    await browser.pause(1000);
  });

  it("Rectangular selection",async () => {
    const mapWebelement =await  map.$map
    const mapWidth = await mapWebelement.getSize("width");
    const mapHeight =await mapWebelement.getSize("height");
    console.log("mapheight" + mapHeight);
    console.log("mapwidth" + mapWidth);
    //click on rect selection
    await map.$rectSelect.waitForClickable();
    await map.$rectSelect.click();
    await browser.pause(1000);

    await mapWebelement.dragAndDrop({ x: 400, y: 200})
  await  browser.pause(10000);
  await searchPanel.$searchIcon.getValue()
  }); 

  it("Select data for the collection", async () => {
  await browser.pause(10000)
  
    //either there are no results or we have multiple results
    if (await searchPanel.$searchResults.isDisplayed()) {
      if (
        await searchPanel.$searchResults
          .$('[class="gis-no-matching-results"] .title')
          .isDisplayed()
      ) {
       expectchai(
          await searchPanel.$searchResults
            .$('[class="gis-no-matching-results"] .title')
            .getValue()
        ).to.have.string(" No matching results ");
      }
      else{

       multiResultsflag=true;
       console.log('Number of selected datasets ='+await searchPanel.$searchResults.getText())
       await searchPanel.$searchBox.getValue($searchResults);
       await searchPanel.$searchResults.isClickable();
       await searchPanel.$searchResults.click();
      }
    }//else we have a single card result
    else{

     singleResultflag=true;
     console.log('bye'+singleResultflag)
    }

    await  browser.pause(10000);
    
    
    //await map.$collectionTray.isClickable();
    //await map.$collectionTray.click();
    await layers.$WellLayer.isClickable();
    await layers.$WellLayer.click();
    await searchPanel.$checkbox.click();


    //await browser.pause(10000);
   await browser.pause(10000)
  });

  xit('Create Collection',async ()=>{


  })

  xit('Validate Collection',async ()=>{
    await map.$collectionTray.isClickable();
    await map.$collectionTray.click();
  })
});



//await Collections.$addTo.click();