(function () {

  'use strict';


  angular.module('search').factory('UsersService', function ($q, ReposRepository, UsersRepository) {
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
      return UsersRepository.search(query, page)
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
            user: UsersRepository.loadDetails(user.login),
            repos: ReposRepository.loadByUser(user.login),
          });
        })
        .then(({user, repos}) => ({...user, repos}));
    }
  })
})();

