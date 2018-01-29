(function () {

  'use strict';

  angular.module('search').factory('UsersRepository', function ($http, ApiUrls, Pagination) {

    return {
      search,
      loadDetails,
    }
      ;

    function search(query, page = 1) {
      return $http
        .get(`${ApiUrls.baseUrl}/search/users`, {
          params: {
            page,
            q: `${query} in:login`,
            per_page: Pagination.pageSize,
          },
        })
        .then(response => response.data);
    }

    function loadDetails(userName) {
      return $http
        .get(`${ApiUrls.baseUrl}/users/${userName}`)
        .then(response => response.data);
    }

  })
})();
