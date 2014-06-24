angular.module('app').directive('singleRecordDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/single-record-display',
    controller: function($scope, recordsPageModel) {
      $scope.model = recordsPageModel;
      $scope.formData = {};
      $scope.processForm = function() {
        console.log($scope.formData);
      };
    }
  }
});