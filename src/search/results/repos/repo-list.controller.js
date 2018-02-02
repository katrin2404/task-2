(function () {

  'use strict';
  angular.module('search').controller('RepoListController', function ($state, $stateParams, Pagination, ReposService) {
    const vm = this;
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);
    vm.pageSize = Pagination.pageSize;
    vm.repos = [];
    vm.reposTotalCount = 0;
    vm.pageCount = 1;
    vm.limitPages = Pagination.limitPage;
    vm.orderProp = '';

    vm.init = init;
    vm.getRepoPosition = getRepoPosition;
    vm.prevPage = prevPage;
    vm.nextPage = nextPage;


    init();

    function init() {
      vm.loading = true;
      return ReposService.search(vm.query, vm.page)
        .then(() => {
          vm.reposTotalCount = ReposService.total;
          vm.repos = ReposService.repos;
          vm.pageCount = Math.ceil(vm.reposTotalCount / vm.pageSize) || 1;
          if (vm.pageCount > vm.limitPages) {
            vm.pageCount = vm.limitPages;
          }
          vm.loading = false;
        });
    }

    function getRepoPosition(index) {
      return (vm.page - 1) * vm.pageSize + index + 1;
    }

    function prevPage() {
      return $state.go('search.results.repos', {query: vm.query, page: vm.page - 1});
    }

    function nextPage() {
      return $state.go('search.results.repos', {query: vm.query, page: vm.page + 1});
    }

  })
})();
