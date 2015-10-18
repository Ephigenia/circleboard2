'use strict';

(function() {

  angular
    .module('m3App')
    .controller('ConfigController', ConfigController);

  ConfigController.$inject = [
    '$rootScope',
    '$scope',
    '$log'
  ];

  function ConfigController(
    $rootScope,
    $scope,
    $log
  ) {

    $scope.config = {
      apiToken: window.localStorage.getItem('apiToken')
    };

    $scope.save = function() {
      $log.log('Setting apiToken to "%s"', $scope.config.apiToken);
      window.localStorage.setItem('apiToken', $scope.config.apiToken);
    };

  }

})();
