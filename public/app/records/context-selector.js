angular.module('app').directive('contextSelector', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/context-selector',
    controller: function($scope) {
      $scope.contexts = [{label:'All Emps'}],

      $scope.selectContext = function() {
      }
    }
  };
});