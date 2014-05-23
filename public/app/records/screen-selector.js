angular.module('app').directive('screenSelector', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/screen-selector',
    controller: function($scope, screens) {
      $scope.activeScreen = null;

      screens.all()
        .then(function(data) {
          $scope.screens = data;
          $scope.selectScreen(_.first($scope.screens));
        })

      $scope.selectScreen = function (screen) {
        $scope.activeScreen = screen;
      };
    }
  };
});