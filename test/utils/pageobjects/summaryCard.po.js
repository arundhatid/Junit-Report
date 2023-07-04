class SummaryCard {
  get $seismicFirstCard() {
    return $("(//mat-card-header)[1]");
  }
  get $thumbnailImageContainer() {
    return $("//div[@class='gis-thumbnail-image-container']");
  }
  get $open2DViewer() {
    return $("//mat-icon[@title='Open 2D Viewer']/span");
  }
  get $2DViewerBtn() {
    return $(
      "//div[@class='button-holder']//mat-icon[@title='Open 2D Viewer']"
    );
  }
  get $viz2DViewercanvas() {
    return $("//div[@class='viz2d-viewer']//canvas");
  }
  get $resetview() {
    return $("//button[@data-slb-id='FitToWindow']");
  }
  get $resetAllsetting() {
    return $("//mat-icon[@data-mat-icon-name='refresh']");
  }
  get $rubberBandTool() {
    return $("//button[@data-slb-id='RubberBand']");
  }
  get $panningTool() {
    return $("//button[@data-slb-id='Panning']");
  }
  get $crossHairTool() {
    return $("//button[@data-slb-id='cross-hair']");
  }
  get $headersGrids() {
    return $("//button[@data-slb-id='HeadersGrid']");
  }
  get $headersGridClose() {
    return $("(//button[@class='mat-mdc-tooltip-trigger inline active'])[2]");
  }
  get $scale() {
    return $("//span[@class='select__label ng-star-inserted']");
  }
  get $scaleDropDwn() {
    return $("//mat-select[@data-slb-id='scale-select']");
  }
  get $scalevalue1() {
    return $("//span[text()='0.3']");
  }
  get $scalevalue2() {
    return $("//span[text()='0.5']");
  }
  get $colourChanging() {
    return $("//mat-select-trigger[@class='ng-tns-c101-132 ng-star-inserted']");
  }
  get $colourChangingDropDwn() {
    return $("//mat-select[@data-slb-id='colormap-color_map_select']");
  }

  get $selectColour() {
    return $("//img[@alt='WhiteBlack']");
  }

  get $sliceButton() {
    return $("//button[@data-slb-id='GoToSlice']");
  }
  get $pointDetails() {
    return $("//ul[@class='ng-star-inserted']");
  }
  get $Trace() {
    return $("//span[normalize-space()='Trace #:']");
  }
  get $ViewerFullScreen() {
    return $("//mat-icon[@data-slb-id='viewer-screen-size']");
  }
  get $sliceClickPopUp() {
    return $(
      "(//div[@class='ng-star-inserted']//div[@class='ng-star-inserted'])[2]"
    );
  }
  get $filterSummary3D() {
    return $("(//label[@class='ng-star-inserted'])[1]");
  }
  get $filterSummary2D() {
    return $("(//label[@class='ng-star-inserted'])[2]");
  }
  get $gainDecrease() {
    return $("//div[@class='mdc-slider__tick-marks ng-star-inserted']//div[2]");
  }
  get $gainIncrease() {
    return $(
      "//div[@class='mdc-slider__tick-marks ng-star-inserted']//div[80]"
    );
  }
  get $wellboreViewerBtn() {
    return $("(//mat-icon[@title='Open Wellbore in Log Viewer'])[1]");
  }

  //div[@class='gis-thumbnail-image-container']
}

module.exports = new SummaryCard();
