const searchPanel = require("../pageobjects/searchPanel.po");
const map = require("../pageobjects/map.po");
const layers = require("../pageobjects/layers.po");
const Collections = require("../pageobjects/collections.po");

class ZoomToExtend {
  async zoomToExtend(layer) {
    await (await searchPanel.$searchBox).waitForDisplayed();
    try {
      await (await searchPanel.$crossResult).click();
    } catch (e) {}
    await (await searchPanel.$searchBox).waitForClickable();
    await (await searchPanel.$searchBox).click();
    await (await searchPanel.$searchBox).setValue(layer);
    await (await searchPanel.$searchIcon).click();
    try {
      await (
        await searchPanel.$firstSearchResults
      ).waitForDisplayed({ timeout: 80000 });
      await (await searchPanel.$firstSearchResults).waitForClickable();
      await (await searchPanel.$firstSearchResults).click();
    } catch (e) {
      await (await searchPanel.$firstSearchResults).waitForDisplayed();
      await (await searchPanel.$firstSearchResults).waitForClickable();
      await (await searchPanel.$firstSearchResults).click();
    }
    await browser.pause(2000);
    try {
      await (await searchPanel.$backToResults).click();
      await (await searchPanel.$firstSearchResults).click();
    } catch (e) {
      await (await searchPanel.$firstSearchResults).click();
      console.log("****click on back if back to group result is display");
    }
    await (
      await searchPanel.$1stresultFromfirstSearchResults
    ).waitForDisplayed();

    console.log("****zoom to extend****");
    await (await searchPanel.$zoomToExtends).click();
    await (await searchPanel.$crossResult).click();
    //await (await searchPanel.$searchBox).clearValue();
    await browser.pause(5000);
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
  }
  async removeOldAction() {
    
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await browser.pause(1000);
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
    await browser.pause(2000);
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await (await layers.$normalclick).click();
    await (await layers.$globalHideLayersBtn).waitForClickable();
    await (await layers.$globalHideLayersBtn).click();
    await browser.pause(1000);
    await (await layers.$globalUnHideLayersBtn).waitForClickable();
    await (await layers.$globalUnHideLayersBtn).click();
    const cross = await (
      await searchPanel.$backOrClose
    ).getAttribute("data-slb-id");
    console.log(cross);
    if (cross == "side-panel-header-close-button") {
      await (await searchPanel.$crossResult).click();
    } else {
      await (await layers.$backLayerArrow).click();
    }
    try {
      await (
        await Collections.$closeCollectionTray
      ).waitForDisplayed({ timeout: 5000 });
      await (await Collections.$collectionTray).click();
    } catch (e) {
      console.log("****if coll tray is up by default than close it 1st");
    }
    await browser.pause(2000);
  }
}
module.exports = new ZoomToExtend();
