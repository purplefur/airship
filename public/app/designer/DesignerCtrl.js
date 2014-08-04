angular.module('app').controller('DesignerCtrl', function($scope, $state, entitySvc) {

  entitySvc.all().then(function(entities) {
    $scope.entities = entities;
    $scope.currentEntity = entities[0]; // must have at least one entity
  });

});