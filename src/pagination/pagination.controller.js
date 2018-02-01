(function () {


  'use strict';
  angular.module('pagination').controller('PaginationController', function ($state, $stateParams, Pagination, UsersService) {
    const vm = this;
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);
    vm.pageSize = Pagination.pageSize;
    vm.arraySearch = [];
    vm.pageCount = 1;
    vm.limitPages = Pagination.limitPage;
    vm.changePage = changePage;
    vm.service = UsersService;
    vm.init = init;

    function changePage(path, k) {
      $state.go(path, {query: vm.query, page: vm.page + k});
    }

    init();

    function init() {
      console.log(UsersService);
      return vm.service.search(vm.query, vm.page)
        .then(() => {
          vm.elTotalCount = vm.service.total;
          vm.users = vm.service.users;
          vm.pageCount = Math.ceil(vm.elTotalCount / vm.pageSize) || 1;
          if (vm.pageCount > vm.limitPages) {
            vm.pageCount = vm.limitPages;
          }
        });
    }

    function getUserPosition(index) {
      return (vm.page - 1) * vm.pageSize + index + 1;
    }

  })
})();


