angular.module('app').factory('designerSvc', function() {

  return {

    getFieldTypes: function() {
      return [
        { label: 'Text', value: 'text' },
        { label: 'Text (multi-line)', value: 'textarea' },
        { label: 'Dropdown', value: 'select' },
        { label: 'Date', value: 'date' },
        { label: 'Checkbox', value: 'checkbox' }
      ];
    }

  };

});