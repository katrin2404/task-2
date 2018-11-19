(function () {

  'use strict';

// Define the `search` module
  angular.module('search', ['ui.router']);
})();

(function () {
  'use strict';

// Define the `App` module
  angular
    .module('App', [
      'ngMaterial',
      'ngAnimate',
      'ngSanitize',
      'ui.bootstrap',
      'ui.router',
      'uiRouterTitle',

      'search',
    ])
    .run(function ($trace) {
      $trace.enable('TRANSITION');
    });

})();

(function () {

    'use strict';

    angular.module('App').animation('.search', function postAnimationFactory() {
        return {
            addClass: animateIn,
            removeClass: animateOut
        };

        function animateIn(element, className, done) {
            if (className !== 'selected') return;

            element.css({
                display: 'block',
                opacity: 1,
                position: 'absolute',
                width: 0,
                height: 0,
                top: 200,
                left: 200
            }).animate({
                width: 400,
                height: 400,
                top: 0,
                left: 0
            }, done);
        }

        function animateOut(element, className, done) {
            if (className !== 'selected') return;
            element.animate({
                opacity: 0
            }, done);

            return function animateOutEnd(wasCanceled) {
                if (wasCanceled) element.stop();
            };
        }
    });
})();


(function () {
  'use strict';

  angular.module('App')
    .config(['$locationProvider', '$httpProvider',
      function config($locationProvider, $httpProvider) {
        $locationProvider.html5Mode(true);
      }
    ])
    .factory('httpRequestInterceptor', function () {
      return {
        request: function (config) {

          config.headers['Authorization'] = 'Basic a2F0cmluMjQwNDpMYXBrQDI0MDQxOTg3QEA=';
          config.headers['Accept'] = 'application/json;odata=verbose';

          return config;
        }
      };
    })
    .config(function ($httpProvider) {
      $httpProvider.defaults.cache = true;
      $httpProvider.interceptors.push('httpRequestInterceptor');
    });

})();

(function () {

    'use strict';
    angular.module('App').constant('ApiUrls', {
        baseUrl: 'https://api.github.com',
    })
})();

(function () {
  'use strict';
  angular.module('App').constant('Pagination', {
    pageSize: 5,
    limitPage: 200,
    coefficientDetails: 5,
  })
})();

(function () {
  'use strict';

  angular.module('App').config(['$stateProvider', '$urlRouterProvider',
    function config($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state({
          name: 'search',
          url: '/',
          template: '<search-query></search-query><ui-view></ui-view>',
          data: {pageTitle: 'Home'},
        })
        .state({
          name: 'search.results',
          abstract: true,
          url: 'search',
          template: '<search-results-page></search-results-page>',
          data: {pageTitle: 'Search'},
        })
        .state({
          name: 'search.results.users',
          url: '/{query}/users/{page}',
          template: '<user-list></user-list>',
          params: {
            query: {
              squash: true,
            },
            page: {
              squash: true,
              value: '1',
            },
          },
          data: {pageTitle: 'Users'},
        })
        .state({
          name: 'search.results.userDetails',
          url: '/{query}/user-details/{position}',
          template: '<user-details-page></user-details-page>',
          params: {
            query: {
              squash: true,
            },
            position: {
              squash: true,
            },
            page: {
              squash: true,
            }
          },
          data: {pageTitle: 'Details of user'},
        })
        .state({
          name: 'repoOfUser',
          url: '/{query}/user-details/{position}/:repoId',
          template: '<repo-of-user></repo-of-user>',
          params: {
            repoId: {
              squash: true,
            },
            query: {
              squash: true,
            },
            position: {
              squash: true,
            },
            page: {
              squash: true,
            }
          },
          data: {pageTitle: 'Repository'},
        })
        .state({
          name: 'search.results.repos',
          url: '/repositories/{query}/{page}',
          template: '<repo-list></repo-list>',
          params: {
            query: {
              squash: true,
            },
            page: {
              squash: true,
              value: '1',
            },
          },
          data: {pageTitle: 'Repositories'},
        })
        .state({
          name: 'search.results.repoDetails',
          url: '/{query}/repository-details/{position}',
          template: '<repo-details-page></repo-details-page>',
          params: {
            query: {
              squash: true,
            },
            position: {
              squash: true,
            },
            page: {
              squash: true,
            }
          },
          data: {pageTitle: 'Details of repository'},
        })
        .state({
          name: 'search.results.issues',
          url: '/issues/{query}/{page}',
          template: '<issue-list></issue-list>',
          params: {
            query: {
              squash: true,
            },
            page: {
              squash: true,
              value: '1',
            },
          },
          data: {pageTitle: 'Issues'},
        })
        .state({
          name: 'search.results.codes',
          url: '/code/{query}/{page}',
          template: '<code-list></code-list>',
          params: {
            query: {
              squash: true,
            },
            page: {
              squash: true,
              value: '1',
            },
          },
          data: {pageTitle: 'Codes'},
        })
        .state({
          name: 'NotFound',
          url: '/NotFound',
          template: '<h1>Not Found</h1>',
          data: {pageTitle: 'Not Found'},
        });
      $urlRouterProvider.otherwise("/NotFound");
    }


  ]);

})();




(function () {

  'use strict';
  angular.module('search').controller('SearchQueryController', [
    '$state', '$stateParams',
    function ($state, $stateParams) {
      const vm = this;
      vm.query = $stateParams.query;
      vm.showResults = showResults;
      function showResults() {
        $state.go('search.results.users', {query: vm.query, page: null});
      }
    }
  ]);

})();

(function () {

  'use strict';

  angular.module('search').directive('searchQuery', function () {
    return {
      templateUrl: 'search/query/search-query.template.html',
      controller: 'SearchQueryController',
      controllerAs: 'vm',
    };
  });

})();


(function () {

  'use strict';
  angular.module('search').controller('SearchResultsPageController', function ($q, $scope, $state, $stateParams, $transitions, CodesService, IssuesService, ReposService, UsersService) {
    const vm = this;

    vm.reposTotalCount = 0;
    vm.usersTotalCount = 0;
    vm.issuesTotalCount = 0;
    vm.codesTotalCount = 0;

    const cancel = $transitions.onStart({}, handleTransition);
    $scope.$on('$destroy', () => {
      cancel();
    });


    init();

    function init() {
      vm.loading = true;
      initParams();

      return $q
        .all({
          users: refreshUsers(),
          repos: refreshRepos(),
          issues: refreshIssues(),
          codes: refreshCodes(),
        })
        .finally(() => {
          vm.loading = false;
        });
    }

    function initParams() {
      vm.query = $stateParams.query;
      vm.page = Number($stateParams.page);
    }

    function refreshUsers() {
      return UsersService
        .search(vm.query, vm.page)
        .then(() => {
          vm.usersTotalCount = UsersService.total;
        });
    }

    function refreshRepos() {
      return ReposService
        .search(vm.query, vm.page)
        .then(() => {
          vm.reposTotalCount = ReposService.total;
        });
    }

    function refreshIssues() {
      return IssuesService
        .search(vm.query, vm.page)
        .then(() => {
          vm.issuesTotalCount = IssuesService.total;
        });
    }

    function refreshCodes() {
      return CodesService
        .search(vm.query, vm.page)
        .then(() => {
          vm.codesTotalCount = CodesService.total;
        });
    }

    function handleTransition(transition) {
      transition.promise.finally(() => {
        if (vm.query !== $stateParams.query) {
          init();
        } else {
          vm.loading = true;
          initParams();
          let promise = $q.resolve();
          switch ($state.current.name) {
            case 'search.results.users':
              promise = refreshUsers();
              break;
            case 'search.results.repos':
              promise = refreshRepos();
              break;
            case 'search.results.issues':
              promise = refreshIssues();
              break;
            case 'search.results.codes':
              promise = refreshCodes();
              break;
          }
          promise.finally(() => {
            vm.loading = false;
          });
        }
      });
    }

  })
})();

(function () {

  'use strict';

  angular.module('search').directive('searchResultsPage', function () {
    return {
      controller: 'SearchResultsPageController',
      templateUrl: 'search/results/search-results-page.template.html',
      controllerAs: 'vm',
    }
  });
})();

(function () {

  'use strict';
  angular.module('search').controller('CodeListController', function ($stateParams, CodesService, Pagination) {
    const vm = this;
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);
    vm.pageSize = Pagination.pageSize;
    vm.codes = [];
    vm.codesTotalCount = 0;
    vm.pageCount = 1;
    vm.limitPages = Pagination.limitPage;
    vm.init = init;


    init();

    function init() {
      return CodesService.search(vm.query, vm.page)
        .then(() => {
          vm.codesTotalCount = CodesService.total;
          vm.codes = CodesService.codes;
          vm.pageCount = Math.ceil(vm.codesTotalCount / vm.pageSize) || 1;
          if (vm.pageCount > vm.limitPages) {
            vm.pageCount = vm.limitPages;
          }
        });
    }

  })
})();

(function () {

  'use strict';

  angular.module('search').directive('codeList', function () {
    return {
      templateUrl: 'search/results/codes/code-list.template.html',
      controller: 'CodeListController',
      controllerAs: 'vm'
    }
  });
})();





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


(function () {

  'use strict';
  angular.module('search').controller('RepoDetailsPageController', function ($stateParams, Pagination, ReposService) {
    const vm = this;
    vm.pageSize = Pagination.pageSize;
    vm.total = 0;
    vm.position = Number($stateParams.position);
    vm.page = Number($stateParams.page);
    vm.query = $stateParams.query;
    vm.limitElements = Pagination.limitPage * Pagination.coefficientDetails;


    init();

    function init() {
      const page = Math.ceil($stateParams.position / vm.pageSize);
      const position = ($stateParams.position - 1) % vm.pageSize;

      return ReposService
        .loadDetails($stateParams.query, page, position)
        .then((repo) => {
          vm.repo = repo;
          vm.total = ReposService.total;
          if (vm.total > vm.limitElements) {
            vm.total = vm.limitElements;
          }
          vm.page = page;
        });
    }

  })
})();

(function () {

  'use strict';

  angular.module('search').directive('repoDetailsPage', function () {
    return {
      templateUrl: 'search/results/repo-details/repo-details-page.template.html',
      controller: 'RepoDetailsPageController',
      controllerAs: 'vm'
    }
  });
})();



(function () {

  'use strict';
  angular.module('search').controller('RepoOfUserController', function ($scope, $stateParams, ReposRepository) {
    const vm = this;
    vm.position = Number($stateParams.position);
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);


    init();

    function init() {
      const repoId = $stateParams.repoId;
      return ReposRepository
        .loadDetails(repoId)
        .then((repo) => {
          vm.repo = repo;
        });
    }
  })
})();

(function () {

  'use strict';

  angular.module('search').directive('repoOfUser', function () {
    return {
      templateUrl: 'search/results/repo-details/repo-of-user.template.html',
      controller: 'RepoOfUserController',
      controllerAs: 'vm'
    }
  });
})();



(function () {

  'use strict';
  angular.module('search').controller('IssueListController', function ($stateParams, IssuesService, Pagination) {
    const vm = this;
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);
    vm.pageSize = Pagination.pageSize;
    vm.issues = [];
    vm.issuesTotalCount = 0;
    vm.pageCount = 1;
    vm.limitPages = Pagination.limitPage;
    vm.init = init;


    init();

    function init() {
      return IssuesService.search(vm.query, vm.page)
        .then(() => {
          vm.issuesTotalCount = IssuesService.total;
          vm.issues = IssuesService.issues;
          vm.pageCount = Math.ceil(vm.issuesTotalCount / vm.pageSize) || 1;
          if (vm.pageCount > vm.limitPages) {
            vm.pageCount = vm.limitPages;
          }
          if (vm.pageCount > vm.limitPages) {
            vm.pageCount = vm.limitPages;
          }
        });
    }

  })
})();

(function () {

  'use strict';

  angular.module('search').directive('issueList', function () {
    return {
      templateUrl: 'search/results/issues/issue-list.template.html',
      controller: 'IssueListController',
      controllerAs: 'vm'
    }
  });
})();





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

(function () {

  'use strict';

  angular.module('search').factory('IssuesService', function ($q, IssuesRepository) {
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
      return IssuesRepository.search(query, page)
        .then(response => {
          state.issues = response.items;
          state.total = response.total_count;
          return response;
        });
    }
  })
})();


(function () {

  'use strict';
  angular.module('search').controller('RepoListController', function ($stateParams, Pagination, ReposService) {
    const vm = this;
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);
    vm.pageSize = Pagination.pageSize;
    vm.repos = [];
    vm.reposTotalCount = 0;
    vm.pageCount = 1;
    vm.limitPages = Pagination.limitPage;
    vm.orderProp = '';

    vm.init = init;
    vm.getRepoPosition = getRepoPosition;


    init();

    function init() {
      return ReposService.search(vm.query, vm.page)
        .then(() => {
          vm.reposTotalCount = ReposService.total;
          vm.repos = ReposService.repos;
          vm.pageCount = Math.ceil(vm.reposTotalCount / vm.pageSize) || 1;
          if (vm.pageCount > vm.limitPages) {
            vm.pageCount = vm.limitPages;
          }
        });
    }

    function getRepoPosition(index) {
      return (vm.page - 1) * vm.pageSize + index + 1;
    }

  })
})();

(function () {

  'use strict';

  angular.module('search').directive('repoList', function () {
    return {
      templateUrl: 'search/results/repos/repo-list.template.html',
      controller: 'RepoListController',
      controllerAs: 'vm'
    }
  });
})();





(function () {


  'use strict';
  angular.module('search').filter('startsWithLetterRepo', function () {
    return function (items = [], value = '') {
      return items.filter(e => e['name'].toLowerCase().startsWith(value.toLowerCase()));
    };

  });
})();

(function () {

  'use strict';

  angular.module('search').factory('ReposRepository', function ($http, ApiUrls, Pagination) {
    return {
      search,
      loadByUser,
      loadDetails,
    };

    function search(query, page = 1) {
      return $http
        .get(`${ApiUrls.baseUrl}/search/repositories`, {
          params: {
            page,
            q: `${query} in:name`,
            per_page: Pagination.pageSize,
          },
        })
        .then(response => response.data);
    }

    function loadByUser(userName) {
      return $http
        .get(`${ApiUrls.baseUrl}/users/${userName}/repos`)
        .then(response => response.data);
    }

    function loadDetails(repoId) {
      return $http
        .get(`${ApiUrls.baseUrl}/repositories/${repoId}`)
        .then(response => response.data);
    }

  });

})();

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


(function () {

  'use strict';
  angular.module('search').controller('UserDetailsPageController', function ($scope, $stateParams, Pagination, UsersService) {
    const vm = this;
    vm.pageSize = Pagination.pageSize;
    vm.total = 0;
    vm.position = Number($stateParams.position);
    vm.page = Number($stateParams.page);
    vm.query = $stateParams.query;
    vm.limitElements = Pagination.limitPage * Pagination.coefficientDetails;

    init();

    function init() {
      const page = Math.ceil($stateParams.position / vm.pageSize);
      const position = ($stateParams.position - 1) % vm.pageSize;

      return UsersService
        .loadDetails($stateParams.query, page, position)
        .then((user) => {
          vm.user = user;
          vm.total = UsersService.total;
          if (vm.total > vm.limitElements) {
            vm.total = vm.limitElements;
          }
          vm.page = page;
        });
    }
  })
})();

(function () {

  'use strict';

  angular.module('search').directive('userDetailsPage', function () {
    return {
      templateUrl: 'search/results/user-details/user-details-page.template.html',
      controller: 'UserDetailsPageController',
      controllerAs: 'vm'
    }
  });
})();



(function () {


  'use strict';
  angular.module('search').controller('UserListController', function ($state, $stateParams, Pagination, UsersService) {
    const vm = this;
    vm.query = $stateParams.query;
    vm.page = Number($stateParams.page);
    vm.pageSize = Pagination.pageSize;
    vm.users = [];
    vm.usersTotalCount = 0;
    vm.pageCount = 1;
    vm.limitPages = Pagination.limitPage;
    vm.init = init;

    vm.getUserPosition = getUserPosition;


    init();

    function init() {
      return UsersService.search(vm.query, vm.page)
        .then(() => {
          vm.usersTotalCount = UsersService.total;
          vm.users = UsersService.users;
          vm.pageCount = Math.ceil(vm.usersTotalCount / vm.pageSize) || 1;
          if (vm.pageCount > vm.limitPages) {
            vm.pageCount = vm.limitPages;
          }
        });
    }

    function getUserPosition(index) {
      return (vm.page - 1) * vm.pageSize + index + 1;
    }


  })
})();



(function () {

  'use strict';

  angular.module('search').directive('userList', function () {
    return {
      templateUrl: 'search/results/users/user-list.template.html',
      controller: 'UserListController',
      controllerAs: 'vm',
    };
  });
})();





(function () {


  'use strict';
  angular.module('search').filter('filterStartsWithLetterUsers', function () {
    return function (items = [], value = '') {
      return items.filter(e => e['login'].toLowerCase().startsWith(value.toLowerCase()));
    };

  });
})();

(function () {

  'use strict';

  angular.module('search').factory('UsersRepository', function ($http, ApiUrls, Pagination) {

    return {
      search,
      loadDetails,
    }
      ;

    function search(query, page = 1) {
      return $http
        .get(`${ApiUrls.baseUrl}/search/users`, {
          params: {
            page,
            q: `${query} in:login`,
            per_page: Pagination.pageSize,
          },
        })
        .then(response => response.data);
    }

    function loadDetails(userName) {
      return $http
        .get(`${ApiUrls.baseUrl}/users/${userName}`)
        .then(response => response.data);
    }

  })
})();

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

