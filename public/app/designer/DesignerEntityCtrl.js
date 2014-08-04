angular.module('app').controller('DesignerEntityCtrl', function($scope, $stateParams, entitySvc) {

  entitySvc.findById($stateParams.entityId).then(function(entity) {
    $scope.entity = entity;
  });
});