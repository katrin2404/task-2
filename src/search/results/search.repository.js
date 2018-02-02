(function () {

  'use strict';

  angular.module('search').factory('SearchRepository', function ($http, ApiUrls, Config, Pagination) {
    return {
      search,
      loadReposByUser,
      loadDetails,
    };

    function search(entity, query, page = 1) {
      return $http
        .get(`${ApiUrls.baseUrl}/search/${Config[entity].route}`, {
          params: {
            page,
            q: Config[entity].query(query),
            per_page: Pagination.pageSize,
          },
        })
        .then(response => response.data);
    }

    function loadReposByUser(userName) {
      return $http
        .get(`${ApiUrls.baseUrl}/users/${userName}/repos`)
        .then(response => response.data);
    }

    function loadDetails(entity, entityKey) {
      return $http
        .get(`${ApiUrls.baseUrl}/${Config[entity].route}/${entityKey}`)
        .then(response => response.data);
    }

  });

})();
