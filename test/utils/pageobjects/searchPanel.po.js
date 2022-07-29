class SearchPanel{
    get $searchBox(){
        return $('input[id="gisSearch"]');

    }
    get $searchResults(){
        return $('div[class="search-icon-label"]')
    }
    get $searchIcon(){
        return $('[data-mat-icon-name="search"] svg')
    }
    get $checkbox(){
        return $('input[class="mat-checkbox-input cdk-visually-hidden"]')
    }
}
module.exports=new SearchPanel();