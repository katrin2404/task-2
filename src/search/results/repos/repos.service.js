(function () {

  'use strict';

  angular.module('search').factory('ReposService', function ($q, ReposRepository) {
    const state = {
      repos: [],
      total: 0,
      query: null,
      page: null,
    };

    return {
      search,
      get repos() {
        return state.repos;
      },
      get total() {
        return state.total;
      },
      loadDetails,
    };

    function search(query, page = 1) {
      state.query = query;
      state.page = Number(page);
      return ReposRepository.search(query, page)
        .then(response => {
          state.repos = response.items.map((item, index) => ({...item, index}));
          state.total = response.total_count;
          return response;
        });
    }

    function loadDetails(query, page, position) {
      return search(query, page)
        .then(() => {
          const repo = state.repos[position];
          return $q.all({
            repo: ReposRepository.loadDetails(repo.id),
          });
        })
        .then(({repo}) => ({...repo}));
    }
  })
})();

