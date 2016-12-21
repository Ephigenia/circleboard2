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
          url: '/',
          abstract: true,
          template: '<navbar-component></navbar-component><div ui-view></div>'
        })
        .state('app.list', {
          url: '',
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
