(function () {

  'use strict';
  angular.module('search').controller('SearchQueryController', [
    '$state', '$stateParams',
    function ($state, $stateParams) {
      const vm = this;
      vm.query = $stateParams.query;
      vm.showResults = showResults;
      function showResults() {
        $state.go('search.results.users', {query: vm.query, page: null});
      }
    }
  ]);

})();
