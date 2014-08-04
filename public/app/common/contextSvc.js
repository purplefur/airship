angular.module('app').factory('contextSvc', function($resource, mvIdentity, $q) {

  var User = $resource('/api/users/:id', null, {
    'update': { method: 'PUT' }
  });

  return {
    newContext: function(context) {
      var deferred = $q.defer();

      var user = User.get({id: mvIdentity.currentUser._id}, function() {
        while (user.contexts.length > 0) {
          user.contexts.pop();
        }
        user.contexts.push(context);
        User.update({id: user._id }, user).$promise
          .then(function() {
            deferred.resolve();
          });
      });

      return deferred.promise;
    },

    getContexts: function() {
      var deferred = $q.defer();
      var user = User.get({id: mvIdentity.currentUser._id}, function() {
          deferred.resolve(user.contexts);
        });
      return deferred.promise;
    },

    pushContext: function(context) {
      var deferred = $q.defer();
      var user = User.get({id: mvIdentity.currentUser._id}, function() {
        user.contexts.push(context);
        User.update({id: user._id}, user).$promise
          .then(function() {
            deferred.resolve(user.contexts);
          });
      });
      return deferred.promise;
    },

    unwindContext: function(context) {
      var deferred = $q.defer();

      var user = User.get({id: mvIdentity.currentUser._id}, function() {
        while (user.contexts.length > 0) {
          if (_.last(user.contexts).label === context.label) {
            break;
          }
          user.contexts.pop();
        }
        User.update({id: user._id}, user).$promise
          .then(function() {
            deferred.resolve(user.contexts);
          });
      });

      return deferred.promise;
    }
  };

});