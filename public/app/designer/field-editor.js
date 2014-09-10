angular.module('app').directive('fieldEditor', function() {

  return {
    restrict: 'E',
    templateUrl: '/partials/designer/field-editor',
    controller: function($scope, designerSvc, referenceDataSvc) {

      $scope.options = {
        fieldType: designerSvc.getFieldTypes()
      };

      referenceDataSvc.all()
        .then(function(data) {
          $scope.options.referenceData = data;
        });

      $scope.selectedType = _.first($scope.options.fieldType);
      $scope.selectedReferenceData = null;

      if ($scope.field === null) {
        $scope.field = {
          label: null,
          type: null,
          source: null,
          referenceData: null
        };
        $scope.editMode = true;
      }

      $scope.getSource = function(value) {
        if ($scope.field && $scope.field._id) {
          return $scope.field.source;
        }
        else {
          return value &&
            $scope.screen.source + '._custom.' + value
              .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
              .replace(/\s/g, '')
              .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
        }
      };

      $scope.$watch('field.label', function(value) {
        if ($scope.field) {
          $scope.field.source = $scope.getSource(value);
        }
      });

      $scope.$watch('selectedReferenceData', function(value) {
        if ($scope.field) {
          $scope.field.referenceData = value && value._id;
        }
      })

      $scope.$watch('selectedType', function(value) {
        if ($scope.field) {
          $scope.field.type = value && value.value;
        }
      })
    },

    link: function($scope, elem, attr) {
    }
  };
});