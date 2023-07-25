class Canvas {
  get $canvasZoomPlus() {
    return $("(//button[@class='mat-mdc-tooltip-trigger inline'])[7]");
  }
  get $canvasZoomminus() {
    return $("(//button[@class='mat-mdc-tooltip-trigger inline'])[8]");
  }
  get $willboreViewerCanvas() {
    return $("//slb-wellbore-logviewer[@data-slb-id='wellbore-logviewer']");
  }
  get $noMarkers() {
    return $("//slb-dropdown[@attr.data-slb-id='marker-set-dropdown']");
  }
  get $noZones() {
    return $("//slb-dropdown[@attr.data-slb-id='zone-set-dropdown']");
  }
  get $MD() {
    return $("//span[contains(text(),'MD')]");
  }
  get $TVD() {
    return $("//span[contains(text(),'TVD')]");
  }
  get $alignMarkers() {
    return $("//mat-button-toggle[@attr.data-slb-id='align-wells-button']");
  }
  get $autoFitCanvas() {
    return $("//mat-button-toggle[@attr.data-slb-id='fit-to-bounds-toggle']");
  }

  get $LQC() {
    return $("//mat-button-toggle[@attr.data-slb-id='display-template-list']");
  }
  get $indexProperties() {
    return $("//button[@data-slb-id='edit-index-properties']");
  }
  get $indexTrackProperties() {
    return $("//button[@data-slb-id='edit-index-properties']");
  }
  get $inch() {
    return $("//span[text()='inch']");
  }
  get $feet() {
    return $("//span[contains(text(),'feet')]");
  }
  get $custom() {
    return $("//span[contains(text(),'Custom')]");
  }
  get $edit() {
    return $(
      "//mat-button-toggle[@attr.data-slb-id='property-editor-parameters']"
    );
  }
  get $currentParameter() {
    return $("//span[text()='Current template']");
  }
  get $LQCChnageBtn() {
    return $("(//div[@class='manage-template-button'])[1]");
  }
  get $saveAsBtn() {
    return $("//mat-icon[@svgicon='save-as']");
  }
  get $showAllBtn() {
    return $("//span[contains(text(),'Show all')]");
  }
  get $hideAllBtn() {
    return $("//span[contains(text(),'Hide all')]");
  }
  get $myTemplates() {
    return $("//span[normalize-space()='My templates']");
  }
  get $shareWithMe() {
    return $("//span[contains(text(),'Shared with me')]");
  }
  get $uploadIcon() {
    return $("//span[@class='upload-text']");
  }
  get $bufferRadiusClose() {
    return $("(//mat-icon[@svgicon='close'])[2]");
  }
  get $errorMessage() {
    return $("//div[text()='100 selected items. The limit is 40.']");
  }
  get $closeCanvas() {
    return $(
      "//pioneer-resizable-container[@class='ng-star-inserted']//mat-icon[2]"
    );
  }
  get $closelogViewer() {
    return $("(//mat-icon[@svgicon='close'])[3]");
  }
}

module.exports = new Canvas();
