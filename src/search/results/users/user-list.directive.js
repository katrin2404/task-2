(function () {

  'use strict';

  angular.module('search').directive('userList', function () {
    return {
      templateUrl: 'search/results/users/user-list.template.html',
      controller: 'UserListController',
      controllerAs: 'vm',
    };
  });
})();




