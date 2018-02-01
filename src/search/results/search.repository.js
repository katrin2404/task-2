(function () {

  'use strict';

  angular.module('search').factory('SearchRepository', function ($http, ApiUrls, Pagination) {
    const config = {
      users: {
        route: 'users',
        query: q => `${q} in:login`,
      },
      repos: {
        route: 'repositories',
        query: q => `${q} in:name`,
      },
      issues: {
        route: 'issues',
        query: q => q,
      },
      codes: {
        route: 'code',
        query: q => `${q} repo:jquery/jquery`,
      },
    };

    return {
      search,
      loadReposByUser,
      loadDetails,
    };

    function search(entity, query, page = 1) {
      return $http
        .get(`${ApiUrls.baseUrl}/search/${config[entity].route}`, {
          params: {
            page,
            q: config[entity].query(query),
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

    function loadDetails(entity, entityId) {
      return $http
        .get(`${ApiUrls.baseUrl}/${config[entity].route}/${entityId}`)
        .then(response => response.data);
    }

  });

})();
