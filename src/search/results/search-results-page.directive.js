(function () {

  'use strict';

  angular.module('search').directive('searchResultsPage', function () {
    return {
      controller: 'SearchResultsPageController',
      templateUrl: 'search/results/search-results-page.template.html',
      controllerAs: 'vm',
    }
  });
})();
