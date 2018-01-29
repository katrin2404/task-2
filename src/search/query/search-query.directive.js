(function () {

  'use strict';

  angular.module('search').directive('searchQuery', function () {
    return {
      templateUrl: 'search/query/search-query.template.html',
      controller: 'SearchQueryController',
      controllerAs: 'vm',
    };
  });

})();

