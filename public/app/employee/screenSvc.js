angular.module('employee').factory('screenSvc', function($resource, $q) {

  var EmployeeScreen = $resource('/api/employee/screen/:id', null, {
    'update': { method: 'PUT' }
  });

  return {
    all: function () {
      var deferred = $q.defer();
      var screens = EmployeeScreen.query({ id: null }, function () {
        deferred.resolve(screens);
      });
      return deferred.promise;
    }
  };

});