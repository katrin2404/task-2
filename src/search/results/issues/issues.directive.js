(function () {

  'use strict';

  angular.module('search').directive('issueList', function () {
    return {
      templateUrl: 'search/results/issues/issue-list.template.html',
      controller: 'IssueListController',
      controllerAs: 'vm'
    }
  });
})();




