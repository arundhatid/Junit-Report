class Layers{
    get $showLayers(){
        return $('button.layericon')
    }
    get $layersTitle(){
        return $('div[class="layers-panel-header"] h2')
    }
    get $filterSummary(){
        return $('[data-slb-id="show-all-filters-button"]')
    }
    get $clearAllFilters(){
        return $('data-slb-id="clear-all-filters-button"')
    }
    get $globalHideLayersBtn(){
        return $('[data-slb-id="turn-off-all-layers-button"]')
    }
    get $globalUnHideLayersBtn(){
        return $('[data-slb-id="turn-on-all-layers-button"]')
    }
    get $closeLayersBtn(){
        return $('mat-icon[data-mat-icon-name="close"]')
    }
    get $WellLayer(){
        return $('mat-icon[data-mat-icon-name="Well"]')
    }
    get $FieldLayer(){
        return $('mat-icon[data-mat-icon-name="field"]')
    }
    get $BasinLayer(){
        return $('mat-icon[data-mat-icon-name="basin"]')
    }
    get $WellLayerHideBtn(){
        return $("(//mat-icon[@role='img'])[19]")
    }
    get $WellLayerDropdown(){
        return $("div[class='layer-item-buttons'] div[class='toggle-filters-and-loading'] mat-icon[role='img']")
    }
    get $WellFilterSearch(){
        return $("(//div[contains(@class,'mat-form-field-wrapper')])[1]")
    }
    get $MoveCheckbox(){
        return $("(//span[@class='mat-checkbox-inner-container'])[2]")
    }
   

}
module.exports=new Layers()