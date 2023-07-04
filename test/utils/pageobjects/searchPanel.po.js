class SearchPanel {
    get $searchBox() {
       // return $('input[id="gisSearch"]');
       return $("//gis-search-box[@data-slb-id='search-box']");

    }
     get $flexBox(){
         return $("//div[@class='flexbox-row-outer']")
     }
    get $searchIcon() {
        return $("//mat-icon[@svgicon='search']")
    }
    get $checkbox() {
        return $('input[class="mat-checkbox-input cdk-visually-hidden"]')
    }
    get $searchResults() {
        return $$('div[class="search-item-row"]')
    }
    get $totalSearchCount() {
        return $$("(//div[@class='search-icon-label'])[1]")
    }
    get $firstSearchResults() {
        return $('(//div[@class="search-item-row"]/div)[1]')
    }
    get $zoomToExtends() {
        return $('(//mat-icon[@data-slb-id="zoomToExtents"])[1]')
    }
    get $crossResult() {
        return $("//mat-icon[@svgicon='close']")
        //return $("//a[@data-slb-id='side-panel-header-close-button']")
    }
    get $noMatchingResults() {
        return $("(//div[@class='gis-no-matching-results'])[1]")
    }
    // get $backToResults() {
    //     return $("//span[text()='Back to group results']")
    // }
    get $backToResults() {
             return $("//mat-icon[contains(@svgicon,'arrow-left-3')]")
         }
    get $filterAvailableCollectionsProjects () {
        return $("(//pioneer-async-icon[@data-slb-id='available-collections-btn'])[1]")
        
    }
    get $sidePanel () {
        //return $("//pioneer-resizable-container[@class='ng-star-inserted']")
        return $("//div[@data-slb-id='side-panel-header-actions-toggle-hidden']")
    }
    
}
module.exports = new SearchPanel();