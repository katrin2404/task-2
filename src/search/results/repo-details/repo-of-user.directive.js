(function () {

  'use strict';

  angular.module('search').directive('repoOfUser', function () {
    return {
      templateUrl: 'search/results/repo-details/repo-of-user.template.html',
      controller: 'RepoOfUserController',
      controllerAs: 'vm'
    }
  });
})();


