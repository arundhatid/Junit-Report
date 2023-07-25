class Viewer {
  get $closeCrossHairTool() {
    return $(
      "//button[@class='crosshair-readouts__button crosshair-readouts__button--close']"
    );
  }
  get $closeViewer() {
    return $("(//mat-icon[@svgicon='close'])[2]");
  }
}

module.exports = new Viewer();
