(function() {
  'use strict';

  angular
  .module('circleboard')
  .component('configComponent', {
    templateUrl: 'scripts/ConfigComponent.html',
    bindings: {
      config: '<'
    },
    controller: function() {
    }
  });
})();
