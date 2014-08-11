angular.module('app').factory('referenceDataSvc', function($resource, $q) {

  var ReferenceData = $resource('/api/referenceData/:id', null, {
    'update': { method: 'PUT' }
  });

  return {
    all: function() {
      var deferred = $q.defer();

      var refData = ReferenceData.query({ id: null }, function() {
        deferred.resolve(refData);
      });

      return deferred.promise;
    },

    get: function(name) {
      var deferred = $q.defer();
      var data = ReferenceData.get({ name: name }, function() {
        deferred.resolve(data);
      });

      return deferred.promise;
    }
  };
});