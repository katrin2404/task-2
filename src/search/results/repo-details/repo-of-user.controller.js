(function () {

  'use strict';
  angular.module('search').controller('RepoOfUserController', function ($scope, $stateParams, SearchRepository) {
    const vm = this;
    vm.position = Number($stateParams.position);
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);


    init();

    function init() {
      const repoId = $stateParams.repoId;
      return SearchRepository
        .loadDetails('repos', repoId)
        .then((repo) => {
          vm.repo = repo;
        });
    }
  })
})();
