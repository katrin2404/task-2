(function () {

  'use strict';


  angular.module('search').factory('UsersService', function ($q, SearchRepository) {
    const state = {
      users: [],
      total: 0,
      query: null,
      page: null,
    };

    return {
      search,
      get users() {
        return state.users;
      },
      get total() {
        return state.total;
      },
      loadDetails,
    };

    function search(query, page = 1) {
      state.query = query;
      state.page = Number(page);
      return SearchRepository.search('users', query, page)
        .then(response => {
          state.users = response.items.map((item, index) => ({...item, index}));
          state.total = response.total_count;
          return response;
        });
    }

    function loadDetails(query, page, position) {
      return search(query, page)
        .then(() => {
          const user = state.users[position];
          return $q.all({
            user: SearchRepository.loadDetails('users', user.login),
            repos: SearchRepository.loadReposByUser(user.login),
          });
        })
        .then(({user, repos}) => ({...user, repos}));
    }
  })
})();

