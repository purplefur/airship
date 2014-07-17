angular.module('app').directive('singleRecordDisplay', function() {

  return {
    restrict: 'E',
    templateUrl: '/partials/records/single-record-display',
    controller: function($scope, recordsPageModel) {
      $scope.model = recordsPageModel;
      $scope.formData = {};

      $scope.editRecord = function() {
        $scope.model.setMode('edit');
      };

      $scope.cancelEditRecord = function() {
        $scope.model.setMode('view');
      };

      $scope.saveRecord = function() {
        $scope.model.saveSingleTemplateData($scope.formData);
      };
    }
  }
});