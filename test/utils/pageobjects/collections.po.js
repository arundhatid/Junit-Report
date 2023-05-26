class Collections {
  // get $actions(){
  //     return $('div[class="action-button"]')
  // }
  get $Add() {
    return $('[data-mat-icon-name="add-new-job"]');
  }
  get $Actions() {
    return $("//span[text()=' Actions ']");
  }
  get $collectionMenu() {
    return $("(//span[@class='mdc-list-item__primary-text'])[1]");
  }
  get $newCollection() {
    return $("(//mat-icon[@data-mat-icon-name='list'])[1]");
  }
  get $activeCollections() {
    return $("//span[text()='Active Collection']");
  }
  get $removeFrom() {
    return $("//span[text()='Remove From']");
  }
  get $titleCollection() {
    return $('[id="mat-input-0"]');
  }
  get $descriptionCollection() {
    return $('[id="1"]');
  }
  get $activeCheck() {
    return $('[tabindex="0"]');
  }
  get $collectionName() {
    return $("(//form//input)[1]");
  }
  get $collectionDiscreption() {
    return $("(//form//input)[2]");
  }
  get $checkBox() {
    return $("//label[contains(text(),'Make Active')]");
  }
  get $saveButton() {
    return $("//button[@data-slb-id='confirm']");
  }
  get $collectionTray() {
    return $("//button[@class='button-pin-tray']");
  }
  get $closeCollectionTray() {
    return $("//button[@class='button-pin-tray is-open']");
  }
  get $deletButton() {
    return $("//button[@data-slb-id='delete']");
  }
}
module.exports = new Collections();
