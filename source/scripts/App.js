(function(angular) {
  angular
    .module('circleboard', [
      'ui.router',
      'ct.ui.router.extras',
      'ngSanitize'
    ])
    .config(function(
      $stateProvider
    ) {
      $stateProvider
        .state('app', {
          url: '/',
          controller: 'AppController',
          templateUrl: '/views/main.html'
        })
        .state('app.config', {
          url: '/',
          controller: 'ConfigController',
          templateUrl: '/views/config.html'
        })
      ;
    })
    .run(function(
      $rootScope,
      $location,
      $http,
      $log,
      Config
    ) {
      // @TODO move those actions to the buttons
      $rootScope.setFontSize = function(sizePixel) {
        $log.info('Setting font size to %dpx', sizePixel);
        var bodyElm = document.querySelector('body');
        bodyElm.style.fontSize = sizePixel + "px";
      };
      $rootScope.increaseFontSize = function() {
        if (!Config.fontSize) {
          Config.fontSize = 12;
        }
        Config.fontSize += 1;
        Config.save();
        $log.info('Increase font size to ', Config.fontSize);
        $rootScope.setFontSize(Config.fontSize);
      };
      $rootScope.decreaseFontSize = function() {
        if (!Config.fontSize) {
          Config.fontSize = 12;
        }
        Config.fontSize -= 1;
        Config.save();
        $log.info('Decrease font size to ', Config.fontSize);
        $rootScope.setFontSize(Config.fontSize);
      };

      if (Config.fontSize) {
        $rootScope.setFontSize(Config.fontSize);
      }
    });
})(angular);
