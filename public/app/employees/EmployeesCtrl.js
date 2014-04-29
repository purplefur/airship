angular.module('app').controller('EmployeesCtrl', function($scope, screens, employees) {

  // Needed for bootstrap pill effect on the tabset
  $scope.navType = "pills";

  $scope.contexts = [{ label: "All", context: "group" }];

  screens.all().then(function (data) {
    $scope.screens = data;
    $scope.currentScreen = $scope.screens[0];
  });

  employees.all().then(function (data) {
    $scope.groupData = data;
  });

  $scope.switchScreen = function (screen) {
    $scope.currentScreen = _.find($scope.screens, { "name": screen });
    $scope.summaryTemplate = $scope.currentScreen.summary;

    // Convert our schema into that expected by the angular-dynamic-form
    $scope.employeeTemplate = _.reduce($scope.currentScreen.fields, function(result, field) {
      result[field.label] = { "type": field.type, "label": field.label };
      return result;
    }, {});
  };

  $scope.clickBreadcrumb = function (breadcrumb) {
    while ($scope.contexts.length > 0) {
      var lastContext = _.last($scope.contexts);
      if (breadcrumb.context !== lastContext.context) {
        $scope.contexts.pop();
      } else {
        break;
      }
    }
  };

  $scope.getData = function(record, field) {
    var properties = field.split('.');
    var data = _.reduce(properties, function(result, property) {
      return result && result[property];
    }, record);

    return data || ' ';
  };

  $scope.drillIntoRecord = function(record) {
    $scope.contexts.push({ label: record.name.display, context: 'employee'});
  };

  $scope.getContext = function() {
    return _.last($scope.contexts).context;
  };

  $scope.editRecord = function() {
    $scope.employeeTemplate = _.map($scope.employeeTemplate, function(field) {
      field.type = "bob";
      return field;
    });
    console.log($scope.employeeTemplate);
  };
});