class Collections {
    
  get $Add() {
    return $("//mat-icon[starts-with(@data-mat-icon-name,'add')]");
  }
    get $Actions() {
        return $("//span[text()=' Actions ']")
    }
    //**** */
    get $collectionMenu() {
        return $("(//span[@class='mdc-list-item__primary-text'])[1]")
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
    get $wellbore() {
        return $("//mat-icon[@data-mat-icon-name='log-set']")
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
        return $("//label[contains(text(),'Make Active')]")
    }
    get $saveButton() {
        return $("//button[@data-slb-id='confirm']")
        
    }
    get $collectionTray() {
        return $("//mat-icon[@class='mat-icon notranslate arrow mat-icon-no-color']")
    }
     get $closeCollectionTray() {
         return $("//button[@data-slb-id='collection-tray-pin']")
     }
     get $collectionTrayContainer() {
        return $("//section[@class='collection-tray-container ng-star-inserted is-open']")
    }
    get $deletButton() {
        return $("//button[@data-slb-id='delete']")
    }
    get $activeCollCheckBox() {
        return $("(//mat-icon[@data-mat-icon-name='arrow-left-5'])[2]")
    }
    get $focusMode() {
        return $("//button[@data-slb-id='focus-view-mode']")
    }
    get $overlapMode() {
        return $("//button[@data-slb-id='overlap-view-mode']")
    }
    get $uniqueMode() {
        return $("//button[@data-slb-id='unique-view-mode']")
    }
    get $excludeMode() {
        return $("//button[@data-slb-id='exclude-view-mode']")
    }
    get $collSearchBox() {
        return $("input[placeholder='Start Typing...']")
    }
    get $collSearchIcon() {
        return $("//button[@aria-label='search']")
    }
    get $collClearSearch() {
        return $("//button[@aria-label='Clear']")
    }
    get $textSearchColl() {
        return $("//mat-card[@class='mat-card mat-focus-indicator collection-container']//h6[@class='mat-tooltip-trigger']")
    }
    get $avaliableColl() {
        return $("(//div[@class='available-cards-container ng-star-inserted']//div[@class='collection-container__header'])[1]")
    }
    get $activeCardColl() {
        return $("(//div[@class='active-cards ng-star-inserted']//div[@class='collection-container__header'])[1]")
    }
    get $customChip() {
        return $("//div[@class='custom-chip__text']")
    }
    get $collectionChip() {
      return $("//mat-chip[@data-slb-id='collection-filter-chip']")
        
    }
    get $projectChip() {
        return $("//mat-chip[@data-slb-id='projects-filter-chip']")
           
      }
    get $closeCustomChip() {
        return $("//mat-icon[@data-slb-id='close-record']")
    }
    
    get $noCollAvl() {
        return $("//div[@class='title ng-star-inserted']")
    }
    get $collectionIcon() {
        return $("//div[@class='title ng-star-inserted']")
    }
    get $modeViewToolbar() {
        return $("//div[@class='mode-view-toolbar']")
    }
    get $eyeUnhideIcon() {
        return $("//mat-icon[@data-slb-id='mat-icon-hide']")
    }
    get $RemoveItems() {
      return $("//button[@data-slb-id='remove']")
  }
  get $AddItems() {
    return $("//button[@data-slb-id='add']")
}

}
module.exports = new Collections();
