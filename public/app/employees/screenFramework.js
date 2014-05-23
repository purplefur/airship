angular.module('app').factory('screenFramework', function($q, employees, screens) {

  function getPropertyChainValue(record, propertyChain) {
    var properties = propertyChain.split('.');
    var data = _.reduce(properties, function(result, property) {
      return result && result[property];
    }, record);

    return data || ' ';
  };

  return {
    mode: 'view',
    screens: {},
    currentScreen: null,

    switchMode: function(newMode) {
      this.mode = newMode;
    },

    switchScreen: function(screen) {
      this.switchMode('view'); // always drop back to VIEW mode when we switch screens
      this.currentScreen = screen;
    },

    loadScreens: function() {
      var self = this;
      var deferred = $q.defer();

      screens.all().then(function (data) {
        self.screens = data;
        self.switchScreen(_.first(self.screens));
        deferred.resolve(self.screens);
      });

      return deferred.promise;
    }

//    refreshGroupTemplate: function() {
//      this.summaryTemplate = this.currentScreen.summary;
//    },

//    refreshEmployeeTemplate: function() {
//      this.employeeTemplate = _.reduce(this.currentScreen.fields, function(result, field) {
//        var overrideFieldType = undefined;
//        if (screenFramework.mode !== 'edit')
//          overrideFieldType = 'readonly';
//
//        result[field.label] = {
//          "type": overrideFieldType || field.type,
//          "label": field.label,
//          "val": getPropertyChainValue(this.getCurrentContext().data, field.value) }/;
//
//        return result;
//      }, {});
//    },
  };
});