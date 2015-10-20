'use strict';

(function() {

  angular
    .module('m3App')
    .controller('AppController', AppController);

  AppController.$inject = [
    '$rootScope',
    '$scope',
    '$log',
    '$http',
    '$q',
    'Config'
  ];

  function AppController(
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

    // https://circleci.com/docs/api#recent-builds-project
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
      fetchRecentBuilds().then(function(builds) {
        $scope.builds = builds;
      });
    }

    $scope.refreshInterval = null;
    function startPolling() {
      // countdown
      $scope.refreshInterval = window.setInterval(function() {
        $scope.countdown--;
        if ($scope.countdown < 0) {
          update();
          $scope.countdown = REFRESH_INTERVAL;
        }
        $scope.$apply();
      }, 1000);
    }
    function stopPolling() {
      if ($scope.refreshInterval) {
        window.clearInterval($scope.refreshInterval);
      }
    }

    if (Config.apiToken) {
      startPolling();
    }

  }

})();
