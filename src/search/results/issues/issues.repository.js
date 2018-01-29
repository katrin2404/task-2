(function () {

  'use strict';

  angular.module('search').factory('IssuesRepository', function ($http, ApiUrls, Pagination) {
    return {
      search,
    };

    function search(query, page = 1) {
      return $http
        .get(`${ApiUrls.baseUrl}/search/issues`, {
          params: {
            page,
            q: `${query}`,
            per_page: Pagination.pageSize,
          },
        })
        .then(response => response.data);
    }
  })
})();
