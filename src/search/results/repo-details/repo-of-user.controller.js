(function () {

  'use strict';
  angular.module('search').controller('RepoOfUserController', function ($scope, $stateParams, ReposRepository) {
    const vm = this;
    vm.position = Number($stateParams.position);
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);


    init();

    function init() {
      const repoId = $stateParams.repoId;
      return ReposRepository
        .loadDetails(repoId)
        .then((repo) => {
          vm.repo = repo;
        });
    }
  })
})();
