angular.module('app').controller('DesignerCtrl', function($scope, $state, entitySvc) {

  entitySvc.all().then(function(entities) {
    $scope.entities = entities;
    $scope.currentEntity = entities[0]; // must have at least one entity
  });

  $scope.selectEntity = function(entity) {
    $scope.currentEntity = entity;
    $state.go('designer.entities.details', { entityId: entity._id });
  };
});