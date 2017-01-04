(function() {
  'use strict';

  angular
    .module('circleboard')
    .factory('BuildService',
  function(
    $log,
    $http,
    $interval
  ) {
    function BuildService() {
      Object.defineProperties(this, {
        apiToken: {
          value: null,
          writable: true,
          enumerable: true
        },
        builds: {
          value: [],
          writable: true,
          enumerable: true
        },
        polling: {
          value: false,
          writable: true,
          enumberable: true
        },
        countdown: {
          value: 0,
          writable: true,
          enumerable: true
        }
      });
    }

    BuildService.prototype.update = function() {
      this.error = null;
      return this.fetchRecentBuilds().then(
        function(response) {
          this.builds = response.data;
        }.bind(this),
        function(rejection) {
          $log.error('error happened', rejection);
          this.error = rejection;
        }.bind(this));
    };

    BuildService.prototype.startPolling = function(delay) {
      $log.debug('BuildService:startPolling with %ds delay', delay);

      this.polling = true;
      this.countdown = delay;

      // countdown
      var handler = function() {
        this.countdown--;
        // when countdown is counted to update
        if (this.countdown <= 0) {
          this.update();
          // reset countdown to the interval default
          this.countdown = delay;
        }
      }.bind(this);

      // initially invoke the handler when pollin gstarted
      this.updateTimeout = $interval(handler, 1000);
      this.update();
      return this;
    };

    BuildService.prototype.stopPolling = function() {
      if (this.updateTimeout) {
        $log.debug('BuildService:stopPolling');
        $interval.cancel(this.updateTimeout);
      }
      this.polling = false;
      return this;
    };

    BuildService.prototype.fetchRecentBuilds = function() {
      this.loading = true;
      var url = 'https://circleci.com/api/v1/recent-builds';
      var options = {
        params: {
          'circle-token': this.apiToken
        }
      };
      return $http.get(url, options).finally(function() {
        this.loading = false;
      }.bind(this));
    };

    return new BuildService();
  });
})();
