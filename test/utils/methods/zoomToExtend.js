const searchPanel = require("../../utils/pageobjects/searchPanel.po");
const map = require("../../utils/pageobjects/map.po");
const layers = require("../../utils/pageobjects/layers.po");

class ZoomToExtend {
  async zoomToExtend(layer) {
    await (await searchPanel.$searchBox).waitForDisplayed();
    try {
      await (await searchPanel.$crossResult).click();
    } catch (e) {
      
    }
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
      await (
        await searchPanel.$firstSearchResults
      ).waitForDisplayed();
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
      await $(
        "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
      )
    ).waitForDisplayed();
    console.log("****zoom to extend****");
    await (await searchPanel.$zoomToExtends).click();
    await (await searchPanel.$crossResult).click();
    await browser.pause(5000);
    await map.$zoomToWorldView.waitForDisplayed({ timeout: 20000 });
    await map.$zoomToWorldView.click();
  }
  async removeOldAction() {
    await (await layers.$showLayers).waitForClickable();
    await (await layers.$showLayers).click();
    await browser.pause(3000);

    try {
      await (await layers.$globalUnHideLayersBtn).waitForClickable({timeout:2000});
      await (await layers.$globalUnHideLayersBtn).click();
    } catch (e) {
      
    }
    console.log("****click on filter");
    await (await layers.$filterIcon).waitForClickable();
    await (await layers.$filterIcon).click();
    console.log("****remove layer***");
    try {
      await (await searchPanel.$backToResults).waitForClickable({timeout:2000});
      await (await searchPanel.$backToResults).click({timeout:2000});
    
    } catch (e) {
      console.log("****click on back if back to group result is display");
    }
    // (await $("//mat-icon[@svgicon='filter-reset']")).waitForClickable();
    //await (await $("//mat-icon[@svgicon='filter-reset']")).click();
    await (await layers.$clearAllFilters).waitForClickable();
    await (await layers.$clearAllFilters).click();
    await (await $("//span[text()=' Yes ']")).click();
    await (await map.$clear).waitForClickable();
    await (await map.$clear).click();
    await browser.pause(2000);
    await (await map.$confrimClear).waitForDisplayed();
    await (await map.$confrimClear).click();
    await browser.pause(2000);
    await (await map.$zoomToWorldView).waitForClickable();
    await map.$zoomToWorldView.click();
    await browser.pause(2000);
  }
}
module.exports = new ZoomToExtend();