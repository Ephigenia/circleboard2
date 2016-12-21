(function() {
  'use strict';

  angular
  .module('circleboard')
  .component('mainComponent', {
    templateUrl: 'scripts/MainComponent.html',
    controller: function(
      $log,
      Config,
      $http,
      $q,
      $interval
    ) {
      var ctrl = this;

      Object.defineProperties(this, {
        builds: {
          value: [],
          writable: true,
          enumerable: true
        },
        countdown: {
          value: 1,
          writable: true,
          enumerable: true
        },
        config: {
          value: Config,
          writable: false,
          enumerable: true
        }
      });

      var APITOKEN = Config.apiToken;
      var REFRESH_INTERVAL = Config.refreshInterval;

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
          ctrl.builds = builds;
        });
      }

      function startPolling() {
        $log.info('polling started');
        // countdown
        ctrl.refreshInterval = $interval(function() {
          ctrl.countdown--;
          // $log.info('%d seconds left till refresh', $scope.countdown);
          if (ctrl.countdown < 0) {
            update();
            ctrl.countdown = REFRESH_INTERVAL;
          }
        }, 1000);
      }

      this.$onDestroy = function() {
        if (ctrl.refreshInterval) {
          $interval.cancel(ctrl.refreshInterval);
        }
      };

      if (ctrl.config.apiToken) {
        $log.info('apiToken found, start polling');
        startPolling();
      }
    }
  });
})();
