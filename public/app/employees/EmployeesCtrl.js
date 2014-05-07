angular.module('app').controller('EmployeesCtrl', function($scope, $location, screens, employees) {

  // Needed for bootstrap pill effect on the tabset
  $scope.navType = "pills";

  $scope.mode = "view";
  $scope.contexts = [{ label: "All", context: "group" }];
  $scope.formData = { };

  var searchText = $location.search().search;
  if (searchText !== undefined && searchText.length > 0) {
    $scope.contexts.pop();
    $scope.contexts.push({ label: "Search results for '" + searchText + "'", context: "group" });
    employees.search(searchText).then(function (data) {
      $scope.groupData = data;
    });
  } else {
    employees.all().then(function (data) {
      $scope.groupData = data;
    });
  };

  screens.all().then(function (data) {
    $scope.screens = data;
    $scope.currentScreen = $scope.screens[0];
  });


  $scope.switchScreen = function (screen) {
    $scope.currentScreen = _.find($scope.screens, { "name": screen });
    $scope.summaryTemplate = $scope.currentScreen.summary;

    // Convert our schema into that expected by the angular-dynamic-form, but default types to "readonly" as we're in VIEW mode
    $scope.employeeTemplate = _.reduce($scope.currentScreen.fields, function(result, field) {
      result[field.label] = { "type": "readonly", "label": field.label, "val": $scope.getData($scope.employeeData, field.value) };
      return result;
    }, {});
    $scope.mode = "view";
  };

  $scope.clickBreadcrumb = function (breadcrumb) {
    while ($scope.contexts.length > 0) {
      var lastContext = _.last($scope.contexts);
      if (breadcrumb.context !== lastContext.context) {
        $scope.contexts.pop();
      } else {
        break;
      }
      $scope.mode = "view";
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
    $scope.employeeData = record;

    $scope.employeeTemplate = _.reduce($scope.currentScreen.fields, function(result, field) {
      result[field.label] = { "type": "readonly", "label": field.label, "val": $scope.getData($scope.employeeData, field.value) };
      return result;
    }, {});
  };

  $scope.getContext = function() {
    return _.last($scope.contexts).context;
  };

  $scope.editRecord = function() {
    // Change to EDIT mode by re-creating the angular-dynamic-form but with the correct types
    $scope.employeeTemplate = _.reduce($scope.currentScreen.fields, function(result, field) {
      result[field.label] = { "type": field.type, "label": field.label, "val": $scope.getData($scope.employeeData, field.value) };
      return result;
    }, {});
    $scope.mode = "edit";
  };

  $scope.cancelEditRecord = function() {
    $scope.switchScreen($scope.currentScreen.name);
  }
});