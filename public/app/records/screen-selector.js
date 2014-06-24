angular.module('app').directive('screenSelector', function() {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/screen-selector',
    controller: function($scope, screensSvc, recordsPageModel) {

      $scope.model = recordsPageModel;

      $scope.selectScreen = function (screen) {
        $scope.model.selectScreen(screen);
      };
    }
  };
});