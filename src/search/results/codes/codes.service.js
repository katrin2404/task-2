(function () {

  'use strict';

  angular.module('search').factory('CodesService', function ($q, CodesRepository) {
    const state = {
      codes: [],
      total: 0,
      searchPromise: null,
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
      return CodesRepository.search(query, page)
        .then(response => {
          state.codes = response.items;
          state.total = response.total_count;
          return response;
        });
    }
  })
})();

