(function () {

  'use strict';

  angular.module('search').directive('repoDetailsPage', function () {
    return {
      templateUrl: 'search/results/repo-details/repo-details-page.template.html',
      controller: 'RepoDetailsPageController',
      controllerAs: 'vm'
    }
  });
})();


