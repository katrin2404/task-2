(function () {

  'use strict';
  angular.module('search').controller('RepoDetailsPageController', function ($stateParams, Pagination, ReposService) {
    const vm = this;
    vm.pageSize = Pagination.pageSize;
    vm.total = 0;
    vm.position = Number($stateParams.position);
    vm.page = Number($stateParams.page);
    vm.query = $stateParams.query;
    vm.limitElements = Pagination.limitPage * Pagination.coefficientDetails;


    init();

    function init() {
      const page = Math.ceil($stateParams.position / vm.pageSize);
      const position = ($stateParams.position - 1) % vm.pageSize;

      return ReposService
        .loadDetails($stateParams.query, page, position)
        .then((repo) => {
          vm.repo = repo;
          vm.total = ReposService.total;
          if (vm.total > vm.limitElements) {
            vm.total = vm.limitElements;
          }
          vm.page = page;
        });
    }

  })
})();
