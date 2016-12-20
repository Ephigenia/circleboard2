(function() {
  'use strict';

  angular
    .module('circleboard')
    .controller('ConfigController',
  function(
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
  });
})();
