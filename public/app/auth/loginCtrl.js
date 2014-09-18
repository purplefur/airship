angular.module('auth').controller('loginCtrl', function ($scope, $http, notifierSvc, currentUserModel, authenticationSvc, $location) {

  $scope.currentUserModel = currentUserModel;

  $scope.login = function (username, password) {
    authenticationSvc.authenticate(username, password).then(function (success) {
      if (success) {
        $location.path('/');
      } else {
        notifierSvc.error('Failed to login');
      }
    });
  };

  $scope.logout = function () {
    authenticationSvc.logout()
      .then(function () {
        $scope.username = '';
        $scope.password = '';
        $location.path('/login');
      });
  };
});