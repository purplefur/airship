angular.module('app').directive('contextSelector', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/context-selector',
    controller: function($scope, recordsPageModel) {
      $scope.model = recordsPageModel;
      $scope.selectContext = function(context) {
        $scope.model.unwindContext(context);
      };
    }
  };
});