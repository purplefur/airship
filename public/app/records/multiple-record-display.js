angular.module('app').directive('multipleRecordDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/multiple-record-display',
    controller: function($scope, recordsPageModel) {

      $scope.model = recordsPageModel;
      $scope.drillIntoRecord = function(recordId, displayName) {
        $scope.model.pushContext({
          label: displayName,
          data: [{ _id: recordId }]
        });
      }
    }
  };
});