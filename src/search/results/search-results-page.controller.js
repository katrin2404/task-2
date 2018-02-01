(function () {

  'use strict';
  angular.module('search').controller('SearchResultsPageController', function ($http, $q, $scope, $state, $stateParams, $transitions, CodesService, IssuesService, ReposService, UsersService) {
    const vm = this;

    vm.reposTotalCount = 0;
    vm.usersTotalCount = 0;
    vm.issuesTotalCount = 0;
    vm.codesTotalCount = 0;

    $http.get('resultOfQuery.json').then(function (response) {
      console.log(response);
      vm.results = response.data;
    });

    const cancel = $transitions.onStart({}, handleTransition);
    $scope.$on('$destroy', () => {
      cancel();
    });


    init();

    function init() {
      vm.loading = true;
      initParams();

      return $q
        .all({
          users: refreshUsers(),
          repos: refreshRepos(),
          issues: refreshIssues(),
          codes: refreshCodes(),
        })
        .finally(() => {
          vm.loading = false;
        });
    }

    function initParams() {
      vm.query = $stateParams.query;
      vm.page = Number($stateParams.page);
    }

    function refreshUsers() {
      return UsersService
        .search(vm.query, vm.page)
        .then(() => {
          vm.usersTotalCount = UsersService.total;
        });
    }

    function refreshRepos() {
      return ReposService
        .search(vm.query, vm.page)
        .then(() => {
          vm.reposTotalCount = ReposService.total;
        });
    }

    function refreshIssues() {
      return IssuesService
        .search(vm.query, vm.page)
        .then(() => {
          vm.issuesTotalCount = IssuesService.total;
        });
    }

    function refreshCodes() {
      return CodesService
        .search(vm.query, vm.page)
        .then(() => {
          vm.codesTotalCount = CodesService.total;
        });
    }

    function handleTransition(transition) {
      transition.promise.finally(() => {
        if (vm.query !== $stateParams.query) {
          init();
        } else {
          vm.loading = true;
          initParams();
          let promise = $q.resolve();
          switch ($state.current.name) {
            case 'search.results.users':
              promise = refreshUsers();
              break;
            case 'search.results.repos':
              promise = refreshRepos();
              break;
            case 'search.results.issues':
              promise = refreshIssues();
              break;
            case 'search.results.codes':
              promise = refreshCodes();
              break;
          }
          promise.finally(() => {
            vm.loading = false;
          });
        }
      });
    }

  })
})();
