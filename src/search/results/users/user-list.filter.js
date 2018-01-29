(function () {


  'use strict';
  angular.module('search').filter('filterStartsWithLetterUsers', function () {
    return function (items = [], value = '') {
      return items.filter(e => e['login'].toLowerCase().startsWith(value.toLowerCase()));
    };

  });
})();
