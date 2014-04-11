angular.module('app').controller('mvLoginCtrl', function($scope, $http, mvNotifier, mvIdentity, mvAuth, $location) {
    $scope.identity = mvIdentity;

    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password).then(function(success) {
            if (success) {
                $location.path('/');
            } else {
                mvNotifier.notify('Failed to login');
            }
        })
    };

    $scope.signout = function() {
        mvAuth.logoutUser().then(function() {
            $scope.username = '';
            $scope.password = '';
            $location.path('/login');
        })
    }
});