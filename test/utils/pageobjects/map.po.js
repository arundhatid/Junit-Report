//const { default: $ } = require("webdriverio/build/commands/browser/$");

class Map {
  get $infoBox() {
    return $('section[class="sticky ng-star-inserted"]');
  }
  get $infoIcon() {
    return $('mat-icon[data-mat-icon-name="info"]');
  }
  get $closeIcon() {
    return $('mat-icon[data-mat-icon-name="close"]');
  }
  get $searchBox() {
    return $("#gisSearch");
  }
  get $infoBox() {
    return $('section[class="sticky"]');
  }
  get $zoomToWorldView() {
    return $('svg[id="Layer_1"]');
  }
  get $map() {
    return $("#MLSvg1003");
  }
  get $rectSelect() {
    return $('mat-icon[data-mat-icon-name="rectangle-selection"]');
  }
  get $collectionTray() {
    //return $('button[data-slb-id="collection-tray-pin"]')
    return $("//button[normalize-space()='Collections']");
  }
  get $zoomplus() {
    //return $('button[data-slb-id="collection-tray-pin"]')
    return $("//mat-icon[@svgicon='plus']");
  }
  get $zoomMinus() {
    //return $('button[data-slb-id="collection-tray-pin"]')
    return $("//mat-icon[@svgicon='minus']");
  }
  get $RubberbandZoom() {
    //return $('button[data-slb-id="collection-tray-pin"]')
    return $("//mat-icon[@id='rubberband-selection']");
  }
  get $PolygonSelection() {
    return $("//mat-icon[@id='polygon-selection']");
  }
  get $LassoSelection() {
    return $("//mat-icon[@id='lasso-selection']");
  }
  get $LineAndCorridor() {
    return $("//mat-icon[@mattooltip='Line & Corridor']");
  }
  get $SliderBar() {
    return $("//div[@class='dls-slider-wrapper']");
  }
  get $SliderRang() {
    return $("//span[@class='dls-slider-range-view ng-star-inserted']");
  }
  get $BasemapSelection() {
    return $("//mat-icon[@id='basemap-selection']");
  }
  get $confrimClear() {
    return $("//button[@data-slb-id='confirm']");
  }
}
module.exports = new Map();
