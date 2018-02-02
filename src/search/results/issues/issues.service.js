(function () {

  'use strict';

  angular.module('search').factory('IssuesService', function ($q, SearchRepository) {
    const state = {
      issues: [],
      total: 0,
      searchPromise: null,
      query: null,
      page: null,
    };

    return {
      search,
      get issues() {
        return state.issues;
      },
      get total() {
        return state.total;
      },
          };

    function search(query, page = 1) {
      state.query = query;
      state.page = Number(page);
      return SearchRepository.search('issues', query, page)
        .then(response => {
          state.issues = response.items;
          state.total = response.total_count;
          return response;
        });
    }
  })
})();

