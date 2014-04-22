angular.module('app').factory('screens', function(Restangular) {
  return {
    all: function () {
      return Restangular.all('screens').getList();
    }
  };
});