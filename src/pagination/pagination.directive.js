(function () {

  'use strict';

  angular.module('pagination').directive('pagination', function () {
    return {
      templateUrl: 'pagination/pagination.template.html',
      controller: 'PaginationController',
      controllerAs: 'vm',
    };
  });
})();




