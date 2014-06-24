angular.module('app').controller('EmployeeWidgetCtrl', function($scope, $location, employees, contextSvc) {
  $scope.search = function() {
    employees.search($scope.searchText)
      .then(function(results) {
        return contextSvc.newContextForCurrentUser({
          label: 'Search results for \'' + $scope.searchText + '\'',
          data: _.map(results, function(res) { return { _id: res._id } })
        });
      })
      .then(function() {
        $location.path('/records');
      })
  };
});
