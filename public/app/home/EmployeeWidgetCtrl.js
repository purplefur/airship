angular.module('app').controller('EmployeeWidgetCtrl', function($scope, $location, employeeSvc, contextSvc) {
  $scope.search = function() {
    employeeSvc.search($scope.searchText)
      .then(function(results) {
        var contextDescription = $scope.searchText;
        if (!angular.isDefined(contextDescription)) {
          contextDescription = "[blank search]";
        }
        return contextSvc.newContext({
          label: 'Search results for \'' + contextDescription + '\'',
          data: _.map(results, function(res) { return { _id: res._id }; })
        });
      })
      .then(function() {
        $location.path('/records');
      });
  };
});
