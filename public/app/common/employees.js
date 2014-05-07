angular.module('app').factory('employees', function(Restangular) {
  return {
    all: function () {
      return Restangular.all('employees').getList();
    },
    findById: function (id) {
      return Restangular.one('employee', id).get();
    },
    search: function(search) {
      return Restangular.all('employees').getList({ q: search });
    }
  };
});