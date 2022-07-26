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

}
module.exports=new Layers()