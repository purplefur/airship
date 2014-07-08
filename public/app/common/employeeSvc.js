angular.module('app').factory('employeeSvc', function($resource, $q) {

  var Employee = $resource('/api/employees/:id', null, {
    'update': { method: 'PUT' }
  });

  return {
    all: function () {
      var deferred = $q.defer();
      var employees = Employee.query({ id: null }, function() {
        deferred.resolve(employees);
      });
      return deferred.promise;
    },

    findById: function (id) {
      var deferred = $q.defer();
      var employee = Employee.get({ id: id }, function() {
        deferred.resolve(employee);
      });
      return deferred.promise;
    },

    search: function(search) {
      var deferred = $q.defer();
      var employees = Employee.query({ id: null, q: search }, function() {
        deferred.resolve(employees);
      });
      return deferred.promise;
    },

    update: function(employee) {
      var deferred = $q.defer();
      console.log(employee);
      Employee.update({ id: employee._id }, employee, function() {
        deferred.resolve();
      });
      return deferred.promise;
    }
  };
});
