angular.module('app').controller('HomeCtrl', function($scope, employeeSvc) {
  employeeSvc.all().then(function(data) {
    $scope.employees = data;
  });
});