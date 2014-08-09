angular.module('app').directive('fieldEditor', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/designer/field-editor',
    scope: {
      model: '=',
      edit: '=',
      cancel: '=',
      save: '=',
      buttons: '='
    },
    controller: function($scope) {

    }
  }
})