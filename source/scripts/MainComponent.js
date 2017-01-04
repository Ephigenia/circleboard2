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
      BuildService
    ) {
      this.buildService = BuildService;

      this.$onDestroy = function() {
        BuildService.stopPolling();
      };

      if (this.apiToken) {
        $log.info('apiToken found, start polling');
        BuildService.apiToken = this.apiToken;
        BuildService.startPolling(this.refreshInterval);
      }
    }
  });
})();
