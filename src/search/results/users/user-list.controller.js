(function () {


  'use strict';
  angular.module('search').controller('UserListController', function ($state, $stateParams, Pagination, UsersService) {
    const vm = this;
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);
    vm.pageSize = Pagination.pageSize;
    vm.users = [];
    vm.usersTotalCount = 0;
    vm.pageCount = 1;
    vm.limitPages = Pagination.limitPage;
    vm.init = init;

    vm.getUserPosition = getUserPosition;


    init();

    function init() {
      return UsersService.search(vm.query, vm.page)
        .then(() => {
          vm.usersTotalCount = UsersService.total;
          vm.users = UsersService.users;
          vm.pageCount = Math.ceil(vm.usersTotalCount / vm.pageSize) || 1;
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


