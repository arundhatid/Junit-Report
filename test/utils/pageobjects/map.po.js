//const { default: $ } = require("webdriverio/build/commands/browser/$");

class Map{

    get $infoBox(){
        return $('section[class="sticky ng-star-inserted"]');
    }
    get $infoIcon(){
        return $('mat-icon[data-mat-icon-name="info"]');
    }
    get $closeIcon(){
        return $('mat-icon[data-mat-icon-name="close"]');
    }
    get $searchBox(){
        return $('#gisSearch');
    }
    get $infoBox(){
        return $('section[class="sticky"]');
    }
    get $zoomToWorldView(){
        return $('svg[id="Layer_1"]');
    }
    get $map(){
        return $('#MLSvg1002');
    }
    get $rectSelect(){
        return  $('mat-icon[data-mat-icon-name="rectangle-selection"]');
    }
    get $collectionTray(){
        //return $('button[data-slb-id="collection-tray-pin"]')
        return $("//button[normalize-space()='Collections']")
    }
    
}
module.exports=new Map();