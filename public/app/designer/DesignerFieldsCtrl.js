angular.module('app').controller('DesignerFieldsCtrl', function($scope, $state, $stateParams, entity) {

  $scope.entity = entity;
  $scope.screen = _.find(entity.screens, { _id: parseInt($stateParams.screenId) });

  $scope.newFieldModel = {
    entity: $scope.entity,
    screen: $scope.screen,
    field: {
      label: null,
      type: null,
      source: null,
      referenceData: null
    },
    editMode: true,
    options: {
      fieldType: [
        { label: 'Text', value: 'text' },
        { label: 'Text (multi-line)', value: 'textarea' },
        { label: 'Dropdown', value: 'select' },
        { label: 'Date', value: 'date' },
        { label: 'Checkbox', value: 'checkbox' }
      ],
      referenceData: [
        'Marital Status',
        'Nationality',
        'County',
        'Relation',
        'Department',
        'Pay Basis'
      ]
    },
    selectedType: null
  };

  $scope.selectField = function(field) {
    $scope.currentField = field;
    $state.go('designer.fields.details', { entityId: $scope.entity._id, screenId: $scope.screen._id, fieldId: field._id });
  };

  $scope.saveNewField = function() {
    $scope.newFieldModel.field.type = $scope.newFieldModel.selectedType.value;
    if ($scope.newFieldModel.field.type !== 'select') {
      $scope.newFieldModel.field.referenceData = null;
    }
    console.log($scope.newFieldModel.field);
  };


  $scope.cancelNewField = function() {
  };

});