(function () {

  'use strict';

  angular.module('search').factory('CodesRepository', function ($http, ApiUrls, Pagination) {
    return {
      search,
    };

    function search(query, page = 1) {
      return $http
        .get(`${ApiUrls.baseUrl}/search/code`, {
          params: {
            page,
            q: `${query} repo:jquery/jquery`,
            per_page: Pagination.pageSize,
          },
        })
        .then(response => response.data);
    }
  })
})();
