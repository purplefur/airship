var textControlFactory = function (definition, mode) {
  var newElement;
  if (mode === 'view') {
    newElement = angular.element('<p/>');
    if (angular.isDefined(definition.value)) {
      newElement.html(definition.value);
    }
  }
  else if (mode === 'edit') {
    newElement = angular.element('<input type=\'text\'/>');
    if (angular.isDefined(definition.value)) {
      newElement.attr('value', definition.value);
    }
  }
  return newElement;
};

var hiddenControlFactory = function (definition, mode) {
  var newElement;
  if (mode === 'view') {
    angular.noop();
  }
  else if (mode === 'edit') {
    newElement = angular.element('<input type=\'hidden\'>');
    if (angular.isDefined(definition.value)) {
      newElement.attr('value', definition.value);
    }
  }
  return newElement;
};

var dateControlFactory = function (definition, mode) {
  var newElement;
  if (mode === 'view') {
    newElement = angular.element('<p/>');
    if (angular.isDefined(definition.value) && definition.value !== '') {
      newElement.html(moment(definition.value).format('Do MMMM YYYY'));
    }
  }
  else if (mode === 'edit') {
    newElement = angular.element('<input type=\'date\'/>');
    if (angular.isDefined(definition.value) && definition.value !== '') {
      newElement.attr('value', moment(definition.value).format('YYYY-MM-DD'));
    }
  }

  return newElement;
}

var checkboxControlFactory = function (definition, mode) {
  var newElement;
  if (mode === 'view') {
    newElement = angular.element('<p/>');
    if (definition.value == true) {
      newElement.html('Yes');
    }
    else {
      newElement.html('No');
    }
  }
  else if (mode === 'edit') {
    newElement = angular.element('<input type=\'checkbox\'/>');
    newElement.attr('value', definition.value);
  }
  return newElement;
}

var selectControlFactory = function (definition, mode, refData) {
  var newElement;
  if (mode === 'view') {
    newElement = angular.element('<p/>');
    if (angular.isDefined(definition.value) && definition.value !== '') {
      newElement.html(definition.value);
    }
  }
  else if (mode === 'edit') {

    newElement = angular.element('<select/>');
    refData.forEach(function(element) {
     if (element.name === definition.referenceData) {
       element.data.forEach(function (element) {
         var newOption = angular.element('<option/>');
         newOption.attr('value', element.value);
         newOption.html(element.label);
         newElement.attr('value', definition.value);
         newElement.append(newOption);

       });
     }});
  }
  return newElement;
}

angular.module('app').directive('dynamicForm', function($q, $parse, $document, $compile) {

  var supportedControls = {
    'text': textControlFactory,
    'hidden': hiddenControlFactory,
    'date': dateControlFactory,
    'select': selectControlFactory,
    'checkbox': checkboxControlFactory
  };

  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      scope.$watch('[model.mode, model.singleTemplate, model.refData]', function(newValues, oldValues, scope) {

        // Clear the contents of the element so that updating when the template changes results in a new form
        element.html('');

        if (angular.isDefined(attrs.ngModel)
          && angular.isDefined(attrs.mode)
          && angular.isDefined(attrs.template)) {
          var model = $parse(attrs.ngModel)(scope),
            mode = $parse(attrs.mode)(scope),
            refData = $parse(attrs.refdata)(scope),
            newElement,
            foundOne = false,
            iterElem = element;

          $q.when($parse(attrs.template)(scope))
            .then(function (template) {
              angular.forEach(template, function (field, id) {

                // Create the HTML element that represents our control
                var controlFactory = supportedControls[field.type];

                if (angular.isDefined(controlFactory)) {
                  field.model = id;
//                  if (angular.isDefined(field.referenceData) && refData.length > 0) {
//                    field.referenceData = _.where(refData, { name: field.referenceData });
//                  }

                  newElement = controlFactory(field, mode, refData);
                  if (mode === 'edit') {
                    newElement.attr('ng-model', attrs.ngModel + "['" + field.model + "']");
                    newElement.attr('name', field.model);
                    newElement.addClass('form-control');
                    model[field.model] = angular.copy(newElement.attr('value'));
                  }
                }
                // If we can't find a matching control then simply render the value on screen in a P element
                else {
                  newElement = angular.element('<p></p>');
                  if (angular.isDefined(field.val)) {
                    newElement.html(field.val);
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
            });
        }
      }, true);
    }
  }
});