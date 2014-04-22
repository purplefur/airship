angular.module('app').controller('EmployeeCtrl', function($scope, $routeParams, employees, screens) {
  console.log('Id is ...' + $routeParams.id);
  employees.findById($routeParams.id).then(function (data) {
    console.log(data);
    $scope.employee = data;
  });
  screens.all().then(function (data) {
    $scope.screens = data;
  });
});