(function () {

  'use strict';
  angular.module('App').constant('Config', {
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
  })
})();
