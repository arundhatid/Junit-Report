class SearchPanel {
  get $searchBox() {
    return $("//gis-search-box[@data-slb-id='search-box']");
  }
  get $flexBox() {
    return $("//div[@class='flexbox-row-outer']");
  }
  get $searchIcon() {
    return $("//mat-icon[@svgicon='search']");
  }
  get $checkbox() {
    return $('input[class="mat-checkbox-input cdk-visually-hidden"]');
  }
  get $searchResults() {
    return $$('div[class="search-item-row"]');
  }
  get $totalSearchCount() {
    return $$("(//div[@class='search-icon-label'])[1]");
  }
  get $firstSearchResults() {
    return $('(//div[@class="search-item-row"]/div)[1]');
  }
  get $1stresultFromfirstSearchResults() {
    return $(
      "//gis-search-result-header[1]//section[1]//div[1]//div[1]//img[1]"
    );
  }

  get $2ndSearchResults() {
    return $("(//div[@class='search-item-row']/div)[2]");
  }
  get $3rdSearchResults() {
    return $("(//div[@class='search-item-row']/div)[3]");
  }
  get $4thSearchResults() {
    return $("(//div[@class='search-item-row']/div)[4]");
  }
  get $5thSearchResults() {
    return $("(//div[@class='search-item-row']/div)[5]");
  }

  get $1stSearchResultsText() {
    return $("(//label[@class='ng-star-inserted'])[1]");
  }
  get $2ndSearchResultsText() {
    return $("(//label[@class='ng-star-inserted'])[2]");
  }
  get $3rdSearchResultsText() {
    return $("(//label[@class='ng-star-inserted'])[3]");
  }
  get $4thSearchResultsText() {
    return $("(//label[@class='ng-star-inserted'])[4]");
  }
  get $5thSearchResultsText() {
    return $("(//label[@class='ng-star-inserted'])[5]");
  }
  get $zoomToExtends() {
    return $('(//mat-icon[@data-slb-id="zoomToExtents"])[1]');
  }
  get $crossResult() {
    return $("//mat-icon[@svgicon='close']");
  }
  get $noMatchingResults() {
    return $("(//div[@class='gis-no-matching-results'])[1]");
  }

  get $backToResults() {
    return $("//mat-icon[contains(@svgicon,'arrow-left-3')]");
  }
  get $filterAvailableCollectionsProjects() {
    return $(
      "(//pioneer-async-icon[@data-slb-id='available-collections-btn'])[1]"
    );
  }
  get $sidePanel() {
    return $("//div[@data-slb-id='side-panel-header-actions-toggle-hidden']");
  }
  get $backOrClose() {
    return $("//a[starts-with(@data-slb-id,'side-panel-header')]");
  }
}
module.exports = new SearchPanel();
