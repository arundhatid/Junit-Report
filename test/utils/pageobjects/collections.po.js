class Collections{
    // get $actions(){
    //     return $('div[class="action-button"]')
    // }
    get $Add(){
        return $('[data-mat-icon-name="add-new-job"]')
    }
    get $Actions(){
        return $('[data-mat-icon-name="drag"]')
    }
    get $newCollection(){
        return $("//span[contains(text(),'New Collection')]")
    }
    get $activeCollections(){
        return $('data-slb-id="clear-all-filters-button"')
    }
    get $removeFrom(){
        return $('[data-slb-id="turn-off-all-layers-button"]')
    }
    get $titleCollection(){
        return $('[id="mat-input-0"]')   
    }
    get $descriptionCollection(){
        return $('[id="1"]')   
    }
    get $activeCheck(){
        return $('[tabindex="0"]')   
    }  

}
module.exports=new Collections()