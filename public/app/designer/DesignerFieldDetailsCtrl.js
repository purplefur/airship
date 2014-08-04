angular.module('app').controller('DesignerFieldDetailsCtrl', function($scope, $stateParams, entitySvc) {

  entitySvc.findById($stateParams.entityId).then(function(entity) {
    $scope.entity = entity;
    $scope.screen = _.find($scope.entity.screens, { _id: parseInt($stateParams.screenId) });
    $scope.field = _.find($scope.screen.fields, { label: $stateParams.field });
  });
});