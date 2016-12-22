(function() {
  'use strict';

  angular
  .module('circleboard')
  .filter('duration', function() {
    /**
     * Convert miliseconds to human readable duration strings
     */
    return function(input) {
      var seconds = input / 1000;
      var minutes = Math.floor(seconds / 60);
      if (seconds <= 1) {
        return '';
      }
      if (minutes <= 0) {
        return Math.round(seconds) + 's';
      }
      return minutes + 'm ' + Math.floor(seconds - minutes * 60) + 's';
    };
  });
})();
