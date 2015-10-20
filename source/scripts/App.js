'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('m3App', [
  'ngRoute',
]);

app.config(['$routeProvider', function($routeProvider) {

  var viewBase = '/views';

  $routeProvider
    .when('/', {
      controller: 'AppController',
      templateUrl: viewBase + '/main.html'
    })
    .when('/config', {
      controller: 'ConfigController',
      templateUrl: viewBase + '/config.html'
    })
  ;

}]);

app.run(function($rootScope, $location, $http, $log, Config) {

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
