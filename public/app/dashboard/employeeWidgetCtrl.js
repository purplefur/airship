angular.module('dashboard').controller('employeeWidgetCtrl', function($scope, $location, $state, contextSvc) {
  $scope.search = function() {
    contextSvc.setContextFromQuickSearch('employee', $scope.searchText)
      .then(function() {
        $state.go('records.list', {entity: 'employee'});
      });
  };
});
