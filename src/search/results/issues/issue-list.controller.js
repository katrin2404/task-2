(function () {

  'use strict';
  angular.module('search').controller('IssueListController', function ($state, $stateParams, IssuesService, Pagination) {
    const vm = this;
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);
    vm.pageSize = Pagination.pageSize;
    vm.issues = [];
    vm.issuesTotalCount = 0;
    vm.pageCount = 1;
    vm.limitPages = Pagination.limitPage;

    vm.init = init;
    vm.prevPage = prevPage;
    vm.nextPage = nextPage;

    init();

    function init() {
      vm.loading = true;
      return IssuesService.search(vm.query, vm.page)
        .then(() => {
          vm.issuesTotalCount = IssuesService.total;
          vm.issues = IssuesService.issues;
          vm.pageCount = Math.ceil(vm.issuesTotalCount / vm.pageSize) || 1;
          if (vm.pageCount > vm.limitPages) {
            vm.pageCount = vm.limitPages;
          }
          if (vm.pageCount > vm.limitPages) {
            vm.pageCount = vm.limitPages;
          }
          vm.loading = false;
        });
    }

    function prevPage() {
      return $state.go('search.results.issues', {query: vm.query, page: vm.page - 1});
    }

    function nextPage() {
      return $state.go('search.results.issues', {query: vm.query, page: vm.page + 1});
    }

  })
})();
