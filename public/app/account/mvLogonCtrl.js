angular.module('app').controller('mvLogonCtrl', function($scope, $http, mvNotifier, mvIdentity, mvAuth) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password).then(function(success) {
            if (success) {
                mvNotifier.notify('Successful login');
            } else {
                mvNotifier.notify('Failed to login');
            }
        })
    };
});