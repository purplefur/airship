angular.module('app').factory('users', function(Restangular) {
  return {
    withId: function(id) {
      return Restangular.one('users', id).get();
    }
  };
});