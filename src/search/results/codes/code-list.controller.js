(function () {

  'use strict';
  angular.module('search').controller('CodeListController', function ($state, $stateParams, CodesService, Pagination) {
    const vm = this;
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);
    vm.pageSize = Pagination.pageSize;
    vm.codes = [];
    vm.codesTotalCount = 0;
    vm.pageCount = 1;
    vm.limitPages = Pagination.limitPage;

    vm.init = init;
    vm.prevPage = prevPage;
    vm.nextPage = nextPage;

    init();

    function init() {
      vm.loading = true;
      return CodesService.search(vm.query, vm.page)
        .then(() => {
          vm.codesTotalCount = CodesService.total;
          vm.codes = CodesService.codes;
          vm.pageCount = Math.ceil(vm.codesTotalCount / vm.pageSize) || 1;
          if (vm.pageCount > vm.limitPages) {
            vm.pageCount = vm.limitPages;
          }
          vm.loading = false;
        });
    }

    function prevPage(){
      return $state.go('search.results.codes', ({query: vm.query, page: vm.page - 1}))
    }


    function nextPage(){
      return $state.go('search.results.codes', ({query: vm.query, page: vm.page + 1}))
    }


  })
})();
