(function () {

  'use strict';

  angular.module('search').factory('ReposRepository', function ($http, ApiUrls, Pagination) {
    return {
      search,
      loadByUser,
      loadDetails,
    };

    function search(query, page = 1) {
      return $http
        .get(`${ApiUrls.baseUrl}/search/repositories`, {
          params: {
            page,
            q: `${query} in:name`,
            per_page: Pagination.pageSize,
          },
        })
        .then(response => response.data);
    }

    function loadByUser(userName) {
      return $http
        .get(`${ApiUrls.baseUrl}/users/${userName}/repos`)
        .then(response => response.data);
    }

    function loadDetails(repoId) {
      return $http
        .get(`${ApiUrls.baseUrl}/repositories/${repoId}`)
        .then(response => response.data);
    }

  });

})();
