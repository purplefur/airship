angular.module('app').factory('referenceDataSvc', function($resource, $q) {

  return {
    get: function(name) {
      var deferred = $q.defer();
      var data = $resource('/api/referenceData/:name').query( {name: name}, function() {
        deferred.resolve(data);
      })

      return deferred.promise;
    }
  };
});