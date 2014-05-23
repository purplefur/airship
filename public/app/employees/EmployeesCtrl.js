angular.module('app').controller('EmployeesCtrl', function($scope, $location, screenFramework, employeeContext) {

  $scope.formData = {};
  $scope.screenFramework = screenFramework;
  $scope.employeeContext = employeeContext;
  $scope.summaryTemplate = null;

  employeeContext.loadInitialContext()
    .then(screenFramework.loadScreens($location.search().search));

  $scope.switchScreen = function(screen) {
    screenFramework.switchScreen(screen);

    if (employeeContext.getCurrentContext().isGroup()) {
      $scope.summaryTemplate = screenFramework.currentScreen.summary;
    } else {
//      this.refreshEmployeeTemplate();
    }
  };

//  $scope.drillIntoRecord = function(record) {
//    screenFramework.pushContext(record.name.display, record);
//    screenFramework.refreshEmployeeTemplate();
//  };
//
//  $scope.editRecord = function() {
//    screenFramework.switchMode('edit');
//    screenFramework.refreshEmployeeTemplate();
//  };
//
//  $scope.cancelEditRecord = function() {
//    screenFramework.switchScreen(screenFramework.currentScreen);
//  }
//
//  $scope.saveRecord = function() {
//  };
});