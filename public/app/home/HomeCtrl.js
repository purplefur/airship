angular.module('app').controller('HomeCtrl', function($scope, employees) {
  employees.all().then(function(data) {
    $scope.employees = data;
  });
});