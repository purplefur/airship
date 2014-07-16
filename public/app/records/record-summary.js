angular.module('app').directive('recordSummary', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/record-summary',
    controller: function($scope, recordsPageModel) {
      $scope.model = recordsPageModel;
    }
  };
});