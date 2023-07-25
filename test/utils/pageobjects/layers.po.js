class Layers {
  get $showLayers() {
    return $("button.layericon");
  }
  get $layersTitle() {
    return $('div[class="layers-panel-header"] h2');
  }
  get $layersPresent() {
    return $("(//div[@class='cdk-drag ng-star-inserted'])");
  }
  get $filterSummary() {
    return $('[data-slb-id="show-all-filters-button"]');
  }
  get $clearAllFilters() {
    return $("//a[@data-slb-id='clear-all-filters-button']");
  }
  get $globalHideLayersBtn() {
    return $('[data-slb-id="turn-off-all-layers-button"]');
  }
  get $globalUnHideLayersBtn() {
    return $('[data-slb-id="turn-on-all-layers-button"]');
  }
  get $closeLayersBtn() {
    return $('mat-icon[data-mat-icon-name="close"]');
  }
  get $WellLayer() {
    return $('mat-icon[data-mat-icon-name="Well"]');
  }
  get $FieldLayer() {
    return $('mat-icon[data-mat-icon-name="field"]');
  }
  get $BasinLayer() {
    return $('mat-icon[data-mat-icon-name="basin"]');
  }
  get $WellLayerHideBtn() {
    return $("(//button[@data-slb-id='toggle-layer'])[5]");
  }
  get $WellLayerDropdown() {
    return $("(//button[@data-slb-id='toggle-filters'])[5]");
  }
  get $WellFilter() {
    return $("//span[contains(text(),'Unspecified')]");
  }
  get $WellFilterSearch() {
    return $("(//div[contains(@class,'mat-form-field-wrapper')])[1]");
  }
  get $MoveCheckbox() {
    return $("//mat-checkbox[@data-slb-id='use-map-extents']");
  }
  get $Seismic2dHideBtn() {
    return $("(//button[@data-slb-id='toggle-layer'])[13]");
  }
  get $Seismic2dDropdown() {
    return $("(//button[@data-slb-id='toggle-filters'])[13]");
  }
  get $SeismicFilterSearch() {
    return $("//span[contains(text(),'New Zealand Petroleum')]");
  }
  get $SeismicFilterSearch2() {
    return $("//mat-chip[contains(text(),' NZ ')]");
  }
  get $Seismic3dHideBtn() {
    return $("(//button[@data-slb-id='toggle-layer'])[10]");
  }
  get $Seismic3dDropdown() {
    return $("(//button[@data-slb-id='toggle-filters'])[10]");
  }

  get $ProspectHideBtn() {
    return $("(//button[@data-slb-id='toggle-layer'])[16]");
  }
  get $ProspectDropdown() {
    return $("(//button[@data-slb-id='toggle-filters'])[16]");
  }
  get $ProspectSearchBox() {
    return $("(//input[@placeholder='Search attributes'])[5]");
  }
  get $ProspetLayer1() {
    return $("//span[text()=' 003/06A (1) ']");
  }
  get $ProspetLayer2() {
    return $("//span[contains(text(),' 003/13A (1) ')]");
  }
  get $ProspetLayer3() {
    return $("//span[contains(text(),' 003/23A (1) ')]");
  }
  get $ProspetLayer4() {
    return $("//span[contains(text(),' 003/23B (1) ')]");
  }
  get $ProspetLayer5() {
    return $("//span[contains(text(),' 003/24A (1) ')]");
  }
  get $filterResetbtn() {
    return $("//mat-icon[@svgicon='filter-reset']");
  }
  get $filterIcon() {
    return $("//a[@data-slb-id='show-all-filters-button']");
  }
  get $normalclick() {
    return $("//div[@class='layers-panel-header']");
  }
  get $nopreview() {
    return $("//mat-icon[@svgicon='no-preview']");
  }
  get $backLayerArrow() {
    return $("//a[@data-slb-id='side-panel-header-back-button']");
  }
  get $nofilterApplied() {
    return $("//p[text()='No filters are applied']");
  }
  get $removeLayer() {
    return $("//button[text()=' Remove ']");
  }
  get $close() {
    return $("//mat-icon[@svgicon='close']");
  }
}

module.exports = new Layers();
