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
