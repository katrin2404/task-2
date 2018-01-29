(function () {

  'use strict';

  angular.module('search').directive('repoList', function () {
    return {
      templateUrl: 'search/results/repos/repo-list.template.html',
      controller: 'RepoListController',
      controllerAs: 'vm'
    }
  });
})();




