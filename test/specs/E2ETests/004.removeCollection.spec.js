// const searchData = require("../../testData/searchPanel.json");
// const searchPanel = require("../../utils/pageobjects/searchPanel.po");
// const layers = require("../../utils/pageobjects/layers.po");
// const map = require("../../utils/pageobjects/map.po");
// const collection = require("../../utils/pageobjects/collection.po");

// var expectchai = require("chai").expect;
// const path = require('path')
// const fs = require('fs')
// var multiResultsflag=false;
// var singleResultflag=false;
// describe("search panel", async () => {
//   it("check if data layers are not present in hide mode", async () => {
//     //layeys panel icon
//    await layers.$showLayers.waitForDisplayed({ timeout: 25000 });
//    await  layers.$showLayers.click();
//     await browser.pause(10000);
//     //if in hide mode unhide it

//     if (await layers.$globalUnHideLayersBtn.isDisplayed()) {
//         await layers.$globalUnHideLayersBtn.click();
//     }
//     //close left panel
//    await layers.$closeLayersBtn.waitForClickable();
//    await layers.$closeLayersBtn.click();
//   });
//   it("zoom to world wide view ", async () => {
  

//     await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
//     await map.$zoomToWorldView.click();
//     await browser.pause(10000);
    
//   });

//   it("Rectangular selection",async () => {
//     const mapWebelement =await  map.$map
//     const mapWidth = await mapWebelement.getSize("width");
//     const mapHeight =await mapWebelement.getSize("height");
//     console.log("mapheight" + mapHeight);
//     console.log("mapwidth" + mapWidth);
//     //click on rect selection
//     await map.$rectSelect.waitForClickable();
//     await map.$rectSelect.click();
//     browser.pause(500);

//     await mapWebelement.dragAndDrop({ x: 400, y: 200})
//   await  browser.pause(10000);
//   });

//   it("Create a collection", async () => {
// });   

//   it("Search for a collection", async () => {
//    await searchPanel.$searchBox.isDisplayed();
//    await searchPanel.$searchBox.setValue(searchData.name);
//    await browser.pause(10000);
//    await searchPanel.$searchIcon.isClickable();
//    await searchPanel.$searchIcon.click();

//  await browser.pause(10000)
  
//     //either there are no results or we have multiple results
//     if (await searchPanel.$searchResults.isDisplayed()) {
//       if (
//         await searchPanel.$searchResults
//           .$('[class="gis-no-matching-results"] .title')
//           .isDisplayed()
//       ) {
//        expectchai(
//           await searchPanel.$searchResults
//             .$('[class="gis-no-matching-results"] .title')
//             .getValue()
//         ).to.have.string(" No matching results ");
//       }
//       else{

//        multiResultsflag=true;
//       }
//     }//else we have a single card result
//     else{

//      singleResultflag=true;
//      console.log('bye'+singleResultflag)
//     }




//    await browser.pause(10000)
//   });

//   it('navigate to the  result package',async ()=>{
//     if(multiResultsflag==true){
//       //naviagate to the package first
//       //and call the same method called in singleResuult


//     }
//     else if(singleResultflag==true){
// //same for well and seismic
// console.log('hi im here')
// await packageUtils.navigateResultPackage(searchData.dataType,searchData.name,searchData.dataPartition)

//     }
//   })



//   it('Validating details of the  package',async ()=>{
//     await browser.pause(10000)
//     if(searchData.dataType=='Well' || searchData.dataType=='Seismic3dSurvey'){
//       console.log('value of package'+await package.$packageName.getValue())
//       console.log('value of text'+await package.$packageName.getText())
//    expectchai(await package.$packageName.getText()).to.have.string(searchData.packageName);
//    expectchai(await package.$dataProvider.getText()).to.have.string(searchData.dataPartition);
//     }
//     else{

//     }
    

//   })

  
  
// });
