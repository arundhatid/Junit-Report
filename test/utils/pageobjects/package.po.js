class Package {
  get $dateTime() {
    return $("//mat-icon[@data-mat-icon-name='datetime']");
  }
  get $createdBY() {
    return $("//span[@class='creator']");
  }
  get $wellIcon() {
    return $("//mat-icon[@data-mat-icon-name='Well']");
  }
  get $2DlineIcon() {
    return $("//mat-icon[@data-mat-icon-name='2d-line']");
  }
  get $3DSurveyIcon() {
    return $("//mat-icon[@data-mat-icon-name='3d-survey']");
  }
  get $other() {
    return $("(//mat-icon[@data-mat-icon-name='more'])[2]");
  }
  get $activeCardCount() {
    return $(
      "//span[@class='mdc-evolution-chip__text-label mat-mdc-chip-action-label'][normalize-space()='1']"
    );
  }
}

module.exports = new Package();
