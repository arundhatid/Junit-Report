class Collections{
    get $actions(){
        return $('div[class="action-button"]')
    }
    get $addTo(){
        return $('button[mattooltip="Add to"]')
    }
    get $newCollection(){
return $('[data-slb-id="show-all-filters-button"]')
    }
    get $activeCollections(){
return $('data-slb-id="clear-all-filters-button"')
    }
    get $removeFrom(){
        return $('[data-slb-id="turn-off-all-layers-button"]')
    }
}
module.exports=new Collections()