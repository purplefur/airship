angular.module('records').controller('toolbarCtrl', function($scope, recordsModel, contextSvc, $state) {

  $scope.model = recordsModel;

  $scope.search = function() {
    contextSvc.setContextFromQuickSearch('employee', $scope.searchText)
      .then(function() {
        $state.go('records.list', {entity: recordsModel.entity});
      });
  };
});

