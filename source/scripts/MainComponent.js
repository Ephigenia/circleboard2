(function() {
  'use strict';

  angular
  .module('circleboard')
  .component('mainComponent', {
    templateUrl: 'scripts/MainComponent.html',
    bindings: {
      apiToken: '<',
      refreshInterval: '<'
    },
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
      function fetchRecentBuilds() {
        var url = 'https://circleci.com/api/v1/recent-builds';
        var options = {
          params: {
            'circle-token': ctrl.apiToken
          }
        };
        return $http.get(url, options);
      }

      function update() {
        $log.info('starting an update');
        fetchRecentBuilds().then(function(response) {
          ctrl.error = null;
          ctrl.builds = response.data;
        }, function(rejection) {
          ctrl.error = rejection;
        });
      }

      function startPolling() {
        $log.info('polling started');
        // countdown
        ctrl.updateTimeout = $interval(function() {
          ctrl.countdown--;
          // when countdown is counted to update
          if (ctrl.countdown <= 0) {
            update();
            // reset countdown to the interval default
            ctrl.countdown = ctrl.refreshInterval;
          }
        }, 1000);
      }

      function stopPolling() {
        if (ctrl.updateTimeout) {
          $interval.cancel(ctrl.updateTimeout);
        }
      }

      this.$onDestroy = function() {
        stopPolling();
      };

      if (ctrl.config.apiToken) {
        $log.info('apiToken found, start polling');
        startPolling();
      }
    }
  });
})();
