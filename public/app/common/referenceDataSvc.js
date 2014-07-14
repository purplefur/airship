angular.module('app').factory('referenceDataSvc', function($resource, $q) {

  return {
    get: function(name) {
      var deferred = $q.defer();
      var data = $resource('/api/referenceData/:name').get( {name: name}, function() {
        deferred.resolve(data);
      })

      return deferred.promise;
    }
  };
});