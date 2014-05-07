angular.module('app').controller('EmployeeWidgetCtrl', function($scope, $location) {
  $scope.search = function() {
    $location.search('search', $scope.searchText).path('/employees');
  };
});