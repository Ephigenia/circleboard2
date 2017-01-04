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
      this.save = function() {
        this.config.save();
        this.form.$setPristine();
      };
    }
  });
})();
