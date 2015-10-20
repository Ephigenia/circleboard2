'use strict';

(function() {

  angular
    .module('m3App')
    .controller('ConfigController', ConfigController);

  ConfigController.$inject = [
    '$rootScope',
    '$scope',
    '$log',
    'Config'
  ];

  function ConfigController(
    $rootScope,
    $scope,
    $log,
    Config
  ) {

    $scope.config = Config;

    $scope.save = function() {
      $log.log('saving config', Config);
      $scope.config.save();
    };

  }

})();
