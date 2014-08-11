angular.module('app').controller('DesignerFieldsCtrl', function($scope, $state, $stateParams, entitySvc, entity) {

  $scope.entity = entity;
  $scope.screen = _.find(entity.screens, { _id: $stateParams.screenId });
  $scope.field = null;

  $scope.selectField = function(field) {
    $scope.currentField = field;
    $state.go('designer.fields.details', { entityId: $scope.entity._id, screenId: $scope.screen._id, fieldId: field._id });
  };

  $scope.saveNewField = function() {
    $scope.newFieldModel.field.type = $scope.newFieldModel.selectedType.value;
    if ($scope.newFieldModel.field.type !== 'select') {
      $scope.newFieldModel.field.referenceData = null;
    }
    $scope.entity.screens.fields.push($scope.newFieldModel.field);
    console.log($scope.entity);

//    entitySvc.update($scope.entity)
//      .then(function() {
//        $scope.newFieldModel.reset();
//      });
  };


  $scope.cancelNewField = function() {
    $scope.field = null;
  };

});