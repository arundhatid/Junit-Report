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
  get $ProspectFilterSearch() {
    return $("//mat-chip[contains(text(),'IHS')]");
  }
  get $filterResetbtn() {
    return $("//a[@data-slb-id='clear-all-filters-button']");
  }
  get $filterIcon() {
    return $("//a[@data-slb-id='show-all-filters-button']");
  }
}

module.exports = new Layers();
