(function() {
  'use strict';

  angular
  .module('circleboard')
  .directive('buildListItem', function() {
    return {
      restrict: 'A',
      scope: {
        build: '='
      },
      bindToController: true,
      controllerAs: '$ctrl',
      templateUrl: 'scripts/BuildListItem.html',
      controller: function($filter, $element) {
        var ctrl = this;

        // @TODO when failed colorize the whole row

        switch (ctrl.build.outcome) {
          default:
            break;
          case 'failed':
            $element.addClass('table-danger');
            break;
        }

        Object.defineProperties(this, {
          committerTitle: {
            get: function() {
              var build = ctrl.build;
              var title = build.committer_name;
              if (build.committer_email) {
                title += ' (' + build.committer_email + ')';
              }
              if (build.committer_date) {
                title += ' ' + $filter('date')(build.committer_date, 'shortDate');
                title += ' ' + $filter('date')(build.committer_date, 'shortTime');
              }
              return title;
            }
          }
        });
      }
    };
  });
})();
