class Collections {
    // get $actions(){
    //     return $('div[class="action-button"]')
    // }
    get $Add() {
        return $('[data-mat-icon-name="add-new-job"]')
    }
    get $Actions() {
        return $("//span[text()=' Actions ']")
    }
    get $newCollection() {
        return $("//span[contains(text(),'New Collection')]")
    }
    get $activeCollections() {
        return $("//span[text()='Active Collection']")
    }
    get $removeFrom() {
        return $("//span[text()='Remove From']")
    }
    get $titleCollection() {
        return $('[id="mat-input-0"]')
    }
    get $descriptionCollection() {
        return $('[id="1"]')
    }
    get $activeCheck() {
        return $('[tabindex="0"]')
    }
    get $collectionName() {
        return $('(//form//input)[1]')
    }
    get $collectionDiscreption() {
        return $('(//form//input)[2]')
    }
    get $checkBox() {
        return $("(//span[@class='mat-checkbox-inner-container'])[3]")
    }
    get $saveButton() {
        return $("//span[normalize-space()='Save']")
    }
    get $collectionTray() {
        return $("//button[@class='button-pin-tray']")
    }
    get $closeCollectionTray() {
        return $("//button[@class='button-pin-tray is-open']")
    }
    get $deletButton() {
        return $("//button[text()='Delete']")
    }

}
module.exports = new Collections()