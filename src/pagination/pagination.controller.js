(function () {
  'use strict';
  angular.module('pagination').controller('PaginationController', function () {
    const vm = this;
    vm.nextDisabled = () => vm.page === vm.pageCount;
    vm.prevDisabled = () => vm.page === 1;
    vm.showPagination = () => vm.pageCount > 1 && !vm.loading;
  })
})();


