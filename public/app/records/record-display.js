angular.module('app').directive('recordDisplay', function(screensSvc) {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/record-display',
    controller: function($scope, recordsPageModel) {
      $scope.recordsPageModel = recordsPageModel;
    }
  };
0});