angular.module('app').factory('entitySvc', function($resource, $q) {

  var Entities = $resource('/api/entities/:id', null, {
    'update': { method: 'PUT' }
  });

  return {
    all: function() {
      var deferred = $q.defer();

      var entities = Entities.query({ id: null }, function() {
        deferred.resolve(entities);
      });

      return deferred.promise;
    },

    findById: function(id) {
      var deferred = $q.defer();

      var entity = Entities.get({ id: id }, function() {
        deferred.resolve(entity);
      });

      return deferred.promise;
    },

    update: function(entity) {
      var deferred = $q.defer();
      Entities.update({ id: entity._id }, entity, function() {
        deferred.resolve();
      });
      return deferred.promise;
    }
  };
});