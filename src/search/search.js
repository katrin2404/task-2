(function () {
  'use strict';

  angular.module('App').config(['$stateProvider', '$urlRouterProvider',
    function config($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state({
          name: 'search',
          url: '/',
          template: '<search-query></search-query><ui-view></ui-view>',
          data: {pageTitle: 'Home'}
        })
        .state({
          name: 'search.results',
          abstract: true,
          url: 'search',
          template: '<search-results-page></search-results-page>',
          data: {pageTitle: 'Search'}
        })
        .state({
          name: 'search.results.users',
          url: '/{query}/users/{page}',
          template: '<user-list></user-list>',
          params: {
            query: {
              squash: true
            },
            page: {
              squash: true,
              value: '1'
            }
          },
          data: {pageTitle: 'Users'}
        })
        .state({
          name: 'search.results.userDetails',
          url: '/{query}/user-details/{position}',
          template: '<user-details-page></user-details-page>',
          params: {
            query: {
              squash: true
            },
            position: {
              squash: true
            },
            page: {
              squash: true
            }
          },
          data: {pageTitle: 'Details of user'}
        })
        .state({
          name: 'repoOfUser',
          url: '/{query}/user-details/{position}/:repoId',
          template: '<repo-of-user></repo-of-user>',
          params: {
            repoId: {
              squash: true
            },
            query: {
              squash: true
            },
            position: {
              squash: true
            },
            page: {
              squash: true
            }
          },
          data: {pageTitle: 'Repository'}
        })
        .state({
          name: 'search.results.repos',
          url: '/{query}/repositories/{page}',
          template: '<repo-list></repo-list>',
          params: {
            query: {
              squash: true
            },
            page: {
              squash: true,
              value: '1'
            }
          },
          data: {pageTitle: 'Repositories'}
        })
        .state({
          name: 'search.results.repoDetails',
          url: '/{query}/repository-details/{position}',
          template: '<repo-details-page></repo-details-page>',
          params: {
            query: {
              squash: true
            },
            position: {
              squash: true
            },
            page: {
              squash: true
            }
          },
          data: {pageTitle: 'Details of repository'}
        })
        .state({
          name: 'search.results.issues',
          url: '/{query}/issues/{page}',
          template: '<issue-list></issue-list>',
          params: {
            query: {
              squash: true
            },
            page: {
              squash: true,
              value: '1'
            }
          },
          data: {pageTitle: 'Issues'}
        })
        .state({
          name: 'search.results.codes',
          url: '/{query}/code/{page}',
          template: '<code-list></code-list>',
          params: {
            query: {
              squash: true
            },
            page: {
              squash: true,
              value: '1'
            }
          },
          data: {pageTitle: 'Codes'}
        })
        .state({
          name: 'search.NotFound',
          url: 'NotFound',
          template: '<h1>Not Found</h1>',
          params: {
            query: {
              squash: true
            }
          },
          data: {pageTitle: 'Not Found'}
        });
      $urlRouterProvider.otherwise("/NotFound");
    }


  ]);

})();



