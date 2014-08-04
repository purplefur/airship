angular.module('app').controller('DesignerScreensCtrl', function($scope, $state, $stateParams, entitySvc) {

  entitySvc.findById($stateParams.entityId).then(function(entity) {
    $scope.entity = entity;
  });

  $scope.selectScreen = function(screen) {
    $scope.currentScreen = screen;
    $state.go('designer.screens.details', { entityId: $scope.entity._id, screenId: screen._id });
  };

});