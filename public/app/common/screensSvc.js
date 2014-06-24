angular.module('app').factory('screensSvc', function($resource, $q) {

  return {
    all: function () {
      var deferred = $q.defer();
      var data = $resource('/api/screens').query(function() {
        deferred.resolve(data);
      });

      return deferred.promise;
    },

    data: function(screen, view) {
      var deferred = $q.defer();
      var data = $resource('/api/screens/:name/:view/data', null, null).query({ name: screen, view: view }, function() {
        deferred.resolve(data);
      });

      return deferred.promise;
    }
  };
});