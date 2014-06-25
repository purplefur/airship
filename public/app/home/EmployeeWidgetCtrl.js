angular.module('app').controller('EmployeeWidgetCtrl', function($scope, $location, employeeSvc, contextSvc) {
  $scope.search = function() {
    employeeSvc.search($scope.searchText)
      .then(function(results) {
        return contextSvc.newContext({
          label: 'Search results for \'' + $scope.searchText + '\'',
          data: _.map(results, function(res) { return { _id: res._id } })
        });
      })
      .then(function() {
        $location.path('/records');
      })
  };
});
