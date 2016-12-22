(function(angular) {
  angular
    .module('circleboard', [
      'ui.router',
      'ngSanitize'
    ])
    .config(function(
      $stateProvider
    ) {
      $stateProvider
        .state('app', {
          url: '',
          abstract: true,
          template: '<navbar-component></navbar-component><div ui-view style="margin-top: 54px;"></div>'
        })
        .state('app.list', {
          url: '?apiToken',
          params: {
            apiToken: {
              type: 'string',
              squash: true,
              value: null
            }
          },
          resolve: {
            apiToken: function(Config, $stateParams) {
              return $stateParams.apiToken || Config.apiToken;
            },
            refreshInterval: function(Config) {
              return Config.refreshInterval || 30;
            }
          },
          component: 'mainComponent'
        })
        .state('app.config', {
          url: 'config',
          resolve: {
            config: function(Config) {
              return Config;
            }
          },
          component: 'configComponent'
        })
      ;
    })
    .run();
})(angular);
