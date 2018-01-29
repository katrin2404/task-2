(function () {


  'use strict';
  angular.module('search').filter('startsWithLetterRepo', function () {
    return function (items = [], value = '') {
      return items.filter(e => e['name'].toLowerCase().startsWith(value.toLowerCase()));
    };

  });
})();
