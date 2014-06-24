angular.module('app').factory('contextSvc', function($resource, users, mvIdentity, $q) {

  var User = $resource('/api/users/:id', null, {
    'update': { method: 'PUT' }
  });

  return {
    newContextForCurrentUser: function(context) {
      var deferred = $q.defer();

      var user = User.get({id: mvIdentity.currentUser._id}, function() {
        while (user.contexts.length > 0) {
          user.contexts.pop();
        }
        user.contexts.push(context);
        User.update({id: user._id }, user).$promise
          .then(function() {
            deferred.resolve();
          })
      });

      return deferred.promise;
    },

    getContextsForCurrentUser: function() {
      var deferred = $q.defer();
      users.withId(mvIdentity.currentUser._id)
        .then(function(user) {
          deferred.resolve(user.contexts);
        });
      return deferred.promise;
    }
  };

});