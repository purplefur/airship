angular.module('app').directive('screenSelector', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/screen-selector',
    controller: function($scope, screensSvc, recordsPageModel) {

      $scope.screens = null;
      $scope.recordsPageModel = recordsPageModel;

      screensSvc.all()
        .then(function(data) {
          $scope.screens = data;
          $scope.selectScreen(_.first($scope.screens));
        });

      $scope.selectScreen = function (screen) {
        recordsPageModel.selectScreen(screen);
      };
    }
  };
});