angular.module('app').controller('RecordsMainCtrl', function($scope, recordsPageModel) {
  recordsPageModel.reset();
  $scope.model = recordsPageModel;
});