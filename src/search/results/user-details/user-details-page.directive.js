(function () {

  'use strict';

  angular.module('search').directive('userDetailsPage', function () {
    return {
      templateUrl: 'search/results/user-details/user-details-page.template.html',
      controller: 'UserDetailsPageController',
      controllerAs: 'vm'
    }
  });
})();


