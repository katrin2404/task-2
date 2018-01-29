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
