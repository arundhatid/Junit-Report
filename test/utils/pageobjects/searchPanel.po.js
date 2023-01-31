class SearchPanel {
    get $searchBox() {
        return $('input[id="gisSearch"]');

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
    get $firstSearchResults() {
        return $('(//div[@class="search-item-row"]/div)[1]')
    }
    get $crossResult() {
        return $("//mat-icon[@svgicon='close']")
    }
}
module.exports = new SearchPanel();