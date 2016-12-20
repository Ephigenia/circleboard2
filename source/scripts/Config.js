(function() {
  'use strict';

  angular
    .module('circleboard')
    .factory('Config',
  function(
    $rootScope
  ) {
    // default configuration
    var defaults = {
      apiToken: null,
      refreshInterval: 30
    };

    function Config(prefix) {

      prefix = prefix || 'config';

      var storage = window.localStorage;

      var storageContents = JSON.parse(storage.getItem(prefix));
      angular.extend(this, angular.extend(defaults, storageContents));

      // make sure the interval isn’t to low
      if (this.refreshInterval < 20) {
        this.refreshInterval = 20;
      }

      this.save = function() {
        storage.setItem(prefix, JSON.stringify(this));
      };
      this.reset = function() {
        storage.setItem(prefix, JSON.stringify(defaults));
      };
    }

    return new Config('circleboard');
  });
})();
