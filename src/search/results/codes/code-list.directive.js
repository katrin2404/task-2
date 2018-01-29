(function () {

  'use strict';

  angular.module('search').directive('codeList', function () {
    return {
      templateUrl: 'search/results/codes/code-list.template.html',
      controller: 'CodeListController',
      controllerAs: 'vm'
    }
  });
})();




