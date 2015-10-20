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

app.run(function($rootScope, $location, $http, $log) {


});
