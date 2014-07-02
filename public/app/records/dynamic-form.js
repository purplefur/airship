angular.module('app').directive('dynamicForm', function($q, $parse, $document, $compile) {

  var supportedControls = {
    'text': {
      element: 'input',
      type: 'text',
      renderInViewMode: function(field) {
        var newElement = angular.element('<p></p>');
        if (angular.isDefined(field.val)) {
          newElement.html(field.val);
        }
        return newElement;
      },
      renderInEditMode: function() {
        angular.noop();
      }
    },
    'checkbox': {
      element: 'input',
      type: 'checkbox',
      renderInViewMode: function(field) {
        var newElement = angular.element('<p></p>');
        if (field.val == true) {
          newElement.html('Yes');
        }
        else {
          newElement.html('No');
        }
        return newElement;
      },
      renderInEditMode: function() {
        angular.noop();
      }
    }
  };

  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      scope.$watch('[model.mode, model.singleTemplate]', function(newValues, oldValues, scope) {
        element.html('');

        if (angular.isDefined(attrs.ngModel) && angular.isDefined(attrs.mode) && angular.isDefined(attrs.template)) {
          var model = $parse(attrs.ngModel)(scope);
          var mode = $parse(attrs.mode)(scope);
          var newElement,
            foundOne = false,
            iterElem = element;

          $q.when($parse(attrs.template)(scope))
            .then(function(template) {
              angular.forEach(template, function(field, id) {

                // Create the HTML element that represents our control
                var control = supportedControls[field.type];

                if (!angular.isDefined(control)) {
                  newElement = angular.element('<p></p>');
                  if (angular.isDefined(field.val)) {
                    newElement.html(field.val);
                  }
                }
                else {
                  if (mode === 'view') {
                    newElement = control.renderInViewMode(field);
                  }
                }

                //  Add a label if required
                var label;
                if (angular.isDefined(field.label)) {
                  label = angular.element('<label></label>');
                  label.html(field.label);
                }

                // Wrap in a Bootstrap form-group
                if (newElement !== null) {
                  newElement = newElement.wrap('<div></div>').parent();
                  newElement.addClass('form-group');

                  // Pre-pend the label if there is one
                  if (label !== undefined) {
                    newElement.prepend(label);
                  }

                  element.append(newElement);
                  newElement = null;
                }
              });
            });

          //  Determine what tag name to use (ng-form if nested; form if outermost)
          while (!angular.equals(iterElem.parent(), $document) && !angular.equals(iterElem.parent(), angular.element()) && iterElem.parent()[0] !== undefined) {
            if (['form','ngForm','dynamicForm'].indexOf(attrs.$normalize(angular.lowercase(iterElem.parent()[0].nodeName))) > -1) {
              foundOne = true;
              break;
            }
            iterElem = iterElem.parent();
          }
          if (foundOne) {
            newElement = angular.element("<ng-form></ng-form>");
          }
          else {
            newElement = angular.element("<form></form>");
          }

          //  Pseudo-transclusion
          angular.forEach(attrs.$attr, function(attName, attIndex) {
            newElement.attr(attName, attrs[attIndex]);
          });
          newElement.attr('model', attrs.ngModel);
          newElement.removeAttr('ng-model');
          angular.forEach(element[0].classList, function(clsName) {
            newElement[0].classList.add(clsName);
          });
          newElement.addClass('dynamic-form');
          newElement.append(element.contents());

          //  onReset logic
          newElement.data('$_cleanModel', angular.copy(model));
          newElement.bind('reset', function () {
            $timeout(function () {
              $scope.$broadcast('reset', arguments);
            }, 0);
          });
          scope.$on('reset', function () {
            scope.$apply(function () {
              scope[attrs.ngModel] = {};
            });
            scope.$apply(function () {
              scope[attrs.ngModel] = angular.copy(newElement.data('$_cleanModel'));
            });
          });

          //  Compile and update DOM
          $compile(newElement)(scope);
          element.html(newElement);
        }
      }, true);
    }
  }
});