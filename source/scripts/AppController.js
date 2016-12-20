(function() {
  'use strict';

  angular
    .module('circleboard')
    .controller('AppController',
  function(
    $rootScope,
    $scope,
    $log,
    $http,
    $q,
    Config
  ) {
    var APITOKEN = Config.apiToken;
    var REFRESH_INTERVAL = Config.refreshInterval;

    $scope.builds = [];
    $scope.countdown = 1;
    $scope.config = Config;

    function fetchRecentBuilds() {
      var deferred = $q.defer();
      var url = 'https://circleci.com/api/v1/recent-builds';
      var options = {
        params: {
          'circle-token': APITOKEN
        }
      };
      $http.get(url, options)
        .success(function(response) {
          deferred.resolve(response);
        })
        .error(function(err) {
          $log.error(err);
          deferred.reject(err);
        });
      return deferred.promise;
    }

    function update() {
      $log.info('starting an update');
      fetchRecentBuilds().then(function(builds) {
        $scope.builds = builds;
      });
    }

    $scope.refreshInterval = null;
    function startPolling() {
      $log.info('polling started');
      // countdown
      $scope.refreshInterval = window.setInterval(function() {
        $scope.countdown--;
        // $log.info('%d seconds left till refresh', $scope.countdown);
        if ($scope.countdown < 0) {
          update();
          $scope.countdown = REFRESH_INTERVAL;
        }
        $scope.$apply();
      }, 1000);
    }

    if (Config.apiToken) {
      $log.info('apiToken found, start polling');
      startPolling();
    }
  });
})();
