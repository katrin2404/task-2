(function () {

  'use strict';

  angular.module('search').factory('CodesService', function ($q, SearchRepository) {
    const state = {
      codes: [],
      total: 0,
      query: null,
      page: null,
    };

    return {
      search,
      get codes() {
        return state.codes;
      },
      get total() {
        return state.total;
      },
    };

    function search(query, page = 1) {
      state.query = query;
      state.page = Number(page);
      return SearchRepository.search('codes', query, page)
        .then(response => {
          state.codes = response.items;
          state.total = response.total_count;
          return response;
        });
    }
  })
})();

