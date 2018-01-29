(function () {

  'use strict';
  angular.module('search').controller('UserDetailsPageController', function ($scope, $stateParams, Pagination, UsersService) {
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

      return UsersService
        .loadDetails($stateParams.query, page, position)
        .then((user) => {
          vm.user = user;
          vm.total = UsersService.total;
          if (vm.total > vm.limitElements) {
            vm.total = vm.limitElements;
          }
          vm.page = page;
        });
    }
  })
})();
