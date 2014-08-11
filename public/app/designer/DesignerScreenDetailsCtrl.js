angular.module('app').controller('DesignerScreenDetailsCtrl', function($scope, $stateParams, entitySvc) {

  entitySvc.findById($stateParams.entityId).then(function(entity) {
    $scope.entity = entity;
    $scope.screen = _.find(entity.screens, { _id: $stateParams.screenId });
  });
});