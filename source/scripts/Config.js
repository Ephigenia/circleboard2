(function() {
  'use strict';

  angular
    .module('circleboard')
    .factory('Config',
  function(
    $rootScope,
    $window,
    $log
  ) {
    // default configuration
    var defaults = {
      fontSize: 16,
      apiToken: null,
      refreshInterval: 30
    };

    function Config(prefix) {
      prefix = prefix || 'config';

      var storage = $window.localStorage;

      var storageContents = angular.fromJson(storage.getItem(prefix));
      angular.extend(this, angular.extend(defaults, storageContents));

      // make sure the interval isn’t to low
      if (this.refreshInterval < 20) {
        this.refreshInterval = 20;
      }

      this.save = function() {
        $log.debug('Config.save', this);
        storage.setItem(prefix, angular.toJson(this));
      };
      this.reset = function() {
        $log.debug('Config.reset');
        storage.setItem(prefix, angular.toJson(defaults));
      };
    }

    return new Config('circleboard');
  });
})();
