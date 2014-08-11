angular.module('app').controller('DesignerFieldDetailsCtrl', function($scope, $stateParams, entitySvc, entity) {

  $scope.model = {
    entity: null,
    screen: null,
    field: null,
    editMode: false,
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

  $scope.editField = function() {
    $scope.model.editMode = true;
  };

  $scope.cancelEdit = function() {
    refreshModel($scope.model.entity);
    $scope.model.editMode = false;
  };

  $scope.saveField = function() {

    // Update the model
    $scope.model.field.type = $scope.model.selectedType.value;
    if ($scope.model.field.type !== 'select') {
      $scope.model.field.referenceData = null;
    }

    // Copy it back over the "master" field on the entity
    angular.copy($scope.model.field, _.find($scope.model.screen.fields, { _id: $stateParams.fieldId }));

    entitySvc.update($scope.model.entity)
      .then(function() {
        $scope.model.editMode = false;
      });
  };

  // Setup initial state
  refreshModel(entity);

  function refreshModel(entity) {
    $scope.model.entity = entity;
    $scope.model.screen = _.find($scope.model.entity.screens, { _id: $stateParams.screenId });

    // take a copy so we only update the model on save
    $scope.model.field = angular.copy(_.find($scope.model.screen.fields, { _id: $stateParams.fieldId }));

    if ($scope.model.field.type) {
      $scope.model.selectedType = _.find($scope.model.options.fieldType, { value: $scope.model.field.type });
    }
  }
});