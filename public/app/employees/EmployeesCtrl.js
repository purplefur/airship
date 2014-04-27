angular.module('app').controller('EmployeesCtrl', function($scope, screens, employees) {

  $scope.navType = "pills";
  $scope.context = "group";

  screens.all().then(function (data) {
    $scope.screens = data;
    $scope.currentScreen = $scope.screens[0];
  });

  employees.all().then(function (data) {
    $scope.groupData = data;
    console.log(data);
  });

  $scope.switchScreen = function (screen) {
    $scope.currentScreen = _.find($scope.screens, { "name": screen });

    $scope.groupTemplate = _.where($scope.currentScreen.fields, { 'showInSummary' : true });
    console.log($scope.groupTemplate);

    $scope.employeeTemplate = _.reduce($scope.currentScreen.fields, function(result, field) {
      result[field.label] = { "type": field.type, "label": field.label };
      return result;
    }, {});
  };

  $scope.getData = function(record, field) {
    var properties = field.split('.');
    var data = _.reduce(properties, function(result, property) {
      return result && result[property];
    }, record);

    return data || ' ';
  };
});