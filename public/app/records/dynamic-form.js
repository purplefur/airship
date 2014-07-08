angular.module('app').directive('dynamicForm', function($q, $parse, $document, $compile) {

  var supportedControls = {
    'hidden': {
      renderInViewMode: function(field) {
        return angular.noop();
      },
      renderInEditMode: function(field) {
        var newElement = angular.element('<input type=\'hidden\'>');
        if (angular.isDefined(field.value)) {
          newElement.attr('value', field.value);
        }

        return newElement;
      }
    },
    'text': {
      renderInViewMode: function(field) {
        var newElement = angular.element('<p/>');
        if (angular.isDefined(field.value)) {
          newElement.html(field.value);
        }
        return newElement;
      },
      renderInEditMode: function(field) {
        var newElement = angular.element('<input type=\'text\'/>');
        newElement.attr('value', field.value);
        newElement.addClass('form-control');
        return newElement;
      }
    },
    'date': {
      renderInViewMode: function(field) {
        var newElement = angular.element('<p/>');
        if (angular.isDefined(field.value) && field.value !== '') {
          newElement.html(moment(field.value).format('Do MMM YYYY'));
        }
        return newElement;
      },
      renderInEditMode: function(field) {
        console.log(field.value);
        var newElement = angular.element('<input type=\'date\'/>');
        newElement.addClass('form-control');
        if (angular.isDefined(field.value) && field.value !== '') {
          newElement.attr('value', moment(field.value).format('YYYY-MM-DD'));
        }
        return newElement;
      }
    },
    'checkbox': {
      renderInViewMode: function(field) {
        var newElement = angular.element('<p/>');
        if (field.value == true) {
          newElement.html('Yes');
        }
        else {
          newElement.html('No');
        }
        return newElement;
      },
      renderInEditMode: function(field) {
        var newElement = angular.element('<input type=\'checkbox\'/>');
        newElement.addClass('form-control');
        newElement.attr('value', field.value);
        return newElement;
      }
    }
  };

  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      scope.$watch('[model.mode, model.singleTemplate]', function(newValues, oldValues, scope) {

        // Clear the contents of the element so that updating when the template changes results in a new form
        element.html('');

        if (angular.isDefined(attrs.ngModel) && angular.isDefined(attrs.mode) && angular.isDefined(attrs.template)) {
          var model = $parse(attrs.ngModel)(scope),
            mode = $parse(attrs.mode)(scope),
            newElement,
            foundOne = false,
            iterElem = element;

          $q.when($parse(attrs.template)(scope))
            .then(function (template) {
              angular.forEach(template, function (field, id) {

                // Create the HTML element that represents our control
                var control = supportedControls[field.type];

                if (!angular.isDefined(control) && control.type !== 'hidden') {
                  newElement = angular.element('<p></p>');
                  if (angular.isDefined(field.val)) {
                    newElement.html(field.val);
                  }
                }
                else {
                  field.model = id;
                  if (mode === 'view') {
                    newElement = control.renderInViewMode(field);
                  }
                  else if (mode === 'edit') {
                    newElement = control.renderInEditMode(field, model);

                    newElement.attr('ng-model', attrs.ngModel + "['" + field.model + "']");
                    newElement.attr('name', field.model);
                    model[field.model] = angular.copy(newElement.attr('value'));

//                    if (angular.isDefined(field.readonly)) {
//                      newElement.attr('ng-readonly', field.readonly);
//                    }
//                    if (angular.isDefined(field.required)) {
//                      newElement.attr('ng-required', field.required);
//                    }
                  }
                }

                //  Add a label if required
                var label;
                if (angular.isDefined(field.label)) {
                  label = angular.element('<label></label>');
                  label.html(field.label);
                }

                // Wrap in a Bootstrap form-group
                if (newElement !== undefined) {
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

              //  Determine what tag name to use (ng-form if nested; form if outermost)
              while (!angular.equals(iterElem.parent(), $document) && !angular.equals(iterElem.parent(), angular.element()) && iterElem.parent()[0] !== undefined) {
                if (['form', 'ngForm', 'dynamicForm'].indexOf(attrs.$normalize(angular.lowercase(iterElem.parent()[0].nodeName))) > -1) {
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
              angular.forEach(attrs.$attr, function (attName, attIndex) {
                newElement.attr(attName, attrs[attIndex]);
              });
              newElement.attr('model', attrs.ngModel);
              newElement.removeAttr('ng-model');
              angular.forEach(element[0].classList, function (clsName) {
                newElement[0].classList.add(clsName);
              });
              newElement.addClass('dynamic-form');
              newElement.append(element.contents());

              //  Compile and update DOM
              $compile(newElement)(scope);
              element.html(newElement);
              console.log(model);
            });
        }
      }, true);
    }
  }
});