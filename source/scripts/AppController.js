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
  ];

  function AppController(
    $rootScope,
    $scope,
    $log,
    $http,
    $q
  ) {

    var APITOKEN = window.localStorage.getItem('apiToken');

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

    $scope.builds = [];
    $scope.builds.push({id: 12});

    function update() {
      fetchRecentBuilds().then(function(builds) {
        $scope.builds = builds;
      });
    }

    var refreshEverySeconds = 20;
    $scope.countdown = 1;

    // countdown
    window.setInterval(function() {
      $scope.countdown--;
      if ($scope.countdown < 0) {
        update();
        $scope.countdown = refreshEverySeconds;
      }
      $scope.$apply();
    }, 1000);

  }

})();
