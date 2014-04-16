angular.module('app').controller('mvMainCtrl', function($scope, screens) {
    screens.getList().then(function(result) {
        $scope.screen = result[0];
        console.log(result);
    });
})