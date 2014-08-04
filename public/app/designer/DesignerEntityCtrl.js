angular.module('app').controller('DesignerEntityCtrl', function($scope, $stateParams, entitySvc, designerModel) {

  entitySvc.findById($stateParams.entityId).then(function(entity) {
    designerModel.setEntity(entity);
    $scope.model = designerModel;
  });
});