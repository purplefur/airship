angular.module('app').controller('DesignerFieldsCtrl', function($scope, $state, $stateParams, entitySvc) {

  entitySvc.findById($stateParams.entityId).then(function(entity) {
    $scope.entity = entity;
    $scope.screen = _.find(entity.screens, { _id: parseInt($stateParams.screenId) });
  });

  $scope.selectField = function(field) {
    $scope.currentField = field;
    $state.go('designer.fields.details', { entityId: $scope.entity._id, screenId: $scope.screen._id, field: field.label });
  };

});