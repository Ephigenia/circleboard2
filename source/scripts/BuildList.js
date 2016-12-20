(function() {
  'use strict';

  angular
  .module('circleboard')
  .component('buildList', {
    bindings: {
      builds: '<'
    },
    templateUrl: 'scripts/BuildList.html',
    controller: function() {

    }
  });
})();
