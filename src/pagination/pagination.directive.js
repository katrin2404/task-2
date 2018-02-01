(function () {

  'use strict';

  angular.module('pagination').directive('pagination', function () {
    return {
      templateUrl: 'pagination/pagination.template.html',
      controller: 'PaginationController',
      scope: true,
      controllerAs: 'vm',
      bindToController: {
        nextPage: '&',
        prevPage: '&',
        page: '=',
        pageCount: '=',
        loading: '=',
      },
    };
  });
})();




